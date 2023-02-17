<template>
    <QStepper :model-value="currentStep.name">
        <QStep
            v-for="step in steps"
            :key="step.name"
            :done="asState(step.name).isDone"
            :name="step.name"
            :title="step.title"
        >
            <component :is="step.component" :model-value="asState(step.name).asWizardStepState()" />
        </QStep>
        <template #navigation>
            <QSeparator class="q-mb-lg" />
            <QStepperNavigation>
                <!--
                @slot Slot for rendering the content before the navigational buttons for a specific step.
                    @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                    @binding {Function} continue-button-handler Executing function will navigate to the next step.
                    @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                    @binding {boolean} is-back-button-supported True if the back button is supported.
                    @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                    @binding {boolean} is-done True if we are on the last step and it is completed.
                    @binding {boolean} is-processing True if the step is currently processing or doing work.
                -->
                <slot
                    :name="`${currentStep.name}--pre-navigation`"
                    :back-button-handler="onBackClick"
                    :continue-button-handler="onContinueClick"
                    :is-back-button-enabled="isBackButtonEnabled"
                    :is-back-button-supported="isBackButtonSupported"
                    :is-continue-button-enabled="isContinueButtonEnabled"
                    :is-done="isDone"
                    :is-processing="isProcessing"
                >
                    <!--
                    @slot Slot for rendering the content before the navigational buttons.
                        @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                        @binding {Function} continue-button-handler Executing function will navigate to the next step.
                        @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                        @binding {boolean} is-back-button-supported True if the back button is supported.
                        @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                        @binding {boolean} is-done True if we are on the last step and it is completed.
                        @binding {boolean} is-processing True if the step is currently processing or doing work.
                    -->
                    <slot
                        name="pre-navigation"
                        :back-button-handler="onBackClick"
                        :continue-button-handler="onContinueClick"
                        :is-back-button-enabled="isBackButtonEnabled"
                        :is-back-button-supported="isBackButtonSupported"
                        :is-continue-button-enabled="isContinueButtonEnabled"
                        :is-done="isDone"
                        :is-processing="isProcessing"
                    />
                </slot>
                <!--
                @slot Slot for rendering the content of the navigational buttons for a specific step.
                    @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                    @binding {Function} continue-button-handler Executing function will navigate to the next step.
                    @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                    @binding {boolean} is-back-button-supported True if the back button is supported.
                    @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                    @binding {boolean} is-done True if we are on the last step and it is completed.
                    @binding {boolean} is-processing True if the step is currently processing or doing work.
                -->
                <slot
                    :name="`${currentStep.name}--navigation`"
                    :back-button-handler="onBackClick"
                    :continue-button-handler="onContinueClick"
                    :is-back-button-enabled="isBackButtonEnabled"
                    :is-back-button-supported="isBackButtonSupported"
                    :is-continue-button-enabled="isContinueButtonEnabled"
                    :is-done="isDone"
                    :is-processing="isProcessing"
                >
                    <!--
                    @slot Slot for rendering the content of the navigational buttons.
                        @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                        @binding {Function} continue-button-handler Executing function will navigate to the next step.
                        @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                        @binding {boolean} is-back-button-supported True if the back button is supported.
                        @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                        @binding {boolean} is-done True if we are on the last step and it is completed.
                        @binding {boolean} is-processing True if the step is currently processing or doing work.
                    -->
                    <slot
                        name="navigation"
                        :back-button-handler="onBackClick"
                        :continue-button-handler="onContinueClick"
                        :is-back-button-enabled="isBackButtonEnabled"
                        :is-back-button-supported="isBackButtonSupported"
                        :is-continue-button-enabled="isContinueButtonEnabled"
                        :is-done="isDone"
                        :is-processing="isProcessing"
                    >
                        <transition-group name="q-transition--fade">
                            <QBtn
                                v-if="!isDone"
                                :class="continueButtonClass"
                                :color="continueButtonColor"
                                :disable="!isContinueButtonEnabled"
                                :label="continueButtonText"
                                :loading="isProcessing"
                                @click="onContinueClick"
                            />
                            <QBtn
                                v-if="isDone"
                                :class="doneButtonClass"
                                :color="doneButtonColor"
                                :icon="doneButtonIcon"
                                :label="doneButtonText"
                            />
                            <QBtn
                                v-if="
                                    isBackButtonSupported &&
                                    !isFirstStep &&
                                    (!isDone || (isDone && isBackButtonVisibleWhenDone))
                                "
                                :class="backButtonClass"
                                :color="backButtonColor"
                                :disable="!isBackButtonEnabled || isProcessing"
                                :label="backButtonText"
                                flat
                                @click="onBackClick"
                            />
                        </transition-group>
                    </slot>
                </slot>
                <!--
                @slot Slot for rendering the content after the navigational buttons for a specific step.
                    @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                    @binding {Function} continue-button-handler Executing function will navigate to the next step.
                    @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                    @binding {boolean} is-back-button-supported True if the back button is supported.
                    @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                    @binding {boolean} is-done True if we are on the last step and it is completed.
                    @binding {boolean} is-processing True if the step is currently processing or doing work.
                -->
                <slot
                    :name="`${currentStep.name}--post-navigation`"
                    :back-button-handler="onBackClick"
                    :continue-button-handler="onContinueClick"
                    :is-back-button-enabled="isBackButtonEnabled"
                    :is-back-button-supported="isBackButtonSupported"
                    :is-continue-button-enabled="isContinueButtonEnabled"
                    :is-done="isDone"
                    :is-processing="isProcessing"
                >
                    <!--
                    @slot Slot for rendering the content after the navigational buttons.
                        @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                        @binding {Function} continue-button-handler Executing function will navigate to the next step.
                        @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                        @binding {boolean} is-back-button-supported True if the back button is supported.
                        @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                        @binding {boolean} is-done True if we are on the last step and it is completed.
                        @binding {boolean} is-processing True if the step is currently processing or doing work.
                    -->
                    <slot
                        name="post-navigation"
                        :back-button-handler="onBackClick"
                        :continue-button-handler="onContinueClick"
                        :is-back-button-enabled="isBackButtonEnabled"
                        :is-back-button-supported="isBackButtonSupported"
                        :is-continue-button-enabled="isContinueButtonEnabled"
                        :is-done="isDone"
                        :is-processing="isProcessing"
                    />
                </slot>
            </QStepperNavigation>
        </template>
    </QStepper>
</template>

<script setup lang="ts">
    /*@component
    This is a wrapper component over the QStepper component with enhancements to make managing buttons and certain user
    interactions easier.
    */
    import { last } from '@s-libs/micro-dash';
    import { first, toMap } from '@ti-platform/aide';
    import { isDef } from '@vueuse/core';
    import { QBtn, QSeparator, QStep, QStepper, QStepperNavigation, useQuasar } from 'quasar';
    import { computed, inject, onMounted, onUnmounted, ref } from 'vue';
    import { matchedRouteKey, onBeforeRouteLeave } from 'vue-router';

    import { WizardStep, WizardStepName } from './api';
    import { WizardStepStateImpl } from './internal';

    const props = withDefaults(
        defineProps<{
            /**
             * The list of steps in the wizard.
             */
            steps: Array<WizardStep>;

            /**
             * The CSS class name for the back button.
             */
            backButtonClass?: string;

            /**
             * The color to use for the back button.
             */
            backButtonColor?: string;

            /**
             * The text for the back button.
             */
            backButtonText?: string;

            /**
             * The CSS class name for the dialog that shows when the user tries to leave before completing all the
             * steps.
             */
            beforeLeaveDialogClass?: string;

            /**
             * The CSS class name for the button in the dialog that shows when the user tries to leave before completing
             * all the steps.
             */
            beforeLeaveDialogButtonClass?: string;

            /**
             * The color for the button in the dialog that shows when the user tries to leave before completing all the
             * steps.
             */
            beforeLeaveDialogButtonColor?: string;

            /**
             * The CSS class name for the continue button.
             */
            continueButtonClass?: string;

            /**
             * The color for the continue button.
             */
            continueButtonColor?: string;

            /**
             * The text for the continue button.
             */
            continueButtonText?: string;

            /**
             * The CSS class name for the done button.
             */
            doneButtonClass?: string;

            /**
             * The color for the done button.
             */
            doneButtonColor?: string;

            /**
             * The icon for the done button.
             */
            doneButtonIcon?: string;

            /**
             * The text for the done button.
             */
            doneButtonText?: string;

            /**
             * True to enable showing of the back button, false otherwise.
             */
            isBackButtonSupported?: boolean;

            /**
             * Assuming that the back buton is supported, should it be visible when all the steps are completed?
             */
            isBackButtonVisibleWhenDone?: boolean;
        }>(),
        {
            backButtonClass: '',
            backButtonColor: 'primary',
            backButtonText: 'Back',
            beforeLeaveDialogClass: 'bg-warning text-h6',
            beforeLeaveDialogButtonClass: '',
            beforeLeaveDialogButtonColor: 'primary',
            continueButtonClass: '',
            continueButtonColor: 'primary',
            continueButtonText: 'Continue',
            doneButtonClass: '',
            doneButtonColor: 'positive',
            doneButtonIcon: 'done_all',
            doneButtonText: 'Done',
            isBackButtonSupported: false,
            isBackButtonVisibleWhenDone: false,
        }
    );

    const quasar = useQuasar();

    const currentStep = ref(first(props.steps)!);
    const isBackButtonEnabled = ref(true);
    const latestViewedStepIndex = ref(0);

    const stateMap = ref(
        toMap<WizardStepName, WizardStep, WizardStepStateImpl>(
            props.steps,
            (item) => item.name,
            (item, key, index) => new WizardStepStateImpl(index, () => latestViewedStepIndex.value)
        )
    );

    function asState(stepName: WizardStepName) {
        return stateMap.value[stepName];
    }

    const currentStepState = computed(() => asState(currentStep.value.name));
    const isContinueButtonEnabled = computed(() => currentStepState.value.isContinueButtonEnabled);
    const isFirstStep = computed(() => currentStep.value.name === first(props.steps)!.name);
    const isLastStep = computed(() => currentStep.value.name === last(props.steps).name);
    const isProcessing = computed(() => currentStepState.value.isProcessing);
    const isDone = computed(() => isLastStep.value && currentStepState.value.isDone);
    const isShowingLeaveDialog = computed(
        () => currentStep.value.isBeforeLeaveConfirmationEnabled && !currentStepState.value.isDone
    );

    function getNextStep() {
        const currentStepIndex = props.steps.findIndex((step) => step.name === currentStep.value.name);
        return props.steps[currentStepIndex + 1];
    }

    function getPreviousStep() {
        const currentStepIndex = props.steps.findIndex((step) => step.name === currentStep.value.name);
        return props.steps[currentStepIndex - 1];
    }

    async function onBackClick() {
        if (isFirstStep.value) {
            return;
        }

        isBackButtonEnabled.value = false;

        const okayToGoBack = await currentStepState.value.backButtonHandler();

        isBackButtonEnabled.value = true;

        if (!okayToGoBack) {
            return;
        }

        currentStep.value = getPreviousStep();
    }

    function onBeforeUnload(event: Event) {
        if (!isShowingLeaveDialog.value) {
            return;
        }

        event.preventDefault();
        event.returnValue = false;
    }

    async function onContinueClick() {
        currentStepState.value.isContinueButtonEnabled = false;
        currentStepState.value.isProcessing = true;

        if (!(await currentStepState.value.continueButtonHandler())) {
            currentStepState.value.isContinueButtonEnabled = true;
            currentStepState.value.isProcessing = false;
            return;
        }

        currentStepState.value.isProcessing = false;
        currentStepState.value.isDone = true;

        if (isLastStep.value) {
            return;
        }

        currentStep.value = getNextStep();
        if (currentStepState.value.stepIndex > latestViewedStepIndex.value) {
            latestViewedStepIndex.value = currentStepState.value.stepIndex;
        }
    }

    // Check to use if whatever is calling this component is done within the context of vue-router and if not, don't
    // bother to add this hook
    if (isDef(inject(matchedRouteKey, undefined))) {
        onBeforeRouteLeave(
            () =>
                new Promise((resolve) => {
                    function navigateAway() {
                        window.removeEventListener('beforeunload', onBeforeUnload);
                        resolve(true);
                    }

                    if (!isShowingLeaveDialog.value) {
                        navigateAway();
                        return;
                    }

                    quasar
                        .dialog({
                            class: props.beforeLeaveDialogClass,
                            message:
                                currentStep.value.beforeLeaveConfirmationMessage ??
                                'Processing is not completed, navigate away?',
                            cancel: true,
                            ok: {
                                label: 'Yes',
                                class: props.beforeLeaveDialogButtonClass,
                                color: props.beforeLeaveDialogButtonColor,
                            },
                        })
                        .onOk(navigateAway)
                        .onCancel(() => resolve(false));
                })
        );
    }

    onMounted(() => {
        window.addEventListener('beforeunload', onBeforeUnload);
    });

    onUnmounted(() => {
        window.removeEventListener('beforeunload', onBeforeUnload);
    });
</script>

<style lang="scss" scoped></style>
