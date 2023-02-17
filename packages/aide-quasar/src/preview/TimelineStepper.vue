<template>
    <QSplitter v-model="splitterModel">
        <template #before>
            <QCardSection>
                <QSelect
                    v-model="initialSteps"
                    :options="rawSteps.map((s) => s.name).sort()"
                    label="Initial Steps"
                    clearable
                    multiple
                />
                <QSelect
                    v-model="step1NextStep"
                    :options="
                        rawSteps
                            .map((s) => s.name)
                            .filter((s) => s !== 'step1')
                            .sort()
                    "
                    label="Step 1 Next Step"
                />
                <QInput
                    v-model.number="fullCompletedHiddenTimeoutMs"
                    label="Fully Completed Hidden Timeout MS"
                    min="0"
                    type="number"
                />
                <QToggle
                    v-model="isInitiallyHidden"
                    label="Is Initially Hidden?"
                    checked-icon="check"
                    unchecked-icon="clear"
                />
                <QToggle
                    v-model="isHiddenWhenFullyCompleted"
                    label="Is Hidden When Fully Completed?"
                    checked-icon="check"
                    unchecked-icon="clear"
                />
                <QToggle
                    v-model="reverseStepList"
                    label="Reverse Step List?"
                    checked-icon="check"
                    unchecked-icon="clear"
                />
            </QCardSection>
            <QCardActions>
                <QBtn color="primary" label="Reload Component" @click="isComponentVisible = false" />
            </QCardActions>
            <QCardSection>
                <strong>Step Definitions:</strong><br />
                <pre>{{ JSON.stringify(rawSteps, undefined, 2) }}</pre>
            </QCardSection>
        </template>
        <template #after>
            <QCardSection v-if="isComponentVisible">
                <TimelineStepperComponent
                    :fully-completed-hidden-timeout-ms="fullCompletedHiddenTimeoutMs"
                    :initial-steps="initialSteps"
                    :is-hidden-when-fully-completed="isHiddenWhenFullyCompleted"
                    :is-initially-hidden="isInitiallyHidden"
                    :steps="steps"
                />
            </QCardSection>
        </template>
    </QSplitter>
</template>

<script setup lang="ts">
    import { promiseTimeout, refAutoReset } from '@vueuse/core';
    import { computed, ref } from 'vue';

    import { createTimelineStepTaskResult, TimelineStep, TimelineStepName, TimelineStepperComponent } from '../index';

    const splitterModel = ref(30);
    const isComponentVisible = refAutoReset(true, 1000);

    const rawSteps: Array<TimelineStep> = [
        {
            name: 'step1',
            subtitle: 'Step 1',
            body: 'Should succeed after 2 seconds',
            task: async (step) => {
                await promiseTimeout(2000);

                return createTimelineStepTaskResult({
                    nextSteps: [step1NextStep.value],
                });
            },
        },
        {
            name: 'step2',
            subtitle: 'Step 2',
            task: (step) =>
                Promise.resolve(
                    createTimelineStepTaskResult({ nextSteps: ['step6'], skipSteps: ['step3', 'step4', 'step5'] })
                ),
            isInitiallyHidden: true,
        },
        {
            name: 'step3',
            subtitle: 'Step 3',
            body: 'Should fail after 1 second',
            task: async (step) => {
                await promiseTimeout(1000);

                return createTimelineStepTaskResult({ failed: true });
            },
        },
        {
            name: 'step4',
            subtitle: 'Step 4',
            body: 'Should succeed after 1 second, skip steps 5, and go to step 6',
            task: async (step) => {
                await promiseTimeout(1000);

                return createTimelineStepTaskResult({ nextSteps: ['step6'], skipSteps: ['step5'] });
            },
        },
        {
            name: 'step5',
            subtitle: 'Step 5',
            body: 'This step should always be skipped.',
            task: (step) => Promise.resolve(createTimelineStepTaskResult()),
        },
        {
            name: 'step6',
            subtitle: 'Step 6',
            task: (step) => Promise.resolve(createTimelineStepTaskResult()),
        },
    ];

    const initialSteps = ref<Array<TimelineStepName>>(['step1']);
    const step1NextStep = ref('step2');
    const isInitiallyHidden = ref(false);
    const isHiddenWhenFullyCompleted = ref(false);
    const fullCompletedHiddenTimeoutMs = ref(1000);
    const reverseStepList = ref(false);

    const steps = computed(() => (reverseStepList.value ? [...rawSteps].reverse() : rawSteps));
</script>

<style scoped lang="scss"></style>
