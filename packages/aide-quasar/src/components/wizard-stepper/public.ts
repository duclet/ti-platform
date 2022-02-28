import { MarkReadonly } from '@ti-platform/aide';
import { Component } from 'vue';

import { WizardStepStateInternal } from './internal';

export type WizardStepName = string;

/**
 * @property component
 *  The component that will be used to render the step. It will be given the state of the step as it's "modelValue".
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

export type WizardStepStatePublic = Omit<
    MarkReadonly<WizardStepStateInternal, 'isDone' | 'isFromLaterStep'>,
    'backButtonHandler' | 'continueButtonHandler'
>;

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
