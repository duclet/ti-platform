<template>
    <QBtn
        :color="isAccountCreated ? 'positive' : 'secondary'"
        :icon="isAccountCreated ? 'done_all' : ''"
        :loading="!isAccountCreated"
        :label="isAccountCreated ? 'Account created' : 'Creating Account'"
    />
</template>

<script setup lang="ts">
    import { promiseTimeout, useVModel } from '@vueuse/core';
    import { onMounted, ref } from 'vue';

    import { WizardStepState } from '../../components/wizard-stepper';

    const props = defineProps<{
        modelValue: WizardStepState;
    }>();

    const model = useVModel(props, 'modelValue');

    const isAccountCreated = ref(false);

    onMounted(async () => {
        model.value.isProcessing = true;

        await promiseTimeout(3000);

        isAccountCreated.value = true;
        model.value.isProcessing = false;
        model.value.isDone = true;
    });
</script>

<style scoped lang="scss"></style>
