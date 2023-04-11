<template>
    <QSplitter v-model="splitterModel">
        <template #before>
            <QCardSection>
                <QInput v-model="backButtonClass" label="Back Button Class" />
                <QInput v-model="backButtonColor" label="Back Button Color" />
                <QInput v-model="backButtonText" label="Back Button Text" />
                <QInput v-model="continueButtonClass" label="Continue Button Class" />
                <QInput v-model="continueButtonColor" label="Continue Button Color" />
                <QInput v-model="continueButtonText" label="Continue Button Text" />
                <QInput v-model="doneButtonClass" label="Done Button Class" />
                <QInput v-model="doneButtonColor" label="Done Button Color" />
                <QInput v-model="doneButtonIcon" label="Done Button Icon" />
                <QInput v-model="doneButtonText" label="Done Button Text" />
                <QToggle
                    v-model="isBackButtonSupported"
                    label="Is Back Button Supported?"
                    checked-icon="check"
                    unchecked-icon="clear"
                />
                <QToggle
                    v-model="isBackButtonVisibleWhenDone"
                    label="Is Back Button Visible When Done?"
                    checked-icon="check"
                    unchecked-icon="clear"
                />
            </QCardSection>
            <QCardActions>
                <QBtn color="primary" label="Reload Component" @click="isComponentVisible = false" />
            </QCardActions>
            <QCardSection>
                <strong>Steps Data:</strong><br />
                <pre>{{ JSON.stringify(stepsData, undefined, 2) }}</pre>
            </QCardSection>
            <QCardSection>
                <strong>Step Definitions:</strong><br />
                <pre>{{ JSON.stringify(steps, undefined, 2) }}</pre>
            </QCardSection>
        </template>
        <template #after>
            <QCardSection v-if="isComponentVisible">
                <WizardStepperComponent
                    :steps="steps"
                    :back-button-class="backButtonClass"
                    :back-button-color="backButtonColor"
                    :back-button-text="backButtonText"
                    :continue-button-class="continueButtonClass"
                    :continue-button-color="continueButtonColor"
                    :continue-button-text="continueButtonText"
                    :done-button-class="doneButtonClass"
                    :done-button-color="doneButtonColor"
                    :done-button-icon="doneButtonIcon"
                    :done-button-text="doneButtonText"
                    :is-back-button-supported="isBackButtonSupported"
                    :is-back-button-visible-when-done="isBackButtonVisibleWhenDone"
                >
                    <template #welcome--pre-navigation>
                        Step specific pre-navigation only for <strong>Welcome</strong> step.<br />
                    </template>
                </WizardStepperComponent>
            </QCardSection>
        </template>
    </QSplitter>
</template>

<script setup lang="ts">
    import { refAutoReset } from '@vueuse/core';
    import { computed, provide, ref } from 'vue';

    import { createWizardStep, WizardStep, WizardStepperComponent } from '../index';
    import AccountCreation from './wizard-steps/AccountCreation.vue';
    import RequestConfirmation from './wizard-steps/RequestConfirmation.vue';
    import UserInfoRequestStep from './wizard-steps/UserInfoRequestStep.vue';
    import { WizardStepperStepsDataKey } from './wizard-steps/utils';
    import WelcomeMessageStep from './wizard-steps/WelcomeMessageStep.vue';

    const splitterModel = ref(30);
    const isComponentVisible = refAutoReset(true, 1000);
    const backButtonClass = ref('');
    const backButtonColor = ref('primary');
    const backButtonText = ref('Back');
    const continueButtonClass = ref('');
    const continueButtonColor = ref('primary');
    const continueButtonText = ref('Continue');
    const doneButtonClass = ref('');
    const doneButtonColor = ref('positive');
    const doneButtonIcon = ref('done_all');
    const doneButtonText = ref('Done');
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
        createWizardStep('user-info-request', 'User Information', UserInfoRequestStep),
        createWizardStep('request-confirmation', 'Confirm Data', RequestConfirmation),
        createWizardStep('account-creation', 'Account Creation', AccountCreation),
    ];

    provide(WizardStepperStepsDataKey, { firstName, middleName, lastName });
</script>

<style scoped lang="scss"></style>
