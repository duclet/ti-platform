import type { ColorOption } from '@src/utils';
import { ensureType, toMap } from '@ti-platform/aide';

/**
 * Unique name for a step.
 */
export type TimelineStepName = string;

/**
 * Representing a step in the timeline.
 *
 */
export type TimelineStep = {
    /**
     * Unique name for the step.
     */
    name: TimelineStepName;

    /**
     * The title for the step.
     */
    title: string;

    /**
     * Task to run when the step starts.
     *
     * @param step
     *  The current step definition.
     */
    task: (step: TimelineStep) => Promise<TimelineStepTaskResult>;

    /**
     * The content for the body of the timeline step. Note that for more complex bodies, you can leave this `undefined`
     * and use the slot instead. The slot name will be following the pattern `[TimelineStep.name]--body`. It will also
     * be given the following props:
     *  - status: The current status of the step.
     */
    body?: string;

    /**
     * Flag to determine if the step is initially hidden on the timeline until it is started. Set to true to hide it
     * initially or to false to keep it visible.
     */
    isInitiallyHidden?: boolean;
};

/**
 * Represents the result of executing a step and what is expected to happen next.
 */
export type TimelineStepTaskResult = {
    /**
     * True to mark the step as having failed.
     */
    failed: boolean;

    /**
     * List of timelineSteps to execute next.
     */
    nextSteps: Array<TimelineStepName>;

    /**
     * List of timelineSteps to skip.
     */
    skipSteps: Array<TimelineStepName>;
};

/**
 * Represents the status of a step.
 */
export type TimelineStepStatus = {
    /**
     * The name of the status.
     */
    name: string;

    /**
     * True if the step is considered to be a completed step, false otherwise.
     */
    isCompletedStep: boolean;
};

/**
 * Function to use to get the color for a step.
 *
 * @param status
 *  The current status of the step.
 * @returns
 *  The color for the step. Refer to PrimeVue's Button `severity` prop.
 */
export type TimelineStepColorSupplier = (status: TimelineStepStatus) => ColorOption;

/**
 * Function to use to get the icon for a step.
 *
 * @param status
 *  The current status of the step.
 * @returns
 *  The icon for the step. Refer to PrimeVue's Button `icon` prop.
 */
export type TimelineStepIconSupplier = (status: TimelineStepStatus) => string;

/**
 * Map of {@link TimelineStepStatus}'s name to its definition.
 */
export const TimelineStepStatuses = toMap(
    ensureType<TimelineStepStatus>()([
        { name: 'FAILED', isCompletedStep: true },
        { name: 'IN_PROGRESS', isCompletedStep: false },
        { name: 'NOT_STARTED', isCompletedStep: false },
        { name: 'SKIPPED', isCompletedStep: true },
        { name: 'SUCCEED', isCompletedStep: true },
    ] as const),
    (item) => item.name,
    (item) => item
);

/**
 * Create the result for the execution of a task.
 */
export function createTimelineStepTaskResult({
    failed,
    nextSteps,
    skipSteps,
}: Partial<TimelineStepTaskResult> = {}): TimelineStepTaskResult {
    return {
        failed: !!failed,
        nextSteps: nextSteps ?? [],
        skipSteps: skipSteps ?? [],
    };
}

/**
 * Determine if the two {@link TimelineStepStatus} is the same.
 *
 * @param status1
 *  The first status to check.
 * @param status2
 *  The second status to check.
 */
export function isSameTimelineStepStatus(status1: TimelineStepStatus, status2: TimelineStepStatus) {
    return status1.name === status2.name;
}
