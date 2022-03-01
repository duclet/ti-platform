export class WizardStepStateInternal {
    /**
     * True if the continue button should be enabled.
     */
    public isContinueButtonEnabled = false;

    /**
     * True is the step has been marked as completed.
     */
    public isDone = false;

    /**
     * True if the continue button should be showing the loading icon.
     */
    public isProcessing = false;

    /**
     * @return
     *  Returns true if we should go back to the previous step (assuming it isn't the first step), false otherwise.
     */
    public backButtonHandler = () => Promise.resolve(true);

    /**
     * @return
     *  Returns true if we should continue to the next step (assuming it isn't the last step), false otherwise.
     */
    public continueButtonHandler = () => Promise.resolve(true);

    public constructor(
        /**
         * The index number for the step.
         */
        public stepIndex: number,

        /**
         * @return
         *  Supplier to return the index of the latest step that was viewed by the user.
         */
        private readonly getLatestViewedStepIndex: () => number
    ) {}

    public get latestViewedStepIndex() {
        return this.getLatestViewedStepIndex();
    }

    public setBackButtonHandler(handler: WizardStepStateInternal['backButtonHandler']) {
        this.backButtonHandler = handler;
    }

    public setContinueButtonHandler(handler: WizardStepStateInternal['continueButtonHandler']) {
        this.continueButtonHandler = handler;
    }
}
