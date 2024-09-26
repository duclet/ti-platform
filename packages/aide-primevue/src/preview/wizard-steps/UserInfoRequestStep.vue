<template>
    <form ref="form">
        <p>Please identify yourself.</p>
        <InputText v-model="firstName" :rules="[isRequiredField()]" label="First Name" />
        <InputText v-model="middleName" label="Middle Name (Optional)" />
        <InputText v-model="lastName" :rules="[isRequiredField()]" label="Last Name" />
    </form>
</template>

<script setup lang="ts">
    import type { WizardStepState } from '@src/index';
    import { WizardStepperStepsDataKey } from '@src/preview/wizard-steps/utils';
    import { isRequiredField } from '@ti-platform/aide-vue';
    import { useVModel } from '@vueuse/core';
    import InputText from 'primevue/inputtext';
    import type { Ref } from 'vue';
    import { inject, onMounted, ref } from 'vue';

    const props = defineProps<{
        modelValue: WizardStepState;
    }>();

    const model = useVModel(props, 'modelValue');

    const { firstName, middleName, lastName } = inject(WizardStepperStepsDataKey)!;

    const form = ref() as Ref<HTMLFormElement>;

    onMounted(() => {
        // model.value.continueButtonHandler = form.value.validate;
        model.value.isBackButtonEnabled = true;
        model.value.isContinueButtonEnabled = true;
    });
</script>

<style scoped lang="scss"></style>
