import { TimelineStepColorSupplier, TimelineStepIconSupplier, TimelineStepStatus, TimelineStepStatuses } from './api';

/**
 * Tracking the state of a step.
 */
export class TimelineStepState {
    /**
     * The current status for the step.
     */
    public status: TimelineStepStatus = TimelineStepStatuses.NOT_STARTED;
}

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
