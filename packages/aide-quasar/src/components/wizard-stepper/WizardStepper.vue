<template>
    <div>
        <q-stepper :model-value="currentStep.name">
            <q-step
                v-for="step in steps"
                :key="step.name"
                :done="stateMap[step.name].isDone"
                :name="step.name"
                :title="step.title"
            >
                <component :is="step.component" v-model="stateMap[step.name]" />
            </q-step>
            <template #navigation>
                <q-separator class="q-mb-lg" />
                <q-stepper-navigation>
                    <slot
                        name="pre-navigation"
                        :back-button-handler="onBackClick"
                        :continue-button-handler="onContinueClick"
                        :is-back-button-enabled="isBackButtonEnabled"
                        :is-continue-button-enabled="isContinueButtonEnabled"
                        :is-processing="isProcessing"
                    />
                    <slot
                        name="navigation"
                        :back-button-handler="onBackClick"
                        :continue-button-handler="onContinueClick"
                        :is-back-button-enabled="isBackButtonEnabled"
                        :is-continue-button-enabled="isContinueButtonEnabled"
                        :is-processing="isProcessing"
                    >
                        <q-btn
                            :class="continueButtonClass"
                            :color="continueButtonColor"
                            :disable="!isContinueButtonEnabled"
                            :loading="isProcessing"
                            label="Continue"
                            @click="onContinueClick"
                        />
                        <transition name="q-transition--fade">
                            <q-btn
                                v-if="isBackButtonEnabled && !isFirstStep"
                                :class="backButtonClass"
                                :color="backButtonColor"
                                :disable="!isBackButtonEnabled || isProcessing"
                                label="Back"
                                flat
                                @click="onBackClick"
                            />
                        </transition>
                    </slot>
                    <slot
                        name="post-navigation"
                        :back-button-handler="onBackClick"
                        :continue-button-handler="onContinueClick"
                        :is-back-button-enabled="isBackButtonEnabled"
                        :is-continue-button-enabled="isContinueButtonEnabled"
                        :is-processing="isProcessing"
                    />
                </q-stepper-navigation>
            </template>
        </q-stepper>
    </div>
</template>

<script setup lang="ts">
    import { last } from '@s-libs/micro-dash';
    import { first, toMap } from '@ti-platform/aide';
    import { useQuasar } from 'quasar';
    import { QBtn, QSeparator, QStep, QStepper, QStepperNavigation } from 'quasar';
    import { computed, onMounted, ref } from 'vue';
    import { onBeforeRouteLeave } from 'vue-router';

    import { WizardStepStateInternal } from './internal';
    import { WizardStep, WizardStepName, WizardStepStatePublic } from './public';

    const props = withDefaults(
        defineProps<{
            steps: Array<WizardStep>;

            backButtonClass?: string;
            backButtonColor?: string;
            beforeLeaveDialogClass?: string;
            beforeLeaveDialogButtonClass?: string;
            beforeLeaveDialogButtonColor?: string;
            continueButtonClass?: string;
            continueButtonColor?: string;
            isBackButtonSupported?: boolean;
        }>(),
        {
            backButtonClass: '',
            backButtonColor: 'primary',
            beforeLeaveDialogClass: 'bg-warning text-h6',
            beforeLeaveDialogButtonClass: '',
            beforeLeaveDialogButtonColor: 'primary',
            continueButtonClass: '',
            continueButtonColor: 'primary',
            isBackButtonSupported: false,
        }
    );

    const quasar = useQuasar();

    const currentStep = ref(first(props.steps)!);
    const isBackButtonEnabled = ref(true);
    const latestViewedStepIndex = ref(0);

    const stateMap = ref(
        toMap<WizardStepName, WizardStep, WizardStepStatePublic>(
            props.steps,
            (item) => item.name,
            (item, key, index) => new WizardStepStateInternal(index, () => latestViewedStepIndex.value)
        )
    );

    const currentStepState = computed(() => stateMap.value[currentStep.value.name] as WizardStepStateInternal);
    const isContinueButtonEnabled = computed(() => currentStepState.value.isContinueButtonEnabled);
    const isFirstStep = computed(() => currentStep.value.name === first(props.steps)!.name);
    const isLastStep = computed(() => currentStep.value.name === last(props.steps).name);
    const isProcessing = computed(() => currentStepState.value.isProcessing);
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

    onMounted(() => {
        window.addEventListener('beforeunload', onBeforeUnload);
    });
</script>

<style lang="scss" scoped></style>
