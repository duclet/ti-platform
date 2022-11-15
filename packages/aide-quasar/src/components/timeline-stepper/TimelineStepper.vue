<template>
    <QSlideTransition>
        <div v-if="!isFullyCompletedDebounced || !isHiddenWhenFullyCompleted">
            <QTimeline>
                <QTimelineEntry
                    v-for="step in steps"
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
    This component allows you to execute certain tasks and display the current progress and results in a timeline like
    UI.
    */
    import { toMap } from '@ti-platform/aide';
    import { useDebounce, whenever } from '@vueuse/core';
    import { QSlideTransition, QTimeline, QTimelineEntry } from 'quasar';
    import { computed, onMounted, ref } from 'vue';

    import {
        TimelineStep,
        TimelineStepColorSupplier,
        TimelineStepIconSupplier,
        TimelineStepName,
        TimelineStepStatuses,
    } from './api';
    import { getTimelineStepColorByStatus, getTimelineStepIconByStatus, TimelineStepState } from './internal';

    const props = defineProps<{
        /**
         * The list of steps the initially and automatically execute.
         */
        initialSteps: Array<TimelineStepName>;
        /**
         * The list of all the TimelineStep.
         */
        steps: Array<TimelineStep>;

        /**
         * If true, this component will automatically hide itself after a configured delay. Defaults to false.
         */
        isHiddenWhenFullyCompleted?: boolean;
        /**
         * If isHiddenWhenFullyCompleted is true, then this configures the number of milliseconds to wait after all the
         * tasks are completed to hide this component. Defaults to 1000.
         */
        fullyCompletedHiddenTimeoutMs?: number;

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
    }>();

    const emit = defineEmits<{
        /**
         * Triggered when all tasks are completed. Note that this is triggered after wait for the configured delay.
         *
         * @event fully-completed
         */
        (event: 'fully-completed'): void;
    }>();

    const HIDDEN_BODY_STATUSES: Array<string> = [TimelineStepStatuses.NOT_STARTED, TimelineStepStatuses.SKIPPED].map(
        (status) => status.name
    );

    const fullyCompletedHiddenTimeoutMs = props.fullyCompletedHiddenTimeoutMs ?? 1000;

    const stateMap = ref(
        toMap<TimelineStepName, TimelineStep, TimelineStepState>(
            props.steps,
            (step) => step.name,
            () => new TimelineStepState()
        )
    );

    const colorSupplier = computed(() => props.colorSupplier ?? getTimelineStepColorByStatus);
    const iconSupplier = computed(() => props.iconSupplier ?? getTimelineStepIconByStatus);
    const isFullyCompleted = computed(() => Object.values(stateMap.value).every((step) => step.status.isCompletedStep));
    const isFullyCompletedDebounced = useDebounce(isFullyCompleted, fullyCompletedHiddenTimeoutMs);

    function isTimelineBodyVisible(step: TimelineStep) {
        return !HIDDEN_BODY_STATUSES.includes(stateMap.value[step.name].status.name);
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

        result.skipSteps.forEach((nextStepName) => void runStepTask(nextStepName));
        result.nextSteps.forEach((nextStepName) => void runStepTask(nextStepName));
    }

    onMounted(() => {
        props.initialSteps.forEach((nextStepName) => void runStepTask(nextStepName));

        whenever(isFullyCompletedDebounced, () => emit('fully-completed'));
    });
</script>

<style lang="scss" scoped></style>
