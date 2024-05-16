import { Deferred } from '@src/promises';
import type { Awaitable, Simplify } from '@src/types';

/**
 * Given a list of tasks to execute, execute them, ensuring there is a maximum number of tasks actively running at the
 * same time. The returning array of responses should match the order of the task that was given.
 *
 * @typeParam T The type of the result of each task.
 * @param tasks The tasks to run.
 * @param maxNumOfWorkers The maximum number of tasks to run at once.
 * @returns A promise that will resolve when all the tasks are completed.
 */
export async function executeTasks<T>(tasks: ReadonlyArray<() => Promise<T>>, maxNumOfWorkers = 10): Promise<Array<T>> {
    const queue = new Queue<T>({ maxConcurrent: maxNumOfWorkers });
    const results: Array<T> = [];

    tasks.forEach((task, taskIndex) => void queue.add(task).onEnd.then((result) => (results[taskIndex] = result)));

    await queue.lockQueue();
    return results;
}

/**
 * An item in the queue.
 *
 * @typeParam T The type of the item that the promise resolves with. Defaults to void.
 */
export type QueueItem<T = void> = () => Awaitable<T>;

/**
 * Arguments for constructing a {@link Queue}.
 *
 * @interface
 */
export type QueueConstructorOptions = {
    /**
     * Maximum number of concurrent executions.
     */
    maxConcurrent: number;

    /**
     * If given in addition with `intervalMs`, used to limit how many items can execute within an interval. This is
     * simply the maximum number of executions within the interval.
     */
    maxPerInterval?: number;

    /**
     * If given in addition with `maxPerInterval`, used to limit how many items can execute within an interval. This is
     * simply the time, in milliseconds, for when to reset the execution counts per interval.
     */
    intervalMs?: number;
};

/** @internal */
type AddReturnValue<T> = {
    /** Promised that is resolved right before the handler is executed. */
    onBeforeStart: Promise<void>;

    /**
     * Promised that is resolved right after the handler is executed but not necessarily after it has finished execution.
     */
    onAfterStart: Promise<void>;

    /**
     * Promised that is resolved after the handler finished executing.
     */
    onEnd: Promise<T>;
};

/**
 * Queue that execute handlers as per the configured concurrency limit. It also has the ability to rate limit how much
 * execution happens within an interval.
 *
 * @typeParam T The type of the item that the promise resolves with for the handlers. Defaults to void.
 */
export class Queue<T = void> {
    /**
     * @inheritDoc QueueConstructorOptions.intervalMs
     */
    public readonly intervalMs: NonNullable<QueueConstructorOptions['intervalMs']>;

    /**
     * @inheritDoc QueueConstructorOptions.maxConcurrent
     */
    public readonly maxConcurrent: QueueConstructorOptions['maxConcurrent'];

    /**
     * @inheritDoc QueueConstructorOptions.maxPerInterval
     */
    public readonly maxPerInterval: NonNullable<QueueConstructorOptions['maxPerInterval']>;

    /**
     * A {@link Deferred} that will be resolved when no more items are added to the queue and all items in the queue has
     * finished executing.
     */
    private readonly whenDone: Deferred = new Deferred();

    /**
     * Counts of the number of currently actively running jobs.
     */
    private activelyRunning = 0;

    /**
     * Whether items can still be added to the queue.
     */
    private canAddItem = true;

    /**
     * Identifier for the timeout function which resets the interval.
     */
    private intervalId?: NodeJS.Timeout = undefined;

    /**
     * List of items still in the queue.
     */
    private items: Array<{
        /**
         * The actual item in the queue.
         */
        fn: QueueItem<T>;

        /**
         * Called right before the item is to be executed.
         */
        onBeforeStartResolve: () => void;

        /**
         * Called right after the item is executed but no necessarily after it finishes execution.
         */
        onAfterStartResolve: () => void;

        /**
         * Called after the item finishes executing.
         */
        onEndResolve: (handlerResult: T) => void;
    }> = [];

    /**
     * The number of items that have started executing within the curren interval.
     */
    private startedInInterval = 0;

    /**
     * Create a new instance.
     */
    public constructor({ maxConcurrent, maxPerInterval = -1, intervalMs = -1 }: Simplify<QueueConstructorOptions>) {
        this.maxConcurrent = maxConcurrent;
        this.maxPerInterval = maxPerInterval;
        this.intervalMs = intervalMs;
    }

    /**
     * Add a new item to the queue for execution.
     *
     * @throws Error if items can no longer be added.
     */
    public add(item: QueueItem<T>): Simplify<AddReturnValue<T>> {
        if (!this.canAddItem) {
            throw new Error('Item can no longer be added to queue.');
        }

        const onBeforeStart = new Deferred();
        const onAfterStart = new Deferred();
        const onEnd = new Deferred<T>();

        this.items.push({
            fn: item,
            onBeforeStartResolve: onBeforeStart.resolve,
            onAfterStartResolve: onAfterStart.resolve,
            onEndResolve: onEnd.resolve,
        });

        void this.next();

        return { onBeforeStart: onBeforeStart.promise, onAfterStart: onAfterStart.promise, onEnd: onEnd.promise };
    }

    /**
     * Lock the queue and return a promise that will resolve when all the handlers finished execution.
     */
    public lockQueue(): Promise<void> {
        this.canAddItem = false;

        if (this.items.length < 1 && this.activelyRunning < 1) {
            this.whenDone.resolve();
        }

        return this.whenDone.promise;
    }

    /**
     * Tries to run the next handler if possible.
     */
    private async next() {
        if (!this.shouldRunNextTask()) {
            return;
        }

        const item = this.items.shift()!;

        this.activelyRunning++;
        this.trackIntervalMonitoring();

        item.onBeforeStartResolve();

        const promise = item.fn();
        item.onAfterStartResolve();
        item.onEndResolve(await promise);

        this.activelyRunning--;

        if (!this.canAddItem && this.items.length < 1 && this.activelyRunning < 1) {
            this.whenDone.resolve();
        } else {
            void this.next();
        }
    }

    /**
     * Track the fact that a task will start running within this interval block and also add a handler, if necessary to
     * reset the value after the configured amount of time.
     */
    private trackIntervalMonitoring() {
        if (this.maxPerInterval < 1 || this.intervalMs < 1) {
            return;
        }

        this.startedInInterval++;

        if (!this.intervalId) {
            this.intervalId = setTimeout(() => {
                this.startedInInterval = 0;
                this.intervalId = undefined;

                void this.next();
            }, this.intervalMs);
        }
    }

    /**
     * Determine if we can run the next task.
     */
    private shouldRunNextTask(): boolean {
        if (this.items.length < 1) {
            return false;
        }

        if (this.activelyRunning >= this.maxConcurrent) {
            return false;
        }

        if (this.maxPerInterval > 0 && this.intervalMs > 0 && this.startedInInterval >= this.maxPerInterval) {
            return false;
        }

        return true;
    }
}
