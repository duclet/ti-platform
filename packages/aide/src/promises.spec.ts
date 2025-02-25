import { Deferred, waitFor } from '@src/promises';
import { expect } from '@ti-platform/aide-test';
import { afterEach, beforeEach, describe, test, vi } from 'vitest';

const it = test.extend<{
    deferred: Deferred<boolean>;
}>({
    deferred: async ({ task }, use) => {
        await use(new Deferred<boolean>());
    },
});

describe('waitFor', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should wait for the required time before resolving', async () => {
        const handler = vi.fn();
        void waitFor(1000).then(handler);

        expect(handler).not.toHaveBeenCalled();

        await vi.advanceTimersByTimeAsync(1000);

        expect(handler).toHaveBeenCalledOnce();
    });
});

describe('Deferred', () => {
    it('should execute the then handler when the deferred is resolved', async ({ deferred }) => {
        const thenHandler = vi.fn();
        const catchHandler = vi.fn();

        deferred.resolve(true);
        await deferred.promise.then(thenHandler).catch(catchHandler);

        expect(thenHandler).toHaveBeenCalledTimes(1).toHaveBeenCalledWith(true);
        expect(catchHandler).not.toHaveBeenCalledWith();
    });

    it('should execute the catch handler when the deferred is rejected', async ({ deferred }) => {
        const thenHandler = vi.fn();
        const catchHandler = vi.fn();

        deferred.reject('Rejected');
        await deferred.promise.then(thenHandler).catch(catchHandler);

        expect(thenHandler).not.toHaveBeenCalled();
        expect(catchHandler).toHaveBeenCalledTimes(1).toHaveBeenCalledWith('Rejected');
    });
});
