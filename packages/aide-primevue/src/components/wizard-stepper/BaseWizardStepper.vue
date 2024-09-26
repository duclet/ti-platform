<script lang="ts">
    import BaseComponent from '@primevue/core/basecomponent';
    import WizardStepperStyle from '@src/components/wizard-stepper/style';

    export default {
        name: 'BaseWizardStepper',
        extends: BaseComponent,
        style: WizardStepperStyle,
        provide() {
            return {
                $pcWizardStepper: this,
                $parentInstance: this,
            };
        },
    };
</script>
