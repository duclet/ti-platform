import { ensureType, toMap } from '@ti-platform/aide';

/**
 * Unique name for a step.
 */
export type TimelineStepName = string;

/**
 * @property name
 *  Unique name for the step.
 * @property task
 *  Task to run when the step starts.
 * @property body
 *  The content for the body of the timeline step. Note that for more complex bodies, you can leave this undefined and
 *  use the slot instead. The slot name will be following the pattern "[TimelineStep.name]--body". It will also be given
 *  the following props:
 *      - status: The current status of the step.
 * @property subtitle
 *  The subtitle for the step.
 */
export type TimelineStep = {
    name: TimelineStepName;
    subtitle: string;
    task: (step: TimelineStep) => Promise<TimelineStepTaskResult>;

    body?: string;
};

/**
 * @property failed
 *  True to mark the step as having failed.
 * @property nextSteps
 *  List of timelineSteps to execute next.
 * @property skipSteps
 *  List of timelineSteps to skip.
 */
export type TimelineStepTaskResult = {
    failed: boolean;
    nextSteps: Array<TimelineStepName>;
    skipSteps: Array<TimelineStepName>;
};

/**
 * @property name
 *  The name of the status.
 * @property isCompletedStep
 *  True if the step is considered to be a completed step, false otherwise.
 */
export type TimelineStepStatus = {
    name: string;
    isCompletedStep: boolean;
};

/**
 * Function to use to get the color for a step.
 *
 * @param status
 *  The current status of the step.
 * @returns
 *  The color for the step.
 */
export type TimelineStepColorSupplier = (status: TimelineStepStatus) => string;

/**
 * Function to use to get the icon for a step.
 *
 * @param status
 *  The current status of the step.
 * @returns
 *  The icon for the step or undefined if it should not use any icon.
 */
export type TimelineStepIconSupplier = (status: TimelineStepStatus) => string | undefined;

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
 *
 * @param args
 * @param args.failed
 *  True if the task execution failed. Set to false or not include if it was a success.
 * @param args.nextSteps
 *  The list of {@link TimelineStepName} to execute next.
 * @param skipSteps
 *  The list of {@link TimelineStepName} to mark as being skipped.
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
