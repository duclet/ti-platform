import { InjectionKey, Ref } from 'vue';

export const WizardStepperStepsDataKey: InjectionKey<{
    firstName: Ref<string>;
    middleName: Ref<string>;
    lastName: Ref<string>;
}> = Symbol();
