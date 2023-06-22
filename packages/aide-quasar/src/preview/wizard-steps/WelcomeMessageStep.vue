<template>
    <h3>WizardStepper Demo</h3>
    <p>Please click on the <strong>Continue</strong> button to get started.</p>
</template>

<script setup lang="ts">
    import { useVModel } from '@vueuse/core';
    import { onMounted } from 'vue';

    import { type WizardStepState } from '../../index';

    const props = defineProps<{
        modelValue: WizardStepState;
    }>();

    const model = useVModel(props, 'modelValue');

    onMounted(() => {
        model.value.isContinueButtonEnabled = true;
    });
</script>

<style scoped lang="scss"></style>
