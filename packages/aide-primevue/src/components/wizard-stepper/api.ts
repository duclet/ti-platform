import type { Component } from 'vue';

/**
 * Unique name for a step.
 */
export type WizardStepName = string;

/**
 * Represents a step in the wizard.
 *
 */
export type WizardStep = {
    /**
     * The component that will be used to render the step. It will be given as its modelValue a {@link WizardStepState}.
     */
    component: Component;

    /**
     * If true, then if the user tries to navigate while the current step is this, a confirmation dialog will be shown
     * to ask if the user really want that or not. If the step is done however, it will not be asked.
     */
    isBeforeLeaveConfirmationEnabled: boolean;

    /**
     * The unique name for the step.
     */
    name: WizardStepName;

    /**
     * The title for the step.
     */
    title: string;

    /**
     * If given, this message will be shown to the user in the dialog when the user tries to navigate away.
     */
    beforeLeaveConfirmationMessage?: string;
};

/**
 * The current state of a step. Note that for the non-readonly properties, you can also write to it to alter the current
 * rendering of the component.
 */
export interface WizardStepState {
    /**
     * Unique name of the step.
     */
    readonly stepName: string;

    /**
     * The index number for the step.
     */
    readonly stepIndex: number;

    /**
     * Call emulate as if the user clicked on the continue button. Note that this will bypass regardless of whether the
     * continue button is enabled or not.
     */
    readonly nextStep: () => void;

    /**
     * Call emulate as if the user clicked on the back button. Note that this will bypass regardless of whether the
     * back button is enabled or not.
     */
    readonly previousStep: () => void;

    /**
     * True if this is the active step, false otherwise.
     */
    readonly isActive: boolean;

    /**
     * True if the back button should be enabled.
     */
    isBackButtonEnabled: boolean;

    /**
     * True if the continue button should be enabled.
     */
    isContinueButtonEnabled: boolean;

    /**
     * True is the step has been marked as completed.
     */
    isDone: boolean;

    /**
     * True if we are processing in preparation for going to the next step.
     */
    isProcessingNextStep: boolean;

    /**
     * True if we are processing in preparation for going to the previous step.
     */
    isProcessingPreviousStep: boolean;

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

/**
 * Create a step for the wizard.
 */
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
