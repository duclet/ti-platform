import { PrimeIcons } from '@primevue/core';
import type {
    TimelineStepColorSupplier,
    TimelineStepIconSupplier,
    TimelineStepStatus,
} from '@src/components/timeline-stepper/api';
import { TimelineStepStatuses } from '@src/components/timeline-stepper/api';
import { ColorOption } from '@src/utils';

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
            return ColorOption.SUCCESS;
        case TimelineStepStatuses.FAILED.name:
            return ColorOption.ERROR;
        case TimelineStepStatuses.IN_PROGRESS.name:
            return ColorOption.WARN;
        case TimelineStepStatuses.SKIPPED.name:
            return ColorOption.SECONDARY;
        case TimelineStepStatuses.NOT_STARTED.name:
        default:
            return ColorOption.INFO;
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
            return PrimeIcons.CHECK_CIRCLE;
        case TimelineStepStatuses.FAILED.name:
            return PrimeIcons.EXCLAMATION_CIRCLE;
        case TimelineStepStatuses.IN_PROGRESS.name:
            return PrimeIcons.HOURGLASS;
        case TimelineStepStatuses.SKIPPED.name:
            return PrimeIcons.MINUS_CIRCLE;
        case TimelineStepStatuses.NOT_STARTED.name:
        default:
            return PrimeIcons.CIRCLE;
    }
};
