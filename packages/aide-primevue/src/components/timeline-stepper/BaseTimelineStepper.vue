<script lang="ts">
    import BaseComponent from '@primevue/core/basecomponent';
    import TimelineStepperStyle from '@src/components/timeline-stepper/style';

    export default {
        name: 'BaseTimelineStepper',
        extends: BaseComponent,
        style: TimelineStepperStyle,
        provide() {
            return {
                $pcTimelineStepper: this,
                $parentInstance: this,
            };
        },
    };
</script>
