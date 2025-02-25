import { asComputed, asRef } from '@src/reactivity';
import { executeTasks } from '@ti-platform/aide';
import { computed, ComputedRef } from 'vue';

/**
 * The return value for the function {@link reactiveExecuteTasks}.
 *
 * @typeParam T The type of the result.
 */
export type ReactiveExecuteTasksRet<T> = {
    /**
     * The current active number of workers.
     */
    activeWorkers: ComputedRef<number>;

    /**
     * The current number of completed tasks.
     */
    completedTasks: ComputedRef<number>;

    /**
     * True if all the tasks have completed running, false otherwise.
     */
    isAllTasksCompleted: ComputedRef<boolean>;

    /**
     * The array storing the results as it is returned. Note that this can be a sparsed array with missing indexes as it
     * is filled with the results only when it is available. You should check for undefined before using it.
     */
    results: ComputedRef<Array<T>>;

    /**
     * The total number of tasks that was queued.
     */
    totalTasks: ComputedRef<number>;
};

/**
 * Reactive version of `@ti-platform/aide#xecuteTasks`.
 *
 * @typeParam T The type of the result of each task.
 * @param tasks The tasks to run.
 * @param maxNumOfWorkers The maximum number of tasks ot run at once.
 */
export function reactiveExecuteTasks<T>(
    tasks: ReadonlyArray<() => Promise<T>>,
    maxNumOfWorkers = 10
): ReactiveExecuteTasksRet<T> {
    const activeWorkers = asRef(0);
    const totalTasks = asRef(tasks.length);
    const completedTasks = asRef(0);
    const isAllTasksCompleted = computed(() => completedTasks.value === tasks.length);
    const results = asRef<Array<T>>([]);

    void executeTasks(
        tasks.map((fn, index) => async () => {
            activeWorkers.value++;

            results.value[index] = await fn();

            activeWorkers.value--;
            completedTasks.value++;
        }),
        maxNumOfWorkers
    );

    return {
        isAllTasksCompleted,
        activeWorkers: asComputed(activeWorkers),
        completedTasks: asComputed(completedTasks),
        results: asComputed(results),
        totalTasks: asComputed(totalTasks),
    };
}
