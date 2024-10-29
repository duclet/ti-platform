<template>
    <MultiSelect
        :pt:pc-header-checkbox:input:id="inputId"
        :pt:pc-header-checkbox:root:class="cx('headerCheckboxRoot')"
        fluid
        @show="onMultiSelectShow"
    >
        <template v-for="(slot, slotName) in $slots" #[slotName]="slotProps">
            <!--
            @slot All your slots from MultiSelect is available for use.
            -->
            <slot :name="slotName" v-bind="slotProps" />
        </template>
    </MultiSelect>
</template>

<script lang="ts">
    import BaseMultiSelectExtended from '@src/components/multi-select-extended/BaseMultiSelectExtended.vue';

    /*@component
    An extension to the MultiSelect component to allow one to easily provide a label for the "Select All" toggle since
    other requests have not been approved: https://github.com/primefaces/primevue/pull/4502
     */
    export default {
        name: 'MultiSelectExtended',
        extends: BaseMultiSelectExtended,
        inheritAttrs: true,
    };
</script>

<script setup lang="ts">
    import { uniqueId } from '@s-libs/micro-dash';
    import { classes } from '@src/components/multi-select-extended/style';
    import { exposePrimeVueHelpers } from '@src/utils';
    import MultiSelect from 'primevue/multiselect';

    const props = defineProps<{
        /**
         * The label for the toggle all checkbox.
         */
        toggleAllLabel: string;
    }>();

    const { cx } = exposePrimeVueHelpers();

    const inputId = uniqueId('tip-multiselect-extended-input-id-');

    function onMultiSelectShow() {
        const selectAllInput = document.getElementById(inputId);
        if (!selectAllInput) {
            return;
        }

        const selectAllLabel = selectAllInput.parentElement?.querySelector(`label[for=${inputId}]`);
        if (selectAllLabel) {
            return;
        }

        const label = document.createElement('label');
        label.htmlFor = inputId;
        label.innerHTML = props.toggleAllLabel;
        label.classList.add(...classes.headerCheckboxLabel.split(' '));

        selectAllInput.parentElement?.querySelector('[data-pc-section=box]')?.insertAdjacentElement('afterend', label);
    }
</script>
