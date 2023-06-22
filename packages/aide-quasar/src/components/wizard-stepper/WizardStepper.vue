<template>
    <QStepper :model-value="stepper.current.value.name">
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
            <QStepperNavigation v-if="navigationVIf" :style="navigationVisibilityStyle">
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
                    :name="`${stepper.current.value.name}--pre-navigation`"
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
                    :name="`${stepper.current.value.name}--navigation`"
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
                                    !stepper.isFirst.value &&
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
                    :name="`${stepper.current.value.name}--post-navigation`"
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
    import { first, toMap } from '@ti-platform/aide';
    import { isDef, useStepper } from '@vueuse/core';
    import { QBtn, QSeparator, QStep, QStepper, QStepperNavigation, useQuasar } from 'quasar';
    import { computed, type ComputedRef, inject, onMounted, onUnmounted, ref } from 'vue';
    import { matchedRouteKey, onBeforeRouteLeave } from 'vue-router';

    import { cssStyleByVisibilityState, vIfByVisibilityState } from '../../visibility';
    import { type WizardStep, type WizardStepName } from './api';
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
             * Assuming that the back button is supported, should it be visible when all the steps are completed?
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
    const stepper = useStepper(
        toMap(
            props.steps,
            (step) => step.name,
            (step) => step
        ),
        first(props.steps)!.name
    );

    const isBackButtonEnabled = ref(true);
    const latestViewedStepIndex: ComputedRef<number> = computed(() =>
        Math.max(latestViewedStepIndex.value ?? 0, stepper.index.value)
    );

    const stateMap = ref(
        toMap(
            props.steps,
            (item) => item.name,
            (item, key, index) =>
                new WizardStepStateImpl(
                    index,
                    () => void onContinueClick(),
                    () => void onBackClick(),
                    () => latestViewedStepIndex.value
                )
        )
    );

    function asState(stepName: WizardStepName) {
        return stateMap.value[stepName];
    }

    const currentStepState = computed(() => asState(stepper.current.value.name));
    const isContinueButtonEnabled = computed(() => currentStepState.value.isContinueButtonEnabled);
    const isProcessing = computed(() => currentStepState.value.isProcessing);
    const isDone = computed(() => stepper.isLast.value && currentStepState.value.isDone);
    const isShowingLeaveDialog = computed(
        () => stepper.current.value.isBeforeLeaveConfirmationEnabled && !currentStepState.value.isDone
    );

    const navigationVisibilityState = computed(() => currentStepState.value.navigationVisibility);
    const navigationVisibilityStyle = cssStyleByVisibilityState(navigationVisibilityState);
    const navigationVIf = vIfByVisibilityState(navigationVisibilityState);

    async function onBackClick() {
        if (stepper.isFirst.value) {
            return;
        }

        isBackButtonEnabled.value = false;

        const okayToGoBack = await currentStepState.value.backButtonHandler();

        isBackButtonEnabled.value = true;

        if (!okayToGoBack) {
            return;
        }

        stepper.goToPrevious();
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

        stepper.goToNext();
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
                                stepper.current.value.beforeLeaveConfirmationMessage ??
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
