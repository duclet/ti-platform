<template>
    <QForm ref="form">
        <p>Please identify yourself.</p>
        <QInput v-model="firstName" :rules="[isRequiredField()]" label="First Name" />
        <QInput v-model="middleName" label="Middle Name (Optional)" />
        <QInput v-model="lastName" :rules="[isRequiredField()]" label="Last Name" />
    </QForm>
</template>

<script setup lang="ts">
    import type { WizardStepState } from '@src/index';
    import { WizardStepperStepsDataKey } from '@src/preview/wizard-steps/utils';
    import { isRequiredField } from '@ti-platform/aide-vue';
    import { useVModel } from '@vueuse/core';
    import { QForm } from 'quasar';
    import type { Ref } from 'vue';
    import { inject, onMounted, ref } from 'vue';

    const props = defineProps<{
        modelValue: WizardStepState;
    }>();

    const model = useVModel(props, 'modelValue');

    const { firstName, middleName, lastName } = inject(WizardStepperStepsDataKey)!;

    const form = ref() as Ref<QForm>;

    onMounted(() => {
        model.value.continueButtonHandler = form.value.validate;
        model.value.isContinueButtonEnabled = true;
    });
</script>

<style scoped lang="scss"></style>
