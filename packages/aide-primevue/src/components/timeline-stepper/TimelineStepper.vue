<template>
    <div :class="cx('root')" v-bind="ptmi('root')">
        <transition name="p-toggleable-content">
            <Timeline
                v-if="!isFullyCompletedDebounced || !isHiddenWhenFullyCompleted"
                :value="filteredSteps"
                pt:event-opposite:style="display: none"
                v-bind="ptm('pc-timeline')"
            >
                <template #marker="{ item }: { item: TimelineStep }">
                    <div v-bind="ptm('icon')">
                        <!--
                        @slot Individual slot for each step for displaying the icon. Use this to configure each step individually.
                        @binding {TimelineStep} step The timeline step this is for.
                        @binding {TimelineStepStatus} status The current status of the step.
                        -->
                        <slot :name="`${item.name}--icon`" :step="item" :status="getState(item).status">
                            <!--
                            @slot Default slot for displaying the icon. Use this to configure for all steps.
                            @binding {TimelineStep} step The timeline step this is for.
                            @binding {TimelineStepStatus} status The current status of the step.
                            -->
                            <slot name="icon" :step="item" :status="getState(item).status">
                                <Button
                                    :icon="iconSupplier(getState(item).status)"
                                    :severity="getSeverityForButton(colorSupplier(getState(item).status))"
                                    rounded
                                    v-bind="ptm('pc-default-icon')"
                                />
                            </slot>
                        </slot>
                    </div>
                </template>
                <template #content="{ item }: { item: TimelineStep }">
                    <div :class="cx('content')" v-bind="ptm('content')">
                        <Card v-bind="ptm('pc-content-card')">
                            <template #title>
                                <Message
                                    :severity="getSeverityForMessage(colorSupplier(getState(item).status))"
                                    v-bind="ptm('pc-task-title')"
                                >
                                    {{ item.title }}
                                </Message>
                            </template>
                            <template #content>
                                <transition name="p-toggleable-content">
                                    <div v-if="isTimelineBodyVisible(item)" v-bind="ptm('task-body')">
                                        <!--
                                        @slot Slot for displaying the body for an individual step.
                                        @binding {TimelineStep} step The timeline step this is for.
                                        @binding {TimelineStepStatus} status The current status of the step.
                                        -->
                                        <slot :name="`${item.name}--body`" :step="item" :status="getState(item).status">
                                            <!--
                                            @slot Slot for displaying the body for all steps.
                                            @binding {TimelineStep} step The timeline step this is for.
                                            @binding {TimelineStepStatus} status The current status of the step.
                                            -->
                                            <slot name="body" :step="item" :status="getState(item).status">
                                                {{ item.body }}
                                            </slot>
                                        </slot>
                                    </div>
                                </transition>
                            </template>
                        </Card>
                    </div>
                </template>
            </Timeline>
        </transition>
        <transition name="p-toggleable-content">
            <!-- @slot Slot for displaying content after all steps has been fully completed. -->
            <slot v-if="isFullyCompletedDebounced" name="fully-completed" />
        </transition>
    </div>
</template>

<script lang="ts">
    import BaseTimelineStepper from '@src/components/timeline-stepper/BaseTimelineStepper.vue';

    export default {
        name: 'TimelineStepper',
        extends: BaseTimelineStepper,
        inheritAttrs: false,
    };
</script>

<script setup lang="ts">
    /*@component
    This component enables users to perform certain tasks and view the current progress and results in a timeline-style
    user interface.

    In following with PrimeVue's passthrough functionality, the following are available:
    - **root**: The DOM element encapsulating the whole component.
    - **pc-timeline**: The Timeline component used to display the steps.
    - **icon**: The DOM element encapsulating the icon.
    - **pc-default-icon**: The Button component for displaying the default icon for each step.
    - **content**: The DOM element that wraps the content of each step.
    - **pc-content-card**: The Card component that wraps the step's content.
    - **pc-task-title**: The Message component that displays the title of the task.
    - **task-body**: The DOM element that wraps the body of the step.
    */
    import { exposePrimeVueHelpers, getSeverityForButton, getSeverityForMessage } from '@src/utils';
    import { toMap } from '@ti-platform/aide';
    import { useDebounce, whenever } from '@vueuse/core';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import Message from 'primevue/message';
    import Timeline from 'primevue/timeline';
    import { computed, onMounted, ref } from 'vue';

    import type {
        TimelineStep,
        TimelineStepColorSupplier,
        TimelineStepIconSupplier,
        TimelineStepName,
        TimelineStepStatus,
    } from './api';
    import { isSameTimelineStepStatus, TimelineStepStatuses } from './api';
    import { getTimelineStepColorByStatus, getTimelineStepIconByStatus, TimelineStepState } from './internal';

    const { cx, ptm, ptmi } = exposePrimeVueHelpers();

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
            fullyCompletedHiddenTimeoutMs: 1000,
            isHiddenWhenFullyCompleted: false,
            isInitiallyHidden: false,
            colorSupplier: getTimelineStepColorByStatus,
            iconSupplier: getTimelineStepIconByStatus,
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

    function getState(step: TimelineStep): TimelineStepState {
        return stateMap.value[step.name];
    }

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
