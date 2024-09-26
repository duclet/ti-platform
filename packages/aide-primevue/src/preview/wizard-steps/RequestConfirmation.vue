<template>
    <p>Please validate your input and decide to continue or not:</p>
    <p><strong>First Name:</strong> {{ firstName }}</p>
    <p><strong>Middle Name:</strong> {{ middleName }}</p>
    <p><strong>Last Name:</strong> {{ lastName }}</p>
    <ButtonGroup>
        <Button label="Back" @click="model.previousStep" />
        <Button label="Confirm" @click="model.nextStep" />
    </ButtonGroup>
    <p>This step is for demonstrating the usage of programmatically go back or to the next step.</p>
</template>

<script setup lang="ts">
    import type { WizardStepState } from '@src/index';
    import { WizardStepperStepsDataKey } from '@src/preview/wizard-steps/utils';
    import { useVModel } from '@vueuse/core';
    import Button from 'primevue/button';
    import ButtonGroup from 'primevue/buttongroup';
    import { inject, onMounted } from 'vue';

    const props = defineProps<{
        modelValue: WizardStepState;
    }>();

    const model = useVModel(props, 'modelValue');

    const { firstName, middleName, lastName } = inject(WizardStepperStepsDataKey)!;

    function continueButtonHandler() {
        return Promise.resolve(true);
    }

    onMounted(() => {
        model.value.continueButtonHandler = continueButtonHandler;
        model.value.isBackButtonEnabled = false;
        model.value.isContinueButtonEnabled = false;
    });
</script>

<style scoped lang="scss"></style>
