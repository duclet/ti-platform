import { waitFor } from '@src/promises';
import { executeTasks, Queue } from '@src/queue';
import { expect } from '@ti-platform/aide-test';
import { afterEach, beforeEach, describe, test, vi } from 'vitest';

const it = test.extend({});

describe('executeTasks', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should run the tasks concurrently and return an array of results', async () => {
        const handler1 = vi.fn().mockImplementation(async () => waitFor(1000).then(() => 1));
        const handler2 = vi.fn().mockImplementation(async () => waitFor(1000).then(() => 2));
        const handler3 = vi.fn().mockImplementation(async () => waitFor(1000).then(() => 3));

        const result = executeTasks([handler1, handler2, handler3], 2);

        await vi.advanceTimersByTimeAsync(2000);

        expect(await result).toEqual([1, 2, 3]);
    });
});

describe('Queue', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should execute handlers as they are added unless the limits are met', async () => {
        const queue = new Queue({ maxConcurrent: 2 });
        const handler1 = vi.fn().mockImplementation(() => waitFor(1000));
        const handler2 = vi.fn().mockImplementation(() => waitFor(1000));
        const handler3 = vi.fn().mockImplementation(() => waitFor(1000));

        queue.add(handler1);
        queue.add(handler2);
        queue.add(handler3);

        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
        expect(handler3).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(1000);

        expect(handler3).toHaveBeenCalled();
    });

    it('should also take the maximum run per interval into question', async () => {
        const queue = new Queue({ maxConcurrent: 2, maxPerInterval: 2, intervalMs: 5000 });
        const handler1 = vi.fn().mockImplementation(() => waitFor(1000));
        const handler2 = vi.fn().mockImplementation(() => waitFor(1000));
        const handler3 = vi.fn().mockImplementation(() => waitFor(1000));
        const handler4 = vi.fn().mockImplementation(() => waitFor(1000));

        queue.add(handler1);
        queue.add(handler2);
        queue.add(handler3);
        queue.add(handler4);

        expect(handler1).toHaveBeenCalled();
        expect(handler2).toHaveBeenCalled();
        expect(handler3).not.toHaveBeenCalled();
        expect(handler4).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(2000);

        expect(handler3).not.toHaveBeenCalled();
        expect(handler4).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(4000);

        expect(handler3).toHaveBeenCalled();
        expect(handler4).toHaveBeenCalled();
    });

    it('should prevent adding new handlers once the queue is locked', () => {
        const queue = new Queue({ maxConcurrent: 1 });

        void queue.lockQueue();

        expect(() =>
            queue.add(() => {
                return;
            })
        ).toThrowError('Item can no longer be added to queue.');
    });

    it('should resolve the promised returned from lockQueue only when all the handlers have resolved', async () => {
        const queue = new Queue({ maxConcurrent: 1 });
        const handler1 = vi.fn().mockImplementation(() => waitFor(1000));
        const handler2 = vi.fn().mockImplementation(() => waitFor(1000));
        const whenDoneHandler = vi.fn();

        queue.add(handler1);
        queue.add(handler2);
        void queue.lockQueue().then(whenDoneHandler);

        await vi.advanceTimersByTimeAsync(1000);

        expect(whenDoneHandler).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(1000);

        expect(whenDoneHandler).toHaveBeenCalled();
    });
});
