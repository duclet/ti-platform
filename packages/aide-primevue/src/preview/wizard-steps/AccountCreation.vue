<template>
    <Button
        :color="isAccountCreated ? 'positive' : 'secondary'"
        :icon="isAccountCreated ? PrimeIcons.CHECK : ''"
        :loading="!isAccountCreated"
        :label="isAccountCreated ? 'Account created' : 'Creating Account'"
    />
</template>

<script setup lang="ts">
    import { PrimeIcons } from '@primevue/core';
    import type { WizardStepState } from '@src/index';
    import { promiseTimeout, useVModel } from '@vueuse/core';
    import Button from 'primevue/button';
    import { onMounted, ref } from 'vue';

    const props = defineProps<{
        modelValue: WizardStepState;
    }>();

    const model = useVModel(props, 'modelValue');

    const isAccountCreated = ref(false);

    onMounted(async () => {
        model.value.isContinueButtonEnabled = false;
        model.value.isProcessingNextStep = true;

        await promiseTimeout(3000);

        isAccountCreated.value = true;
        model.value.isBackButtonEnabled = true;
        model.value.isContinueButtonEnabled = true;
        model.value.isProcessingNextStep = false;
        model.value.isDone = true;
    });
</script>
