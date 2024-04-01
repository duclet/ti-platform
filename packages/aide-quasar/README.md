# @ti-platform/aide-quasar

This package exposes new components based off Vue and Quasar.

# Contents

* [Components](#components)
  * * [MultiProgressIndicator](#multiprogressindicator)
    * [TimelineStepper](#timelinestepper)
    * [WizardStepper](#wizardstepper)
* [API Docs](#api-docs)
  * [Enumerations](#enumerations)
    * [VisibilityState](#visibilitystate)
  * [Interfaces](#interfaces)
    * [WizardStepState](#wizardstepstate)
  * [Type Aliases](#type-aliases)
    * [ProgressIndicatorTask](#progressindicatortask)
    * [TimelineStep](#timelinestep)
    * [TimelineStepColorSupplier()](#timelinestepcolorsupplier)
    * [TimelineStepIconSupplier()](#timelinestepiconsupplier)
    * [TimelineStepName](#timelinestepname)
    * [TimelineStepStatus](#timelinestepstatus)
    * [TimelineStepTaskResult](#timelinesteptaskresult)
    * [WizardStep](#wizardstep)
    * [WizardStepName](#wizardstepname)
  * [Variables](#variables)
    * [TimelineStepStatuses](#timelinestepstatuses)
  * [Functions](#functions)
    * [createTimelineStepTaskResult()](#createtimelinesteptaskresult)
    * [createWizardStep()](#createwizardstep)
    * [cssStyleByVisibilityState()](#cssstylebyvisibilitystate)
    * [isSameTimelineStepStatus()](#issametimelinestepstatus)
    * [vIfByVisibilityState()](#vifbyvisibilitystate)

# Components

### MultiProgressIndicator

> This component displays a progress indicator for each specified task during its execution, and will either display
> an error message if any errors occur, or a success message if the task is completed successfully.

#### Props

| Prop name | Description                                                                   | Type                                 | Default |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------ | ------- |
| tasks     | The list of ProgressIndicatorTask we are showing the progress indicators for. | `Array&lt;ProgressIndicatorTask&gt;` |         |

#### Events

| Event name | Properties                                                                                                                                                                                                   | Description                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| complete   | **success** `Array&lt;string&gt;` - An array with the key of the tasks that completed without errors.<br/>**failure** `Array&lt;string&gt;` - An array with the key of the tasks that completed with errors. | Triggered when all tasks are completed. |

#### Slots

| Name                                  | Description                                                                          | Bindings                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `${asTask(scope).key}--description`   | Slot to display the description for a specific task.                                 | <br/>**task** `Task` - The task this is rendering for. |
| description                           | Default slot for displaying the description for all the tasks.                       | **task** `Task` - The task this is rendering for.      |
| `${asTask(scope).key}--in-progress`   | Slot to display the progress indicator for a specific task.                          | <br/>**task** `Task` - The task this is rendering for. |
| in-progress                           | Default slot for displaying the progress indicator for all the tasks.                | **task** `Task` - The task this is rendering for.      |
| `${asTask(scope).key}--error-message` | Slot to display the error message, assuming there was an error, for a specific task. | <br/>**task** `Task` - The task this is rendering for. |
| error-message                         | Slot to display the error message, assuming there was an error, for all the tasks.   | **task** `Task` - The task this is rendering for.      |
| `${asTask(scope).key}--success`       | Slot to display when the task completes successfully for a specific task.            | <br/>**task** `Task` - The task this is rendering for. |
| success                               | Slot to display when the task completes successfully for all the tasks.              | **task** `Task` - The task this is rendering for.      |

***

### TimelineStepper

> This component enables users to perform certain tasks and view the current progress and results in a timeline-style
> user interface.

#### Props

| Prop name                     | Description                                                                                                                                                                | Type                            | Default                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------- |
| initialSteps                  | The list of steps the initially and automatically execute.                                                                                                                 | `Array&lt;TimelineStepName&gt;` |                              |
| steps                         | The list of all the TimelineStep.                                                                                                                                          | `Array&lt;TimelineStep&gt;`     |                              |
| fullyCompletedHiddenTimeoutMs | If isHiddenWhenFullyCompleted is true, then this configures the number of milliseconds to wait after all the tasks are completed to hide this component. Defaults to 1000. | `number`                        | 1000                         |
| isHiddenWhenFullyCompleted    | If true, this component will automatically hide itself after a configured delay. Defaults to false.                                                                        | `boolean`                       | false                        |
| isInitiallyHidden             | If true, each steps default is to be initially hidden rather than visible. This value is used as the fallback value when the same property is not set in the step itself.  | `boolean`                       | false                        |
| colorSupplier                 | If given, function to use to get the color for a step. If not given, this component has its own internal mapping that it will use based on the current status of the step. | `TimelineStepColorSupplier`     | getTimelineStepColorByStatus |
| iconSupplier                  | If given, function to use to get the icon for a step. If not given, this component has its own internal mapping that it will use based on the current status of the step.  | `TimelineStepIconSupplier`      | getTimelineStepIconByStatus  |

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

***

### WizardStepper

> This is a wrapper component over the QStepper component with enhancements to make managing buttons and certain user
> interactions easier.

#### Props

| Prop name                    | Description                                                                                                              | Type                      | Default              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------- | -------------------- |
| steps                        | The list of steps in the wizard.                                                                                         | `Array&lt;WizardStep&gt;` |                      |
| backButtonClass              | The CSS class name for the back button.                                                                                  | `string`                  | ''                   |
| backButtonColor              | The color to use for the back button.                                                                                    | `string`                  | 'primary'            |
| backButtonText               | The text for the back button.                                                                                            | `string`                  | 'Back'               |
| beforeLeaveDialogClass       | The CSS class name for the dialog that shows when the user tries to leave before completing all the steps.               | `string`                  | 'bg-warning text-h6' |
| beforeLeaveDialogButtonClass | The CSS class name for the button in the dialog that shows when the user tries to leave before completing all the steps. | `string`                  | ''                   |
| beforeLeaveDialogButtonColor | The color for the button in the dialog that shows when the user tries to leave before completing all the steps.          | `string`                  | 'primary'            |
| continueButtonClass          | The CSS class name for the continue button.                                                                              | `string`                  | ''                   |
| continueButtonColor          | The color for the continue button.                                                                                       | `string`                  | 'primary'            |
| continueButtonText           | The text for the continue button.                                                                                        | `string`                  | 'Continue'           |
| doneButtonClass              | The CSS class name for the done button.                                                                                  | `string`                  | ''                   |
| doneButtonColor              | The color for the done button.                                                                                           | `string`                  | 'positive'           |
| doneButtonIcon               | The icon for the done button.                                                                                            | `string`                  | 'done\_all'           |
| doneButtonText               | The text for the done button.                                                                                            | `string`                  | 'Done'               |
| isBackButtonSupported        | True to enable showing of the back button, false otherwise.                                                              | `boolean`                 | false                |
| isBackButtonVisibleWhenDone  | Assuming that the back button is supported, should it be visible when all the steps are completed?                       | `boolean`                 | false                |

#### Slots

| Name                                             | Description                                                                         | Bindings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${stepper.current.value.name}--pre-navigation`  | Slot for rendering the content before the navigational buttons for a specific step. | <br/>**back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work. |
| pre-navigation                                   | Slot for rendering the content before the navigational buttons.                     | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work.      |
| `${stepper.current.value.name}--navigation`      | Slot for rendering the content of the navigational buttons for a specific step.     | <br/>**back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work. |
| navigation                                       | Slot for rendering the content of the navigational buttons.                         | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work.      |
| `${stepper.current.value.name}--post-navigation` | Slot for rendering the content after the navigational buttons for a specific step.  | <br/>**back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work. |
| post-navigation                                  | Slot for rendering the content after the navigational buttons.                      | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing** `boolean` - True if the step is currently processing or doing work.      |

***

# API Docs

## Enumerations

### VisibilityState

For configuring the visibility of elements.

#### Enumeration Members

| Enumeration Member | Value | Description |
| :------ | :------ | :------ |
| `HIDDEN_HIDE_DIMENSIONS` | `2` | The element should be hidden but the HTML for it should still be on the page but the element is collapsed.<br />Usually, this is done with "display: none". |
| `HIDDEN_KEEP_DIMENSIONS` | `1` | The element should be hidden but the HTML for it should still be on the page while keeping the space it occupies<br />visible. Usually, this is done with "visibility: hidden" or "opacity: 0". |
| `NO_RENDER` | `3` | The element should not be rendered at all. Usually this is done using the `v-if` directive. |
| `VISIBLE` | `0` | The element should be visible. |

## Interfaces

### WizardStepState

The current state of a step. Note that for the non-readonly properties, you can also write to it to alter the current
rendering of the component.

#### Properties

| Property | Modifier | Type | Description |
| :------ | :------ | :------ | :------ |
| `backButtonHandler` | `public` | () => `Promise`<`boolean`> |  |
| `continueButtonHandler` | `public` | () => `Promise`<`boolean`> |  |
| `isContinueButtonEnabled` | `public` | `boolean` | True if the continue button should be enabled. |
| `isDone` | `public` | `boolean` | True is the step has been marked as completed. |
| `isProcessing` | `public` | `boolean` | True if the continue button should be showing the loading icon. |
| `latestViewedStepIndex` | `readonly` | `number` | The index of the latest step that was viewed by the user. |
| `navigationVisibility` | `public` | [`VisibilityState`](README.md#visibilitystate) | The visibility state for the navigational area. |
| `nextStep` | `readonly` | () => `void` | Call emulate as if the user clicked on the continue button. Note that this will bypass regardless of whether the<br />continue button is enabled or not. |
| `previousStep` | `readonly` | () => `void` | Call emulate as if the user clicked on the back button. Note that this will bypass regardless of whether the<br />back button is enabled or not. |
| `stepIndex` | `readonly` | `number` | The index number for the step. |

## Type Aliases

### ProgressIndicatorTask

> **ProgressIndicatorTask**: `Object`

Information for a task to show in the MultiProgressIndicator component.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | A description for what progress we are waiting for. |
| `errorMessage` | `string` | When no longer in progress, error message to show. If value is null, it assumes that task was completed<br />successfully. |
| `isInProgress` | `boolean` | True to show a progress bar, indicating that it is in progress or false other. |
| `key` | `string` | Unique identifier for the task. |

#### Source

components/multi-progress-indicator/api.ts:4

***

### TimelineStep

> **TimelineStep**: `Object`

Representing a step in the timeline.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `body` | `string` | The content for the body of the timeline step. Note that for more complex bodies, you can leave this `undefined`<br />and use the slot instead. The slot name will be following the pattern `[TimelineStep.name]--body`. It will also<br />be given the following props:<br /> - status: The current status of the step. |
| `isInitiallyHidden` | `boolean` | Flag to determine if the step is initially hidden on the timeline until it is started. Set to true to hide it<br />initially or to false to keep it visible. |
| `name` | [`TimelineStepName`](README.md#timelinestepname) | Unique name for the step. |
| `subtitle` | `string` | The subtitle for the step. |
| `task` | (`step`) => `Promise`<[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)> | Task to run when the step starts. |

#### Source

components/timeline-stepper/api.ts:12

***

### TimelineStepColorSupplier()

> **TimelineStepColorSupplier**: (`status`) => `string`

Function to use to get the color for a step.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `status` | [`TimelineStepStatus`](README.md#timelinestepstatus) | The current status of the step. |

#### Returns

`string`

#### Source

components/timeline-stepper/api.ts:89

***

### TimelineStepIconSupplier()

> **TimelineStepIconSupplier**: (`status`) => `string` | `undefined`

Function to use to get the icon for a step.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `status` | [`TimelineStepStatus`](README.md#timelinestepstatus) | The current status of the step. |

#### Returns

`string` | `undefined`

#### Source

components/timeline-stepper/api.ts:99

***

### TimelineStepName

> **TimelineStepName**: `string`

Unique name for a step.

#### Source

components/timeline-stepper/api.ts:6

***

### TimelineStepStatus

> **TimelineStepStatus**: `Object`

Represents the status of a step.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `isCompletedStep` | `boolean` | True if the step is considered to be a completed step, false otherwise. |
| `name` | `string` | The name of the status. |

#### Source

components/timeline-stepper/api.ts:69

***

### TimelineStepTaskResult

> **TimelineStepTaskResult**: `Object`

Represents the result of executing a step and what is expected to happen next.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `failed` | `boolean` | True to mark the step as having failed. |
| `nextSteps` | [`TimelineStepName`](README.md#timelinestepname)\[] | List of timelineSteps to execute next. |
| `skipSteps` | [`TimelineStepName`](README.md#timelinestepname)\[] | List of timelineSteps to skip. |

#### Source

components/timeline-stepper/api.ts:49

***

### WizardStep

> **WizardStep**: `Object`

Represents a step in the wizard.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `beforeLeaveConfirmationMessage` | `string` | If given, this message will be shown to the user in the dialog when the user tries to navigate away. |
| `component` | `Component` | The component that will be used to render the step. It will be given as is modelValue a [WizardStepState](README.md#wizardstepstate). |
| `isBeforeLeaveConfirmationEnabled` | `boolean` | If true, then if the user tries to navigate while the current step is this, a confirmation dialog will be shown<br />to ask if the user really want that or not. If the step is done however, it will not be asked. |
| `name` | [`WizardStepName`](README.md#wizardstepname) | The unique name for the step. |
| `title` | `string` | The title for the step. |

#### Source

components/wizard-stepper/api.ts:13

***

### WizardStepName

> **WizardStepName**: `string`

Unique name for a step.

#### Source

components/wizard-stepper/api.ts:7

## Variables

### TimelineStepStatuses

> **`const`** **TimelineStepStatuses**: `Record`<`"FAILED"` | `"IN_PROGRESS"` | `"NOT_STARTED"` | `"SKIPPED"` | `"SUCCEED"`, `Object` | `Object` | `Object` | `Object` | `Object`>

Map of [TimelineStepStatus](README.md#timelinestepstatus)'s name to its definition.

#### Source

components/timeline-stepper/api.ts:104

## Functions

### createTimelineStepTaskResult()

> **createTimelineStepTaskResult**(`__namedParameters`): [`TimelineStepTaskResult`](README.md#timelinesteptaskresult)

Create the result for the execution of a task.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `__namedParameters` | `Partial`<[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)> |

#### Returns

[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)

#### Source

components/timeline-stepper/api.ts:119

***

### createWizardStep()

> **createWizardStep**(`name`, `title`, `component`, `opts`): [`WizardStep`](README.md#wizardstep)

Create a step for the wizard.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `name` | `string` |
| `title` | `string` |
| `component` | `Component` |
| `opts` | `Partial`<`Pick`<[`WizardStep`](README.md#wizardstep), `"beforeLeaveConfirmationMessage"` | `"isBeforeLeaveConfirmationEnabled"`>> |

#### Returns

[`WizardStep`](README.md#wizardstep)

#### Source

components/wizard-stepper/api.ts:104

***

### cssStyleByVisibilityState()

> **cssStyleByVisibilityState**(`state`): `ComputedRef`<`string`>

Get a computed style definition based on the provided visibility state. This is not intended for the NO\_RENDER state
as that should be handled via the `v-if` directive. It is best to use this in combination with the
`vIfByVisibilityState` method.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `state` | `Ref`<[`VisibilityState`](README.md#visibilitystate)> | A reactive variable for the current visibility state to calculate the style. |

#### Returns

`ComputedRef`<`string`>

#### Source

visibility.ts:38

***

### isSameTimelineStepStatus()

> **isSameTimelineStepStatus**(`status1`, `status2`): `boolean`

Determine if the two [TimelineStepStatus](README.md#timelinestepstatus) is the same.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `status1` | [`TimelineStepStatus`](README.md#timelinestepstatus) | The first status to check. |
| `status2` | [`TimelineStepStatus`](README.md#timelinestepstatus) | The second status to check. |

#### Returns

`boolean`

#### Source

components/timeline-stepper/api.ts:139

***

### vIfByVisibilityState()

> **vIfByVisibilityState**(`state`): `ComputedRef`<`boolean`>

Determine whether an element or component should be visible for use with the `v-if` directive. This should really be
used in combination with `cssStyleByVisibilityState` method which handles all the other use cases as this really just
handles the NO\_RENDER state.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `state` | `Ref`<[`VisibilityState`](README.md#visibilitystate)> | A reactive variable for the current visibility state to calculate value for the `v-if` directive. |

#### Returns

`ComputedRef`<`boolean`>

#### Source

visibility.ts:55
