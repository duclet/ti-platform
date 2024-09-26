<template>
    <div :class="cx('root')" v-bind="ptmi('root')">
        <ConfirmDialog v-bind="ptm('pc-before-leave-confirm-dialog')">
            <template #icon>
                <span
                    :class="['p-confirmdialog-icon', PrimeIcons.EXCLAMATION_CIRCLE]"
                    v-bind="ptm('before-leave-confirm-dialog-icon')"
                />
            </template>
        </ConfirmDialog>
        <Stepper :value="currentStepState.stepName" linear v-bind="ptm('pc-stepper')">
            <StepList :class="cx('step-list')" v-bind="ptm('pc-step-list')">
                <Step
                    v-for="(step, index) in steps"
                    :key="step.name"
                    :value="step.name"
                    as-child
                    v-bind="ptm('pc-step')"
                >
                    <div :class="cx('step-header')" v-bind="ptm('step-header')">
                        <Button
                            :icon="
                                asState(step.name).isActive
                                    ? PrimeIcons.PENCIL
                                    : asState(step.name).isDone
                                      ? PrimeIcons.CHECK
                                      : PrimeIcons.HOURGLASS
                            "
                            :severity="
                                getSeverityForButton(
                                    asState(step.name).isDone
                                        ? ColorOption.SUCCESS
                                        : asState(step.name).isActive
                                          ? ColorOption.PRIMARY
                                          : ColorOption.SECONDARY
                                )
                            "
                            disabled
                            rounded
                            v-bind="ptm('pc-step-header-icon')"
                        />
                        <div :class="cx('step-header-title')" v-bind="ptm('step-header-title')">{{ step.title }}</div>
                        <Divider
                            v-if="index < steps.length - 1"
                            :class="cx('step-header-divider')"
                            v-bind="ptm('pc-step-header-divider')"
                        />
                    </div>
                </Step>
            </StepList>
            <StepPanels v-bind="ptm('pc-step-panels')">
                <StepPanel v-for="step in steps" :key="step.name" :value="step.name" v-bind="ptm('pc-step-panel')">
                    <div :class="cx('step-content')" v-bind="ptm('step-content')">
                        <component
                            :is="step.component"
                            v-if="step.name === currentStepState.stepName"
                            :model-value="asState(step.name).asWizardStepState()"
                        />
                    </div>
                    <div :class="cx('navigation')" v-bind="ptm('navigation')">
                        <!--
                        @slot Slot for rendering the content before the navigational buttons for a specific step.
                        @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                        @binding {Function} continue-button-handler Executing function will navigate to the next step.
                        @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                        @binding {boolean} is-back-button-supported True if the back button is supported.
                        @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                        @binding {boolean} is-done True if we are on the last step and it is completed.
                        @binding {boolean} is-processing-next-step True if the step is currently processing in preparation for going to the next step.
                        @binding {boolean} is-processing-previous-step True if the step is currently processing in preparation for going to the previous step.
                        -->
                        <slot
                            :name="`${currentStepState.stepName}--pre-navigation`"
                            :back-button-handler="onBackClick"
                            :continue-button-handler="onContinueClick"
                            :is-back-button-enabled="isBackButtonEnabled"
                            :is-back-button-supported="isBackButtonSupported"
                            :is-continue-button-enabled="isContinueButtonEnabled"
                            :is-done="isDone"
                            :is-processing-next-step="isProcessingNextStep"
                            :is-processing-previous-step="isProcessingPreviousStep"
                        >
                            <!--
                            @slot Slot for rendering the content before the navigational buttons.
                            @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                            @binding {Function} continue-button-handler Executing function will navigate to the next step.
                            @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                            @binding {boolean} is-back-button-supported True if the back button is supported.
                            @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                            @binding {boolean} is-done True if we are on the last step and it is completed.
                            @binding {boolean} is-processing-next-step True if the step is currently processing in preparation for going to the next step.
                            @binding {boolean} is-processing-previous-step True if the step is currently processing in preparation for going to the previous step.
                            -->
                            <slot
                                name="pre-navigation"
                                :back-button-handler="onBackClick"
                                :continue-button-handler="onContinueClick"
                                :is-back-button-enabled="isBackButtonEnabled"
                                :is-back-button-supported="isBackButtonSupported"
                                :is-continue-button-enabled="isContinueButtonEnabled"
                                :is-done="isDone"
                                :is-processing-next-step="isProcessingNextStep"
                                :is-processing-previous-step="isProcessingPreviousStep"
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
                        @binding {boolean} is-processing-next-step True if the step is currently processing in preparation for going to the next step.
                        @binding {boolean} is-processing-previous-step True if the step is currently processing in preparation for going to the previous step.
                        -->
                        <slot
                            :name="`${currentStepState.stepName}--navigation`"
                            :back-button-handler="onBackClick"
                            :continue-button-handler="onContinueClick"
                            :is-back-button-enabled="isBackButtonEnabled"
                            :is-back-button-supported="isBackButtonSupported"
                            :is-continue-button-enabled="isContinueButtonEnabled"
                            :is-done="isDone"
                            :is-processing-next-step="isProcessingNextStep"
                            :is-processing-previous-step="isProcessingPreviousStep"
                        >
                            <!--
                            @slot Slot for rendering the content of the navigational buttons.
                            @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                            @binding {Function} continue-button-handler Executing function will navigate to the next step.
                            @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                            @binding {boolean} is-back-button-supported True if the back button is supported.
                            @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                            @binding {boolean} is-done True if we are on the last step and it is completed.
                            @binding {boolean} is-processing-next-step True if the step is currently processing in preparation for going to the next step.
                            @binding {boolean} is-processing-previous-step True if the step is currently processing in preparation for going to the previous step.
                            -->
                            <slot
                                name="navigation"
                                :back-button-handler="onBackClick"
                                :continue-button-handler="onContinueClick"
                                :is-back-button-enabled="isBackButtonEnabled"
                                :is-back-button-supported="isBackButtonSupported"
                                :is-continue-button-enabled="isContinueButtonEnabled"
                                :is-done="isDone"
                                :is-processing-next-step="isProcessingNextStep"
                                :is-processing-previous-step="isProcessingPreviousStep"
                            >
                                <ButtonGroup v-bind="ptm('pc-navigation-button-group')">
                                    <Button
                                        v-if="
                                            isBackButtonSupported &&
                                            !stepper.isFirst.value &&
                                            (!isDone || (isDone && isBackButtonVisibleWhenDone))
                                        "
                                        label="Back"
                                        :disabled="
                                            !isBackButtonEnabled || isProcessingNextStep || isProcessingPreviousStep
                                        "
                                        :icon="PrimeIcons.BACKWARD"
                                        :loading="isProcessingPreviousStep"
                                        outlined
                                        v-bind="ptm('pc-navigation-back-button')"
                                        @click="onBackClick"
                                    />
                                    <Button
                                        v-if="!isDone"
                                        label="Continue"
                                        :disabled="
                                            !isContinueButtonEnabled || isProcessingNextStep || isProcessingPreviousStep
                                        "
                                        :icon="PrimeIcons.FORWARD"
                                        :loading="isProcessingNextStep"
                                        v-bind="ptm('pc-navigation-continue-button')"
                                        @click="onContinueClick"
                                    />
                                    <Button
                                        v-if="isDone"
                                        label="Done"
                                        :icon="PrimeIcons.CHECK"
                                        :severity="getSeverityForButton(ColorOption.SUCCESS)"
                                        disabled
                                        v-bind="ptm('pc-navigation-success-button')"
                                    />
                                </ButtonGroup>
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
                        @binding {boolean} is-processing-next-step True if the step is currently processing in preparation for going to the next step.
                        @binding {boolean} is-processing-previous-step True if the step is currently processing in preparation for going to the previous step.
                        -->
                        <slot
                            :name="`${currentStepState.stepName}--post-navigation`"
                            :back-button-handler="onBackClick"
                            :continue-button-handler="onContinueClick"
                            :is-back-button-enabled="isBackButtonEnabled"
                            :is-back-button-supported="isBackButtonSupported"
                            :is-continue-button-enabled="isContinueButtonEnabled"
                            :is-done="isDone"
                            :is-processing-next-step="isProcessingNextStep"
                            :is-processing-previous-step="isProcessingPreviousStep"
                        >
                            <!--
                            @slot Slot for rendering the content after the navigational buttons.
                            @binding {Function} back-button-handler Executing function will navigate back to the previous step.
                            @binding {Function} continue-button-handler Executing function will navigate to the next step.
                            @binding {boolean} is-back-button-enabled True if the back button should be enabled.
                            @binding {boolean} is-back-button-supported True if the back button is supported.
                            @binding {boolean} is-continue-button-enabled True if continue button should be enabled.
                            @binding {boolean} is-done True if we are on the last step and it is completed.
                            @binding {boolean} is-processing-next-step True if the step is currently processing in preparation for going to the next step.
                            @binding {boolean} is-processing-previous-step True if the step is currently processing in preparation for going to the previous step.
                            -->
                            <slot
                                name="post-navigation"
                                :back-button-handler="onBackClick"
                                :continue-button-handler="onContinueClick"
                                :is-back-button-enabled="isBackButtonEnabled"
                                :is-back-button-supported="isBackButtonSupported"
                                :is-continue-button-enabled="isContinueButtonEnabled"
                                :is-done="isDone"
                                :is-processing-next-step="isProcessingNextStep"
                                :is-processing-previous-step="isProcessingPreviousStep"
                            />
                        </slot>
                    </div>
                </StepPanel>
            </StepPanels>
        </Stepper>
    </div>
</template>

<script lang="ts">
    import BaseWizardStepper from '@src/components/wizard-stepper/BaseWizardStepper.vue';

    /*@component
    This is a wrapper component over the QStepper component with enhancements to make managing buttons and certain user
    interactions easier.

    In following with PrimeVue's passthrough functionality, the following are available:
    - **root**: The root DOM element encapsulating the entire component.
    - **pc-stepper**: The Stepper component used to display all the steps in this wizard.
    - **pc-step-list**: The StepList component used to display the step headings.
    - **pc-step**: The Step component to display each individual step header.
    - **step-header**: The DOM element displaying the step header.
    - **pc-step-header-icon**: The Button component used to display the icon for a step.
    - **step-header-title**: The DOM element for displaying the step's title.
    - **pc-step-header-divider**: The Divider component used to display the divider between step headers.
    - **pc-step-panels**: The StepPanels component used to wrap all the individual steps' content.
    - **pc-step-panel**: The StepPanel component to wrap each step's content.
    - **step-content**: The DOM element wrapping the step's content.
    - **navigation**: The DOM element wrapping the navigation area of the wizard.
    - **pc-navigation-button-group**: The ButtonGroup component that wraps all the navigational buttons.
    - **pc-navigation-back-button**: The Button component for the navigating back a step.
    - **pc-navigation-continue-button**: The Button component for navigating to the next step.
    - **pc-navigation-success-button**: The Button component for displaying when all steps are completed.
    */
    export default {
        name: 'WizardStepper',
        extends: BaseWizardStepper,
        inheritAttrs: false,
    };
</script>

<script setup lang="ts">
    import { PrimeIcons } from '@primevue/core';
    import type { WizardStep, WizardStepName } from '@src/components/wizard-stepper/api';
    import { WizardStepStateImpl } from '@src/components/wizard-stepper/internal';
    import { ColorOption, exposePrimeVueHelpers, getSeverityForButton } from '@src/utils';
    import { first, toMap } from '@ti-platform/aide';
    import { isDef, useStepper } from '@vueuse/core';
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import ConfirmDialog from 'primevue/confirmdialog';
    import Divider from 'primevue/divider';
    import Step from 'primevue/step';
    import StepList from 'primevue/steplist';
    import StepPanel from 'primevue/steppanel';
    import StepPanels from 'primevue/steppanels';
    import Stepper from 'primevue/stepper';
    import { useConfirm } from 'primevue/useconfirm';
    import { computed, inject, onMounted, onUnmounted, ref } from 'vue';
    import { matchedRouteKey, onBeforeRouteLeave } from 'vue-router';

    const { cx, ptm, ptmi } = exposePrimeVueHelpers();

    const props = withDefaults(
        defineProps<{
            /**
             * The list of steps in the wizard.
             */
            steps: Array<WizardStep>;

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
             * True to enable showing of the back button, false otherwise.
             */
            isBackButtonSupported?: boolean;

            /**
             * Assuming that the back button is supported, should it be visible when all the steps are completed?
             */
            isBackButtonVisibleWhenDone?: boolean;
        }>(),
        {
            beforeLeaveDialogClass: 'bg-warning text-h6',
            beforeLeaveDialogButtonClass: '',
            beforeLeaveDialogButtonColor: 'primary',
            isBackButtonSupported: false,
            isBackButtonVisibleWhenDone: false,
        }
    );

    const confirm = useConfirm();

    const stepper = useStepper(
        toMap(
            props.steps,
            (step) => step.name,
            (step) => step
        ),
        first(props.steps)!.name
    );

    const stateMap = ref(
        toMap(
            props.steps,
            (item) => item.name,
            (item, key, index) =>
                new WizardStepStateImpl(
                    item.name,
                    index,
                    () => void onContinueClick(),
                    () => void onBackClick(),
                    () => currentStepState.value.stepName
                )
        )
    );

    function asState(stepName: WizardStepName): WizardStepStateImpl {
        return stateMap.value[stepName];
    }

    const currentStepState = computed(() => asState(stepper.current.value.name));
    const isBackButtonEnabled = computed(() => currentStepState.value.isBackButtonEnabled);
    const isContinueButtonEnabled = computed(() => currentStepState.value.isContinueButtonEnabled);
    const isProcessingNextStep = computed(() => currentStepState.value.isProcessingNextStep);
    const isProcessingPreviousStep = computed(() => currentStepState.value.isProcessingPreviousStep);
    const isDone = computed(() => stepper.isLast.value && currentStepState.value.isDone);
    const isShowingLeaveDialog = computed(
        () => stepper.current.value.isBeforeLeaveConfirmationEnabled && !currentStepState.value.isDone
    );

    async function onBackClick() {
        if (stepper.isFirst.value) {
            return;
        }

        const previousBackButtonState = currentStepState.value.isBackButtonEnabled;

        currentStepState.value.isProcessingPreviousStep = true;
        currentStepState.value.isBackButtonEnabled = false;

        if (!(await currentStepState.value.backButtonHandler())) {
            currentStepState.value.isProcessingPreviousStep = false;
            currentStepState.value.isBackButtonEnabled = previousBackButtonState;
            return;
        }

        currentStepState.value.isProcessingPreviousStep = false;
        currentStepState.value.isBackButtonEnabled = true;

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
        const previousContinueButtonState = currentStepState.value.isContinueButtonEnabled;

        currentStepState.value.isProcessingNextStep = true;
        currentStepState.value.isContinueButtonEnabled = false;

        if (!(await currentStepState.value.continueButtonHandler())) {
            currentStepState.value.isProcessingNextStep = false;
            currentStepState.value.isContinueButtonEnabled = previousContinueButtonState;
            return;
        }

        currentStepState.value.isProcessingNextStep = false;
        currentStepState.value.isContinueButtonEnabled = true;
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

                    confirm.require({
                        header: 'Please confirm',
                        message:
                            stepper.current.value.beforeLeaveConfirmationMessage ??
                            'Processing is not complete, navigate away?',
                        acceptProps: { label: 'Yes' },
                        accept: navigateAway,
                        reject() {
                            resolve(false);
                        },
                    });
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
