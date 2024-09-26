<script lang="ts">
    import BaseComponent from '@primevue/core/basecomponent';
    import MultiProgressIndicatorStyle from '@src/components/multi-progress-indicator/style';

    export default {
        name: 'BaseMultiProgressIndicator',
        extends: BaseComponent,
        style: MultiProgressIndicatorStyle,
        provide() {
            return {
                $pcMultiProgressIndicator: this,
                $parentInstance: this,
            };
        },
    };
</script>
