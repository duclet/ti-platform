<script lang="ts">
    import BaseComponent from '@primevue/core/basecomponent';
    import MultiSelectExtendedStyle from '@src/components/multi-select-extended/style';

    export default {
        name: 'BaseMultiSelectExtended',
        extends: BaseComponent,
        style: MultiSelectExtendedStyle,
        provide() {
            return {
                $pcMultiSelectExtended: this,
                $parentInstance: this,
            };
        },
    };
</script>
