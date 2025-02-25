import { reactiveExecuteTasks, ReactiveExecuteTasksRet } from '@src/queue';
import { waitFor } from '@ti-platform/aide';
import { expect } from '@ti-platform/aide-test';
import { afterEach, beforeEach, describe, test, vi } from 'vitest';
import { computed } from 'vue';

const it = test.extend<{
    task1: () => Promise<number>;
    task2: () => Promise<number>;
    task3: () => Promise<number>;
    task4: () => Promise<number>;
    reactiveTasks: ReactiveExecuteTasksRet<number>;
}>({
    task1: async ({ task }, use) => {
        await use(
            vi.fn().mockImplementation(async () => {
                await waitFor(1);
                return 1;
            })
        );
    },
    task2: async ({ task }, use) => {
        await use(
            vi.fn().mockImplementation(async () => {
                await waitFor(1);
                return 2;
            })
        );
    },
    task3: async ({ task }, use) => {
        await use(
            vi.fn().mockImplementation(async () => {
                await waitFor(2);
                return 3;
            })
        );
    },
    task4: async ({ task }, use) => {
        await use(
            vi.fn().mockImplementation(async () => {
                await waitFor(1);
                return 4;
            })
        );
    },
    reactiveTasks: async ({ task1, task2, task3, task4 }, use) => {
        await use(reactiveExecuteTasks([task1, task2, task3, task4], 2));
    },
});

describe('reactiveExecuteTasks', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should execute the tasks concurrently and update the various references', ({ reactiveTasks }) => {
        const { activeWorkers, totalTasks, completedTasks, isAllTasksCompleted, results } = reactiveTasks;

        expect(activeWorkers.value).toBe(2);
        expect(totalTasks.value).toBe(4);
        expect(completedTasks.value).toBe(0);
        expect(isAllTasksCompleted.value).toBeFalse();
        expect(results.value).toEqual([]);
    });

    it('should run the queued tasks when other tasks are done', async ({ reactiveTasks }) => {
        const { activeWorkers, completedTasks, isAllTasksCompleted, results } = reactiveTasks;

        await vi.advanceTimersByTimeAsync(1);

        expect(activeWorkers.value).toBe(2);
        expect(completedTasks.value).toBe(2);
        expect(isAllTasksCompleted.value).toBeFalse();
        expect(results.value).toEqual([1, 2]);
    });

    it('should return a sparse resultant array as the tasks can finish at different times', async ({
        reactiveTasks,
    }) => {
        const { activeWorkers, completedTasks, isAllTasksCompleted, results } = reactiveTasks;

        await vi.advanceTimersByTimeAsync(2);

        expect(activeWorkers.value).toBe(1);
        expect(completedTasks.value).toBe(3);
        expect(isAllTasksCompleted.value).toBeFalse();
        expect(results.value).toEqual([1, 2, undefined as unknown as number, 4]);
    });

    it('should fully populate the results when all the tasks are done', async ({ reactiveTasks }) => {
        const { activeWorkers, completedTasks, isAllTasksCompleted, results } = reactiveTasks;

        await vi.advanceTimersByTimeAsync(3);

        expect(activeWorkers.value).toBe(0);
        expect(completedTasks.value).toBe(4);
        expect(isAllTasksCompleted.value).toBeTrue();
        expect(results.value).toEqual([1, 2, 3, 4]);
    });

    it('should trigger updates for the results Ref', async ({ reactiveTasks }) => {
        const { results } = reactiveTasks;

        const next = computed(() => results.value.slice().length);

        expect(next.value).toBe(0);

        await vi.advanceTimersByTimeAsync(1);

        expect(next.value).toBe(2);
    });
});
