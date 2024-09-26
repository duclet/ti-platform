import type { WizardStepState } from '@src/components/wizard-stepper/api';

/**
 * Backing implementation of a {@link WizardStepState}.
 */
export class WizardStepStateImpl implements WizardStepState {
    public isBackButtonEnabled = false;
    public isContinueButtonEnabled = false;
    public isDone = false;
    public isProcessingPreviousStep = false;
    public isProcessingNextStep = false;
    public backButtonHandler = () => Promise.resolve(true);
    public continueButtonHandler = () => Promise.resolve(true);

    public constructor(
        public readonly stepName: string,
        public readonly stepIndex: number,
        public readonly nextStep: () => void,
        public readonly previousStep: () => void,

        /**
         * @return
         *  Get the currently active step name.
         */
        private readonly activeStepNameGetter: () => string
    ) {}

    public get isActive() {
        return this.activeStepNameGetter() === this.stepName;
    }

    public asWizardStepState() {
        return this as WizardStepState;
    }
}
