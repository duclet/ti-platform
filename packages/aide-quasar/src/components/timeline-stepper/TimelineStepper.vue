<template>
    <q-slide-transition>
        <div v-if="!isFullyCompletedDebounced || !isHiddenWhenFullyCompleted">
            <q-timeline>
                <q-timeline-entry
                    v-for="step in steps"
                    :key="step.name"
                    :color="colorSupplier(stateMap[step.name].status)"
                    :icon="iconSupplier(stateMap[step.name].status)"
                    :subtitle="step.subtitle"
                >
                    <q-slide-transition>
                        <div v-if="isTimelineBodyVisible(step)">
                            <slot :name="`${step.name}--body`" :status="stateMap[step.name].status">
                                {{ step.body }}
                            </slot>
                        </div>
                    </q-slide-transition>
                </q-timeline-entry>
            </q-timeline>
        </div>
    </q-slide-transition>
    <q-slide-transition>
        <slot v-if="isFullyCompletedDebounced" name="fully-completed" />
    </q-slide-transition>
</template>

<script setup lang="ts">
    import { toMap } from '@ti-platform/aide';
    import { useDebounce, whenever } from '@vueuse/core';
    import { QSlideTransition, QTimeline, QTimelineEntry } from 'quasar';
    import { computed, onMounted, ref } from 'vue';

    import { TimelineStepStateInternal } from './internal';
    import {
        getTimelineStepColorByStatus,
        getTimelineStepIconByStatus,
        TimelineStep,
        TimelineStepColorSupplier,
        TimelineStepIconSupplier,
        TimelineStepName,
        TimelineStepStatePublic,
        TimelineStepStatuses,
    } from './public';

    const props = defineProps<{
        initialSteps: Array<TimelineStepName>;
        steps: Array<TimelineStep>;

        isHiddenWhenFullyCompleted?: boolean;
        colorSupplier?: TimelineStepColorSupplier;
        fullyCompletedHiddenTimeoutMs?: number;
        iconSupplier?: TimelineStepIconSupplier;
    }>();

    const emit = defineEmits<{
        (event: 'fully-completed'): void;
    }>();

    const HIDDEN_BODY_STATUSES: Array<string> = [TimelineStepStatuses.NOT_STARTED, TimelineStepStatuses.SKIPPED].map(
        (status) => status.name
    );

    const fullyCompletedHiddenTimeoutMs = props.fullyCompletedHiddenTimeoutMs ?? 1000;

    const stateMap = ref(
        toMap<TimelineStepName, TimelineStep, TimelineStepStatePublic>(
            props.steps,
            (step) => step.name,
            () => new TimelineStepStateInternal()
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

        const state = stateMap.value[stepName] as TimelineStepStateInternal;
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
