<template>
    <Splitter>
        <SplitterPanel :size="30" class="p-4">
            <Card>
                <template #title>Configurations</template>
                <template #content>
                    <Accordion :value="['0']" multiple>
                        <AccordionPanel value="0">
                            <AccordionHeader>Actions</AccordionHeader>
                            <AccordionContent>
                                <Button label="Reload Component" @click="isComponentVisible = false" />
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="1">
                            <AccordionHeader>Component Data</AccordionHeader>
                            <AccordionContent>
                                <div class="grid grid-cols-1 gap-y-8 mt-4">
                                    <FloatLabel>
                                        <MultiSelect
                                            v-model="initialSteps"
                                            :options="rawSteps.map((s) => s.name).sort()"
                                            display="chip"
                                            fluid
                                        />
                                        <label>Initial Steps</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <Select
                                            v-model="step1NextStep"
                                            :options="
                                                rawSteps
                                                    .map((s) => s.name)
                                                    .filter((s) => s !== 'step1')
                                                    .sort()
                                            "
                                            fluid
                                        />
                                        <label>Step 1 Next Step</label>
                                    </FloatLabel>
                                    <FloatLabel>
                                        <InputNumber
                                            v-model.number="fullCompletedHiddenTimeoutMs"
                                            min.number="0"
                                            fluid
                                        />
                                        <label>Fully Completed Hidden Timeout MS</label>
                                    </FloatLabel>
                                    <label class="flex items-center cursor-pointer">
                                        <ToggleSwitch v-model="isInitiallyHidden" />
                                        <span class="ml-4">Is Initially Hidden?</span>
                                    </label>
                                    <label class="flex items-center cursor-pointer">
                                        <ToggleSwitch v-model="isHiddenWhenFullyCompleted" />
                                        <span class="ml-4">Is Hidden When Fully Completed?</span>
                                    </label>
                                    <label class="flex items-center cursor-pointer">
                                        <ToggleSwitch v-model="reverseStepList" />
                                        <span class="ml-4">Reverse Step List?</span>
                                    </label>
                                </div>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="2">
                            <AccordionHeader>Step Definitions</AccordionHeader>
                            <AccordionContent>
                                <div class="whitespace-pre">{{ JSON.stringify(rawSteps, undefined, 2) }}</div>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </template>
            </Card>
        </SplitterPanel>
        <SplitterPanel class="p-4">
            <template v-if="isComponentVisible">
                <TimelineStepper
                    :fully-completed-hidden-timeout-ms="fullCompletedHiddenTimeoutMs"
                    :initial-steps="initialSteps"
                    :is-hidden-when-fully-completed="isHiddenWhenFullyCompleted"
                    :is-initially-hidden="isInitiallyHidden"
                    :steps="steps"
                />
            </template>
        </SplitterPanel>
    </Splitter>
</template>

<script setup lang="ts">
    import type { TimelineStep, TimelineStepName } from '@src/index';
    import { createTimelineStepTaskResult, TimelineStepper } from '@src/index';
    import { promiseTimeout, refAutoReset } from '@vueuse/core';
    import Accordion from 'primevue/accordion';
    import AccordionContent from 'primevue/accordioncontent';
    import AccordionHeader from 'primevue/accordionheader';
    import AccordionPanel from 'primevue/accordionpanel';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import FloatLabel from 'primevue/floatlabel';
    import InputNumber from 'primevue/inputnumber';
    import MultiSelect from 'primevue/multiselect';
    import Select from 'primevue/select';
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';
    import ToggleSwitch from 'primevue/toggleswitch';
    import { computed, ref } from 'vue';

    const isComponentVisible = refAutoReset(true, 1000);

    const rawSteps: Array<TimelineStep> = [
        {
            name: 'step1',
            title: 'Step 1',
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
            title: 'Step 2',
            task: (step) =>
                Promise.resolve(
                    createTimelineStepTaskResult({ nextSteps: ['step6'], skipSteps: ['step3', 'step4', 'step5'] })
                ),
            isInitiallyHidden: true,
        },
        {
            name: 'step3',
            title: 'Step 3',
            body: 'Should fail after 1 second',
            task: async (step) => {
                await promiseTimeout(1000);

                return createTimelineStepTaskResult({ failed: true });
            },
        },
        {
            name: 'step4',
            title: 'Step 4',
            body: 'Should succeed after 1 second, skip steps 5, and go to step 6',
            task: async (step) => {
                await promiseTimeout(1000);

                return createTimelineStepTaskResult({ nextSteps: ['step6'], skipSteps: ['step5'] });
            },
        },
        {
            name: 'step5',
            title: 'Step 5',
            body: 'This step should always be skipped.',
            task: (step) => Promise.resolve(createTimelineStepTaskResult()),
        },
        {
            name: 'step6',
            title: 'Step 6',
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
