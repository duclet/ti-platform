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
     * True if the user came into the current step from a later step (user pressed the back button).
     */
    public isFromLaterStep = false;

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

    public setBackButtonHandler(handler: WizardStepStateInternal['backButtonHandler']) {
        this.backButtonHandler = handler;
    }

    public setContinueButtonHandler(handler: WizardStepStateInternal['continueButtonHandler']) {
        this.continueButtonHandler = handler;
    }
}
