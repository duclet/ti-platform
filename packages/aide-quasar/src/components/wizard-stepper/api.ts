import { Component } from 'vue';

/**
 * Unique name for a step.
 */
export type WizardStepName = string;

/**
 * @property component
 *  The component that will be used to render the step. It will be given as is modelValue a {@link WizardStepState}.
 * @property name
 *  The unique name for the step.
 * @property title
 *  The title for the step.
 * @property isBeforeLeaveConfirmationEnabled
 *  If true, then if the user tries to navigate while the current step is this, a confirmation dialog will be shown to
 *  ask if the user really want that or not. If the step is done however, it will not be asked.
 * @property [beforeLeaveConfirmationMessage]
 *  If given, this message will be shown to the user in the dialog when the user tries to navigate away.
 */
export type WizardStep = {
    component: Component;
    isBeforeLeaveConfirmationEnabled: boolean;
    name: WizardStepName;
    title: string;

    beforeLeaveConfirmationMessage?: string;
};

/**
 * The current state of a step. Note that for the non-readonly properties, you can also write to it to alter the current
 * rendering of the component. At the moment, this component will only write to those values when the user clicks on the
 * continue or back button.
 */
export interface WizardStepState {
    /**
     * The index number for the step.
     */
    readonly stepIndex: number;

    /**
     * The index of the latest step that was viewed by the user.
     */
    readonly latestViewedStepIndex: number;

    /**
     * True is the step has been marked as completed.
     */
    readonly isDone: boolean;

    /**
     * True if the continue button should be enabled.
     */
    isContinueButtonEnabled: boolean;

    /**
     * True if the continue button should be showing the loading icon.
     */
    isProcessing: boolean;

    /**
     * @return
     *  Returns true if we should go back to the previous step (assuming it isn't the first step), false otherwise.
     */
    backButtonHandler: () => Promise<boolean>;

    /**
     * @return
     *  Returns true if we should continue to the next step (assuming it isn't the last step), false otherwise.
     */
    continueButtonHandler: () => Promise<boolean>;
}

export function createWizardStep(
    name: WizardStep['name'],
    title: WizardStep['title'],
    component: WizardStep['component'],
    opts: Partial<Pick<WizardStep, 'beforeLeaveConfirmationMessage' | 'isBeforeLeaveConfirmationEnabled'>> = {}
): WizardStep {
    return {
        component,
        name,
        title,
        beforeLeaveConfirmationMessage: opts.beforeLeaveConfirmationMessage,
        isBeforeLeaveConfirmationEnabled: opts.isBeforeLeaveConfirmationEnabled ?? false,
    };
}
