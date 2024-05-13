import { executeTasks } from '@ti-platform/aide';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

/**
 * The return value for the function {@link reactiveExecuteTasks}.
 *
 * @typeParam T The type of the result.
 */
export type ReactiveExecuteTasksRet<T> = {
    /**
     * The current active number of workers.
     */
    activeWorkers: Readonly<Ref<number>>;

    /**
     * The current number of completed tasks.
     */
    completedTasks: Readonly<Ref<number>>;

    /**
     * True if all the tasks have completed running, false otherwise.
     */
    isAllTasksCompleted: Readonly<Ref<boolean>>;

    /**
     * The array storing the results as it is returned. Note that this can be a sparsed array with missing indexes as it
     * is filled with the results only when it is available. You should check for undefined before using it.
     */
    results: Readonly<Ref<Array<T>>>;

    /**
     * The total number of tasks that was queued.
     */
    totalTasks: Readonly<Ref<number>>;
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
    const activeWorkers = ref(0);
    const totalTasks = ref(tasks.length);
    const completedTasks = ref(0);
    const isAllTasksCompleted = computed(() => completedTasks.value === tasks.length);
    const results = ref([]) as Ref<Array<T>>;

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
        activeWorkers,
        completedTasks,
        isAllTasksCompleted,
        results,
        totalTasks,
    };
}
