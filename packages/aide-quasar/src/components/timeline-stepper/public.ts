import { MarkReadonly } from '@ti-platform/aide';

import { TimelineStepStateInternal, TimelineStepStatus, TimelineStepStatuses } from './internal';

export { TimelineStepStatuses };
export type { TimelineStepStatus };
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

export type TimelineStepStatePublic = MarkReadonly<TimelineStepStateInternal, 'status'>;

export function createTimelineStep(
    name: TimelineStep['name'],
    subtitle: TimelineStep['subtitle'],
    task: TimelineStep['task'],
    body?: string
): TimelineStep {
    return {
        name,
        subtitle,
        task,
        body,
    };
}

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

export function getTimelineStepColorByStatus(status: TimelineStepStatus) {
    switch (status.name) {
        case TimelineStepStatuses.SUCCEED.name:
            return 'positive';
        case TimelineStepStatuses.FAILED.name:
            return 'negative';
        case TimelineStepStatuses.IN_PROGRESS.name:
            return 'warning';
        case TimelineStepStatuses.SKIPPED.name:
            return 'grey-12';
        case 'not-started':
        default:
            return 'primary';
    }
}

export type TimelineStepColorSupplier = (...args: Parameters<typeof getTimelineStepColorByStatus>) => string;

export function getTimelineStepIconByStatus(status: TimelineStepStatus) {
    switch (status.name) {
        case TimelineStepStatuses.SUCCEED.name:
            return 'done_all';
        case TimelineStepStatuses.FAILED.name:
            return 'new_releases';
        case TimelineStepStatuses.IN_PROGRESS.name:
            return 'hourglass_top';
        case TimelineStepStatuses.SKIPPED.name:
            return 'hourglass_disabled';
        case TimelineStepStatuses.NOT_STARTED.name:
        default:
            return undefined;
    }
}

export type TimelineStepIconSupplier = (...args: Parameters<typeof getTimelineStepIconByStatus>) => string;
