import {
    type TimelineStepColorSupplier,
    type TimelineStepIconSupplier,
    type TimelineStepStatus,
    TimelineStepStatuses,
} from './api';

/**
 * Tracking the state of a step.
 */
export class TimelineStepState {
    /**
     * The current status for the step.
     */
    public status: TimelineStepStatus = TimelineStepStatuses.NOT_STARTED;
}

/**
 * Default {@link TimelineStepColorSupplier} to use when not given by user of component.
 *
 * @param status
 *  The current status of the step.
 */
export const getTimelineStepColorByStatus: TimelineStepColorSupplier = (status: TimelineStepStatus) => {
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
};

/**
 * Default {@link TimelineStepIconSupplier} to use when not given by user of component.
 *
 * @param status
 *  The current status of the step.
 */
export const getTimelineStepIconByStatus: TimelineStepIconSupplier = (status: TimelineStepStatus) => {
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
};
