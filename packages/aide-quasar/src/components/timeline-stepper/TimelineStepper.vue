<template>
    <QSlideTransition>
        <div v-if="!isFullyCompletedDebounced || !isHiddenWhenFullyCompleted">
            <QTimeline>
                <QTimelineEntry
                    v-for="step in filteredSteps"
                    :key="step.name"
                    :color="colorSupplier(stateMap[step.name].status)"
                    :icon="iconSupplier(stateMap[step.name].status)"
                    :subtitle="step.subtitle"
                >
                    <QSlideTransition>
                        <div v-if="isTimelineBodyVisible(step)">
                            <!--
                            @slot Slot for displaying the body for an individual step.
                                @binding {TimelineStep} step The timeline step this is for.
                                @binding {TimelineStepStatus} status The current status of the step.
                            -->
                            <slot :name="`${step.name}--body`" :step="step" :status="stateMap[step.name].status">
                                <!--
                                @slot Slot for displaying the body for all steps.
                                    @binding {TimelineStep} step The timeline step this is for.
                                    @binding {TimelineStepStatus} status The current status of the step.
                                -->
                                <slot name="body" :step="step" :status="stateMap[step.name].status">
                                    {{ step.body }}
                                </slot>
                            </slot>
                        </div>
                    </QSlideTransition>
                </QTimelineEntry>
            </QTimeline>
        </div>
    </QSlideTransition>
    <QSlideTransition>
        <!-- @slot Slot for displaying content after all steps has been fully completed. -->
        <slot v-if="isFullyCompletedDebounced" name="fully-completed" />
    </QSlideTransition>
</template>

<script setup lang="ts">
    /*@component
    This component enables users to perform certain tasks and view the current progress and results in a timeline-style
    user interface.
    */
    import { toMap } from '@ti-platform/aide';
    import { useDebounce, whenever } from '@vueuse/core';
    import { QSlideTransition, QTimeline, QTimelineEntry } from 'quasar';
    import { computed, onMounted, ref } from 'vue';

    import {
        isSameTimelineStepStatus,
        TimelineStep,
        TimelineStepColorSupplier,
        TimelineStepIconSupplier,
        TimelineStepName,
        TimelineStepStatus,
        TimelineStepStatuses,
    } from './api';
    import { getTimelineStepColorByStatus, getTimelineStepIconByStatus, TimelineStepState } from './internal';

    const props = withDefaults(
        defineProps<{
            /**
             * The list of steps the initially and automatically execute.
             */
            initialSteps: Array<TimelineStepName>;
            /**
             * The list of all the TimelineStep.
             */
            steps: Array<TimelineStep>;

            /**
             * If isHiddenWhenFullyCompleted is true, then this configures the number of milliseconds to wait after all the
             * tasks are completed to hide this component. Defaults to 1000.
             */
            fullyCompletedHiddenTimeoutMs?: number;

            /**
             * If true, this component will automatically hide itself after a configured delay. Defaults to false.
             */
            isHiddenWhenFullyCompleted?: boolean;

            /**
             * If true, each steps default is to be initially hidden rather than visible. This value is used as the fallback
             * value when the same property is not set in the step itself.
             */
            isInitiallyHidden?: boolean;

            /**
             * If given, function to use to get the color for a step. If not given, this component has its own internal
             * mapping that it will use based on the current status of the step.
             */
            colorSupplier?: TimelineStepColorSupplier;

            /**
             * If given, function to use to get the icon for a step. If not given, this component has its own internal
             * mapping that it will use based on the current status of the step.
             */
            iconSupplier?: TimelineStepIconSupplier;
        }>(),
        {
            colorSupplier: () => getTimelineStepColorByStatus,
            fullyCompletedHiddenTimeoutMs: 1000,
            iconSupplier: () => getTimelineStepIconByStatus,
            isHiddenWhenFullyCompleted: false,
            isInitiallyHidden: false,
        }
    );

    const emit = defineEmits<{
        /**
         * Triggered when all tasks are completed. Note that this is triggered after wait for the configured delay.
         *
         * @event fully-completed
         */
        (event: 'fully-completed'): void;
    }>();

    // When a step is of one of these statuses, the body should not be visible.
    const HIDDEN_BODY_STATUSES: Array<TimelineStepStatus> = [
        TimelineStepStatuses.NOT_STARTED,
        TimelineStepStatuses.SKIPPED,
    ];

    // For each of the steps, create an internal state object for it
    const stateMap = ref(
        toMap<TimelineStepName, TimelineStep, TimelineStepState>(
            props.steps,
            (step) => step.name,
            () => new TimelineStepState()
        )
    );

    // Only show steps in the timeline if it has started or is configured to be visible
    const filteredSteps = computed(() =>
        props.steps.filter(
            (step) =>
                !isSameTimelineStepStatus(TimelineStepStatuses.NOT_STARTED, stateMap.value[step.name].status) ||
                !(step.isInitiallyHidden ?? props.isInitiallyHidden ?? false)
        )
    );

    const isFullyCompleted = computed(() => Object.values(stateMap.value).every((step) => step.status.isCompletedStep));
    const isFullyCompletedDebounced = useDebounce(isFullyCompleted, props.fullyCompletedHiddenTimeoutMs);

    function isTimelineBodyVisible(step: TimelineStep): boolean {
        return !HIDDEN_BODY_STATUSES.find((s) => isSameTimelineStepStatus(s, stateMap.value[step.name].status));
    }

    async function runStepTask(stepName: TimelineStepName) {
        const step = props.steps.find((item) => item.name === stepName);
        if (!step) {
            throw new Error(`Given step name, ${stepName}, does not exists`);
        }

        const state = stateMap.value[stepName];
        state.status = TimelineStepStatuses.IN_PROGRESS;
        const result = await step.task(step);
        state.status = result.failed ? TimelineStepStatuses.FAILED : TimelineStepStatuses.SUCCEED;

        result.skipSteps.forEach(
            (nextStepName) => (stateMap.value[nextStepName].status = TimelineStepStatuses.SKIPPED)
        );
        result.nextSteps.forEach((nextStepName) => void runStepTask(nextStepName));
    }

    onMounted(() => {
        props.initialSteps.forEach((nextStepName) => void runStepTask(nextStepName));

        whenever(isFullyCompletedDebounced, () => emit('fully-completed'));
    });
</script>

<style lang="scss" scoped></style>
