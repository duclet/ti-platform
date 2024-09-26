<template>
    <Splitter>
        <SplitterPanel :size="25" class="p-4">
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
                                    <label class="flex items-center cursor-pointer">
                                        <ToggleSwitch v-model="isBackButtonSupported" />
                                        <span class="ml-4">Is Back Button Supported?</span>
                                    </label>
                                    <label class="flex items-center cursor-pointer">
                                        <ToggleSwitch v-model="isBackButtonVisibleWhenDone" />
                                        <span class="ml-4">Is Back Button Visible When Done?</span>
                                    </label>
                                </div>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="2">
                            <AccordionHeader>Step Data</AccordionHeader>
                            <AccordionContent>
                                <div class="whitespace-pre">{{ JSON.stringify(stepsData, undefined, 2) }}</div>
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="3">
                            <AccordionHeader>Step Definitions</AccordionHeader>
                            <AccordionContent>
                                <div class="whitespace-pre">{{ JSON.stringify(steps, undefined, 2) }}</div>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </template>
            </Card>
        </SplitterPanel>
        <SplitterPanel class="p-4">
            <template v-if="isComponentVisible">
                <WizardStepper
                    :steps="steps"
                    :is-back-button-supported="isBackButtonSupported"
                    :is-back-button-visible-when-done="isBackButtonVisibleWhenDone"
                    pt:pc-step-header-icon-button:raised
                    :pt:before-leave-confirm-dialog-icon="PrimeIcons.EXCLAMATION_TRIANGLE"
                >
                    <template #welcome--pre-navigation>
                        Step specific pre-navigation only for <strong>Welcome</strong> step.<br />
                    </template>
                </WizardStepper>
            </template>
        </SplitterPanel>
    </Splitter>
</template>

<script setup lang="ts">
    import { PrimeIcons } from '@primevue/core';
    import type { WizardStep } from '@src/index';
    import { createWizardStep, WizardStepper } from '@src/index';
    import AccountCreation from '@src/preview/wizard-steps/AccountCreation.vue';
    import RequestConfirmation from '@src/preview/wizard-steps/RequestConfirmation.vue';
    import UserInfoRequestStep from '@src/preview/wizard-steps/UserInfoRequestStep.vue';
    import { WizardStepperStepsDataKey } from '@src/preview/wizard-steps/utils';
    import WelcomeMessageStep from '@src/preview/wizard-steps/WelcomeMessageStep.vue';
    import { refAutoReset } from '@vueuse/core';
    import Accordion from 'primevue/accordion';
    import AccordionContent from 'primevue/accordioncontent';
    import AccordionHeader from 'primevue/accordionheader';
    import AccordionPanel from 'primevue/accordionpanel';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';
    import ToggleSwitch from 'primevue/toggleswitch';
    import { computed, provide, ref } from 'vue';

    const isComponentVisible = refAutoReset(true, 1000);
    const isBackButtonSupported = ref(false);
    const isBackButtonVisibleWhenDone = ref(false);

    const firstName = ref('');
    const middleName = ref('');
    const lastName = ref('');

    const stepsData = computed(() => ({
        firstName: firstName.value,
        middleName: middleName.value,
        lastName: lastName.value,
    }));

    const steps: Array<WizardStep> = [
        createWizardStep('welcome', 'Introductions', WelcomeMessageStep),
        createWizardStep('user-info-request', 'User Information', UserInfoRequestStep, {
            isBeforeLeaveConfirmationEnabled: true,
        }),
        createWizardStep('request-confirmation', 'Confirm Data', RequestConfirmation),
        createWizardStep('account-creation', 'Account Creation', AccountCreation),
    ];

    provide(WizardStepperStepsDataKey, { firstName, middleName, lastName });
</script>
