# @ti-platform/aide-quasar

This package exposes new components based off Vue and Quasar.

## Components

### MultiProgressIndicator

This component display a progress indicator for each of the given task while it is executing and when it is
completed, either show the error message if there are any or show the success message if it was successful.

#### Props

| Prop name | Description                                                                   | Type                           | Default |
| --------- | ----------------------------------------------------------------------------- | ------------------------------ | ------- |
| tasks     | The list of ProgressIndicatorTask we are showing the progress indicators for. | `Array<ProgressIndicatorTask>` |         |

#### Events

| Event name | Properties                                                                                                                                                                                       | Description                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| complete   | **success** `Array<string>` - An array with the key of the tasks that completed without errors.<br/>**failure** `Array<string>` - An array with the key of the tasks that completed with errors. | Triggered when all tasks are completed. |

#### Slots

| Name                                  | Description                                                                          | Bindings                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `${asTask(scope).key}--in-progress`   | Slot to display the progress indicator for a specific task.                          | <br/>**task** `Task` - The task this is rendering for. |
| in-progress                           | Default slot for displaying the progress indicator for all the tasks.                | **task** `Task` - The task this is rendering for.      |
| `${asTask(scope).key}--error-message` | Slot to display the error message, assuming there was an error, for a specific task. | <br/>**task** `Task` - The task this is rendering for. |
| error-message                         | Slot to display the error message, assuming there was an error, for all the tasks.   | **task** `Task` - The task this is rendering for.      |
| `${asTask(scope).key}--success`       | Slot to display when the task completes successfully for a specific task.            | <br/>**task** `Task` - The task this is rendering for. |
| success                               | Slot to display when the task completes successfully for all the tasks.              | **task** `Task` - The task this is rendering for.      |
### TimelineStepper

This component allows you to execute certain tasks and display the current progress and results in a timeline like
UI.

#### Props

| Prop name                     | Description                                                                                                                                                                | Type                        | Default |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- |
| initialSteps                  | The list of steps the initially and automatically execute.                                                                                                                 | `Array<TimelineStepName>`   |         |
| steps                         | The list of all the TimelineStep.                                                                                                                                          | `Array<TimelineStep>`       |         |
| isHiddenWhenFullyCompleted    | If true, this component will automatically hide itself after a configured delay. Defaults to false.                                                                        | `boolean`                   |         |
| fullyCompletedHiddenTimeoutMs | If isHiddenWhenFullyCompleted is true, then this configures the number of milliseconds to wait after all the tasks are completed to hide this component. Defaults to 1000. | `number`                    |         |
| colorSupplier                 | If given, function to use to get the color for a step. If not given, this component has its own internal mapping that it will use based on the current status of the step. | `TimelineStepColorSupplier` |         |
| iconSupplier                  | If given, function to use to get the icon for a step. If not given, this component has its own internal mapping that it will use based on the current status of the step.  | `TimelineStepIconSupplier`  |         |

#### Events

| Event name      | Properties | Description                                                                                              |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| fully-completed |            | Triggered when all tasks are completed. Note that this is triggered after wait for the configured delay. |

#### Slots

| Name                 | Description                                                           | Bindings                                                                                                                            |
| -------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `${step.name}--body` | Slot for displaying the body for an individual step.                  | <br/>**step** `TimelineStep` - The timeline step this is for.<br/>**status** `TimelineStepStatus` - The current status of the step. |
| body                 | Slot for displaying the body for all steps.                           | **step** `TimelineStep` - The timeline step this is for.<br/>**status** `TimelineStepStatus` - The current status of the step.      |
| fully-completed      | Slot for displaying content after all steps has been fully completed. |                                                                                                                                     |
### WizardStepper

Essentially a wrapper component ovr the QStepper component with enhancements to make management of the buttons and
certain user interactions easier.

#### Props

| Prop name                    | Description                                                                                                              | Type                | Default              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------- | -------------------- |
| steps                        | The list of steps in the wizard.                                                                                         | `Array<WizardStep>` |                      |
| backButtonClass              | The CSS class name for the back button.                                                                                  | `string`            | ''                   |
| backButtonColor              | The color to use for the back button.                                                                                    | `string`            | 'primary'            |
| beforeLeaveDialogClass       | The CSS class name for the dialog that shows when the user tries to leave before completing all the steps.               | `string`            | 'bg-warning text-h6' |
| beforeLeaveDialogButtonClass | The CSS class name for the button in the dialog that shows when the user tries to leave before completing all the steps. | `string`            | ''                   |
| beforeLeaveDialogButtonColor | The color for the button in the dialog that shows when the user tries to leave before completing all the steps.          | `string`            | 'primary'            |
| continueButtonClass          | The CSS class name for the continue button.                                                                              | `string`            | ''                   |
| continueButtonColor          | The color for the continue button.                                                                                       | `string`            | 'primary'            |
| isBackButtonSupported        | True to enable showing of the back button, false otherwise.                                                              | `boolean`           | false                |

#### Slots

| Name            | Description                                                     | Bindings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pre-navigation  | Slot for rendering the content before the navigational buttons. | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work. |
| navigation      | Slot for rendering the content of the navigational buttons.     | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work. |
| post-navigation | Slot for rendering the content after the navigational buttons.  | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work. |

## API Docs

### Interfaces

- [WizardStepState](interfaces/WizardStepState.md)

### Type Aliases

- [ProgressIndicatorTask](README.md#progressindicatortask)
- [TimelineStep](README.md#timelinestep)
- [TimelineStepColorSupplier](README.md#timelinestepcolorsupplier)
- [TimelineStepIconSupplier](README.md#timelinestepiconsupplier)
- [TimelineStepName](README.md#timelinestepname)
- [TimelineStepStatus](README.md#timelinestepstatus)
- [TimelineStepTaskResult](README.md#timelinesteptaskresult)
- [WizardStep](README.md#wizardstep)
- [WizardStepName](README.md#wizardstepname)

### Variables

- [TimelineStepStatuses](README.md#timelinestepstatuses)

### Functions

- [createTimelineStepTaskResult](README.md#createtimelinesteptaskresult)
- [createWizardStep](README.md#createwizardstep)

## Type Aliases

### ProgressIndicatorTask

Ƭ **ProgressIndicatorTask**: `Object`

Information for a task to show in the MultiProgressIndicator component.

**`Property`**

Unique identifier for the task.

**`Property`**

A description for what progress we are waiting for.

**`Property`**

True to show a progress bar, indicating that it is in progress or false other.

**`Property`**

When no longer in progress, error message to show. If value is null, it assumes that task was completed
 successfully.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `errorMessage?` | `string` |
| `isInProgress` | `boolean` |
| `key` | `string` |

#### Defined in

components/multi-progress-indicator/api.ts:14

___

### TimelineStep

Ƭ **TimelineStep**: `Object`

**`Property`**

Unique name for the step.

**`Property`**

Task to run when the step starts.

**`Property`**

The content for the body of the timeline step. Note that for more complex bodies, you can leave this undefined and
 use the slot instead. The slot name will be following the pattern "[TimelineStep.name]--body". It will also be given
 the following props:
     - status: The current status of the step.

**`Property`**

The subtitle for the step.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body?` | `string` |
| `name` | [`TimelineStepName`](README.md#timelinestepname) |
| `subtitle` | `string` |
| `task` | (`step`: [`TimelineStep`](README.md#timelinestep)) => `Promise`<[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)\> |

#### Defined in

components/timeline-stepper/api.ts:21

___

### TimelineStepColorSupplier

Ƭ **TimelineStepColorSupplier**: (`status`: [`TimelineStepStatus`](README.md#timelinestepstatus)) => `string`

#### Type declaration

▸ (`status`): `string`

Function to use to get the color for a step.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | [`TimelineStepStatus`](README.md#timelinestepstatus) | The current status of the step. |

##### Returns

`string`

The color for the step.

#### Defined in

components/timeline-stepper/api.ts:62

___

### TimelineStepIconSupplier

Ƭ **TimelineStepIconSupplier**: (`status`: [`TimelineStepStatus`](README.md#timelinestepstatus)) => `string` \| `undefined`

#### Type declaration

▸ (`status`): `string` \| `undefined`

Function to use to get the icon for a step.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | [`TimelineStepStatus`](README.md#timelinestepstatus) | The current status of the step. |

##### Returns

`string` \| `undefined`

The icon for the step or undefined if it should not use any icon.

#### Defined in

components/timeline-stepper/api.ts:72

___

### TimelineStepName

Ƭ **TimelineStepName**: `string`

Unique name for a step.

#### Defined in

components/timeline-stepper/api.ts:6

___

### TimelineStepStatus

Ƭ **TimelineStepStatus**: `Object`

**`Property`**

The name of the status.

**`Property`**

True if the step is considered to be a completed step, false otherwise.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isCompletedStep` | `boolean` |
| `name` | `string` |

#### Defined in

components/timeline-stepper/api.ts:49

___

### TimelineStepTaskResult

Ƭ **TimelineStepTaskResult**: `Object`

**`Property`**

True to mark the step as having failed.

**`Property`**

List of timelineSteps to execute next.

**`Property`**

List of timelineSteps to skip.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `failed` | `boolean` |
| `nextSteps` | [`TimelineStepName`](README.md#timelinestepname)[] |
| `skipSteps` | [`TimelineStepName`](README.md#timelinestepname)[] |

#### Defined in

components/timeline-stepper/api.ts:37

___

### WizardStep

Ƭ **WizardStep**: `Object`

**`Property`**

The component that will be used to render the step. It will be given as is modelValue a [WizardStepState](interfaces/WizardStepState.md).

**`Property`**

The unique name for the step.

**`Property`**

The title for the step.

**`Property`**

If true, then if the user tries to navigate while the current step is this, a confirmation dialog will be shown to
 ask if the user really want that or not. If the step is done however, it will not be asked.

**`Property`**

If given, this message will be shown to the user in the dialog when the user tries to navigate away.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `beforeLeaveConfirmationMessage?` | `string` |
| `component` | `Component` |
| `isBeforeLeaveConfirmationEnabled` | `boolean` |
| `name` | [`WizardStepName`](README.md#wizardstepname) |
| `title` | `string` |

#### Defined in

components/wizard-stepper/api.ts:21

___

### WizardStepName

Ƭ **WizardStepName**: `string`

Unique name for a step.

#### Defined in

components/wizard-stepper/api.ts:6

## Variables

### TimelineStepStatuses

• `Const` **TimelineStepStatuses**: `Record`<``"FAILED"`` \| ``"IN_PROGRESS"`` \| ``"NOT_STARTED"`` \| ``"SKIPPED"`` \| ``"SUCCEED"``, { `isCompletedStep`: ``true`` = true; `name`: ``"FAILED"`` = 'FAILED' } \| { `isCompletedStep`: ``false`` = false; `name`: ``"IN_PROGRESS"`` = 'IN\_PROGRESS' } \| { `isCompletedStep`: ``false`` = false; `name`: ``"NOT_STARTED"`` = 'NOT\_STARTED' } \| { `isCompletedStep`: ``true`` = true; `name`: ``"SKIPPED"`` = 'SKIPPED' } \| { `isCompletedStep`: ``true`` = true; `name`: ``"SUCCEED"`` = 'SUCCEED' }\>

Map of [TimelineStepStatus](README.md#timelinestepstatus)'s name to its definition.

#### Defined in

components/timeline-stepper/api.ts:77

## Functions

### createTimelineStepTaskResult

▸ **createTimelineStepTaskResult**(`__namedParameters?`): [`TimelineStepTaskResult`](README.md#timelinesteptaskresult)

Create the result for the execution of a task.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Partial`<[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)\> |

#### Returns

[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)

#### Defined in

components/timeline-stepper/api.ts:100

___

### createWizardStep

▸ **createWizardStep**(`name`, `title`, `component`, `opts?`): [`WizardStep`](README.md#wizardstep)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `title` | `string` |
| `component` | `Component`<`any`, `any`, `any`, `ComputedOptions`, `MethodOptions`\> |
| `opts` | `Partial`<`Pick`<[`WizardStep`](README.md#wizardstep), ``"beforeLeaveConfirmationMessage"`` \| ``"isBeforeLeaveConfirmationEnabled"``\>\> |

#### Returns

[`WizardStep`](README.md#wizardstep)

#### Defined in

components/wizard-stepper/api.ts:74
