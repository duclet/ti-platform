import type { Awaitable } from '@ti-platform/aide';
import { asComputed } from '@ti-platform/aide-vue';
import { useTimeoutFn, useTimeoutPoll } from '@vueuse/core';
import type { ComputedRef } from 'vue';
import { ref } from 'vue';

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

/**
 * Return value of the {@link usePolling} function.
 */
export type UsePollingRetVal = {
    /**
     * The current state of the polling.
     */
    state: ComputedRef<PollingState>;

    /**
     * Start polling.
     */
    startPolling: () => UsePollingRetVal;
};

/**
 * See if the given state is considered a failure, either it was considered a failure by the executing function or it
 * had timed out.
 *
 * @param state The state to validate.
 * @returns Returns true if it is considered to be a failure, false otherwise.
 */
export function isPollingFailure(state: PollingState) {
    return [PollingState.FAILURE, PollingState.TIMEOUT].includes(state);
}

/**
 * Keep executing the provided function until it returns a success, failure, or it has timed out. Note that the next
 * polling will not start until the current task finishes.
 *
 * @param fn The function to execute. The function should return {@link PollingState.POLLING} to have the polling to
 *  continue. Returning either {@link PollingState.SUCCESS} or {@link PollingState.FAILURE} will stop polling.
 * @param intervalMs The time in milliseconds between each poll.
 * @param timeoutMs The maximum time in milliseconds before it is considered a polling timeout.
 * @returns Return an object with the current state of the polling and function to start the polling.
 */
export function usePolling(fn: () => Awaitable<PollingState>, intervalMs: number, timeoutMs: number): UsePollingRetVal {
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

    const retVal: UsePollingRetVal = { state: asComputed(state), startPolling };
    return retVal;
}
