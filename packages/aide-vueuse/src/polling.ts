import { Awaitable, useTimeoutFn, useTimeoutPoll } from '@vueuse/core';
import { ComputedRef, ref } from 'vue';

/**
 * The state of the polling.
 */
export enum PollingState {
    NOT_STARTED,
    POLLING,
    SUCCESS,
    FAILURE,
    TIMEOUT,
}

export type UsePollingRetVal = {
    state: ComputedRef<PollingState>;
    startPolling: () => UsePollingRetVal;
};

/**
 * See if the given state is considered a failure, either it was considered a failure by the executing function or it
 * had timed out.
 *
 * @param state
 *  The state to validate.
 * @return
 *  Returns true if it is considered to be a failure, false otherwise.
 */
export function isPollingFailure(state: PollingState) {
    return [PollingState.FAILURE, PollingState.TIMEOUT].includes(state);
}

/**
 * Keep executing the provided function until it returns a success, failure, or it has timed out. Note that the next
 * polling will not start until the current task finishes.
 *
 * @param fn
 *  The function to execute. The function should return {@link PollingState.POLLING} to have the polling to continue.
 *  Returning either {@link PollingState.SUCCESS} or {@link PollingState.FAILURE} will stop polling.
 * @param intervalMs
 *  The time in milliseconds between each poll.
 * @param timeoutMs
 *  The maximum time in milliseconds before it is considered a polling timeout.
 * @return
 *  Return an object with the current state of the polling and function to start the polling.
 */
export function usePolling(fn: () => Awaitable<PollingState>, intervalMs: number, timeoutMs: number) {
    const state = ref(PollingState.NOT_STARTED);

    const { resume, pause } = useTimeoutPoll(
        async () => {
            state.value = PollingState.POLLING;
            state.value = await fn();

            if ([PollingState.SUCCESS, PollingState.FAILURE].includes(state.value)) {
                pause();
                stop();
            }
        },
        intervalMs,
        { immediate: false }
    );

    const { start, stop } = useTimeoutFn(
        () => {
            state.value = PollingState.TIMEOUT;
            pause();
        },
        timeoutMs,
        { immediate: false }
    );

    function startPolling() {
        resume();
        start();

        return retVal;
    }

    const retVal = { state, startPolling } as UsePollingRetVal;
    return retVal;
}