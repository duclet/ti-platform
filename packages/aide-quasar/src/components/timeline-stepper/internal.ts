import { ensureType, toMap } from '@ti-platform/aide';

export type TimelineStepStatus = {
    name: string;
    isCompletedStep: boolean;
};

const AllTimelineStepStatuses = ensureType<TimelineStepStatus>()([
    { name: 'FAILED', isCompletedStep: true },
    { name: 'IN_PROGRESS', isCompletedStep: false },
    { name: 'NOT_STARTED', isCompletedStep: false },
    { name: 'SKIPPED', isCompletedStep: true },
    { name: 'SUCCEED', isCompletedStep: true },
] as const);

export const TimelineStepStatuses = toMap(
    AllTimelineStepStatuses,
    (item) => item.name,
    (item) => item
);

export class TimelineStepStateInternal {
    public status: TimelineStepStatus = TimelineStepStatuses.NOT_STARTED;
}
