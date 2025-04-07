import type { UsePollingRetVal } from '@src/polling';
import { isPollingFailure, PollingState, usePolling } from '@src/polling';
import type { Awaitable } from '@ti-platform/aide';
import { expect } from '@ti-platform/aide-test';
import type { Mock } from 'vitest';
import { afterEach, beforeEach, describe, test, vi } from 'vitest';

const it = test.extend<{
    handler: Mock<() => Awaitable<PollingState>>;
    usePollingRet: UsePollingRetVal;
}>({
    handler: async ({ task }, use) => {
        await use(vi.fn());
    },

    usePollingRet: async ({ task, handler }, use) => {
        await use(usePolling(handler, 1, 5));
    },
});

describe('isPollingFailure', () => {
    it('should return true for FAILURE state', () => {
        expect(isPollingFailure(PollingState.FAILURE)).toBe(true);
    });

    it('should return true for TIMEOUT state', () => {
        expect(isPollingFailure(PollingState.TIMEOUT)).toBe(true);
    });

    it('should return false for other states', () => {
        expect(isPollingFailure(PollingState.NOT_STARTED)).toBe(false);
        expect(isPollingFailure(PollingState.POLLING)).toBe(false);
        expect(isPollingFailure(PollingState.SUCCESS)).toBe(false);
    });
});

describe('usePolling', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return the current state and a function to start the polling', ({ handler, usePollingRet }) => {
        expect(handler).not.toHaveBeenCalled();
        expect(usePollingRet)
            .toHaveProperty('state')
            .toHaveProperty('startPolling')
            .map((v) => v.state.value)
            .toBe(PollingState.NOT_STARTED);
    });

    it('should keep polling until there is a success or failure', async ({ handler, usePollingRet }) => {
        handler
            .mockResolvedValueOnce(PollingState.POLLING)
            .mockResolvedValueOnce(PollingState.POLLING)
            .mockResolvedValueOnce(PollingState.SUCCESS);

        usePollingRet.startPolling();

        await vi.advanceTimersToNextTimerAsync();

        expect(handler).toHaveBeenCalledOnce();
        expect(usePollingRet.state.value).toBe(PollingState.POLLING);

        await vi.advanceTimersByTimeAsync(1);

        expect(handler).toHaveBeenCalledTimes(2);
        expect(usePollingRet.state.value).toBe(PollingState.POLLING);

        await vi.advanceTimersByTimeAsync(1);

        expect(handler).toHaveBeenCalledTimes(3);
        expect(usePollingRet.state.value).toBe(PollingState.SUCCESS);

        await vi.advanceTimersByTimeAsync(10);

        expect(handler).toHaveBeenCalledTimes(3);
        expect(usePollingRet.state.value).toBe(PollingState.SUCCESS);
    });

    it('should set the state as a timeout when it ran out of time', async ({ handler, usePollingRet }) => {
        handler.mockResolvedValue(PollingState.POLLING);

        usePollingRet.startPolling();

        await vi.advanceTimersByTimeAsync(10);

        expect(handler).toHaveBeenCalledTimes(4);
        expect(usePollingRet.state.value).toBe(PollingState.TIMEOUT);
    });
});
