import { VisibilityState } from '../../visibility';
import { type WizardStepState } from './api';

/**
 * Backing implementation of a {@link WizardStepState}.
 */
export class WizardStepStateImpl implements WizardStepState {
    public isContinueButtonEnabled = false;
    public isDone = false;
    public isProcessing = false;
    public backButtonHandler = () => Promise.resolve(true);
    public continueButtonHandler = () => Promise.resolve(true);
    public navigationVisibility = VisibilityState.VISIBLE;

    public constructor(
        public readonly stepIndex: number,
        public readonly nextStep: () => void,
        public readonly previousStep: () => void,

        /**
         * @return
         *  Get the latest viewed step's index number.
         */
        private readonly latestViewedStepIndexGetter: () => number
    ) {}

    public get latestViewedStepIndex() {
        return this.latestViewedStepIndexGetter();
    }

    public asWizardStepState() {
        return this as WizardStepState;
    }
}
