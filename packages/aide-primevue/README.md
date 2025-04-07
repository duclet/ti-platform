# @ti-platform/aide-primevue

This package exposes new components based off Vue and PrimeVue.

# Contents

* [Components](#components)
  * * [MultiProgressIndicator](#multiprogressindicator)
    * [MultiSelectExtended](#multiselectextended)
    * [TimelineStepper](#timelinestepper)
    * [TopbarWithSidebarLayout](#topbarwithsidebarlayout)
    * [WizardStepper](#wizardstepper)
* [API Docs](#api-docs)
  * [Enumerations](#enumerations)
    * [ColorOption](#coloroption)
  * [Type Aliases](#type-aliases)
    * [ProgressIndicatorTask](#progressindicatortask)
    * [TimelineStep](#timelinestep)
    * [TimelineStepColorSupplier()](#timelinestepcolorsupplier)
    * [TimelineStepIconSupplier()](#timelinestepiconsupplier)
    * [TimelineStepName](#timelinestepname)
    * [TimelineStepStatus](#timelinestepstatus)
    * [TimelineStepTaskResult](#timelinesteptaskresult)
  * [Variables](#variables)
    * [TimelineStepStatuses](#timelinestepstatuses)
  * [Functions](#functions)
    * [createTimelineStepTaskResult()](#createtimelinesteptaskresult)
    * [defineTheme()](#definetheme)
    * [exposePrimeVueHelpers()](#exposeprimevuehelpers)
    * [extendStyle()](#extendstyle)
    * [getSeverityForBadge()](#getseverityforbadge)
    * [getSeverityForButton()](#getseverityforbutton)
    * [getSeverityForMessage()](#getseverityformessage)
    * [getSeverityForOverlayBadge()](#getseverityforoverlaybadge)
    * [getSeverityForSplitButton()](#getseverityforsplitbutton)
    * [getSeverityForTag()](#getseverityfortag)
    * [getSeverityForToast()](#getseverityfortoast)
    * [isSameTimelineStepStatus()](#issametimelinestepstatus)

# Components

### MultiProgressIndicator

> This component displays a progress indicator for each specified task during its execution, and will either display
> an error message if any errors occur, or a success message if the task is completed successfully.

In following with PrimeVue's passthrough functionality, the following are available:

* **root**: The DOM element encapsulating the whole component.
* **pc-table**: The DataTable component used to render the list of progress.
* **pc-column-task**: The Column component for the name of the task.
* **pc-column-status**: The Column component for the current status of the task.
* **pc-progress-bar-top**: The top ProgressBar component.
* **pc-progress-bar-reverse**: The bottom ProgressBar component.
* **pc-default-error-message**: The Message component for displaying the default error message.
* **pc-default-success-message**: The Message component for displaying the default success message.

#### Props

| Prop name | Description                                                                           | Type                                 | Default |
| --------- | ------------------------------------------------------------------------------------- | ------------------------------------ | ------- |
| tasks     | The list of {@link ProgressIndicatorTask} we are showing the progress indicators for. | `Array&lt;ProgressIndicatorTask&gt;` |         |

#### Events

| Event name | Properties                                                                                                                                                                                                   | Description                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| complete   | **success** `Array&lt;string&gt;` - An array with the key of the tasks that completed without errors.<br/>**failure** `Array&lt;string&gt;` - An array with the key of the tasks that completed with errors. | Triggered when all tasks are completed. |

#### Slots

| Name                         | Description                                                                          | Bindings                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `${data.key}--description`   | Slot to display the description for a specific task.                                 | <br/>**task** `ProgressIndicatorTask` - The task this is rendering for. |
| description                  | Default slot for displaying the description for all the tasks.                       | **task** `ProgressIndicatorTask` - The task this is rendering for.      |
| `${data.key}--in-progress`   | Slot to display the progress indicator for a specific task.                          | <br/>**task** `ProgressIndicatorTask` - The task this is rendering for. |
| in-progress                  | Default slot for displaying the progress indicator for all the tasks.                | **task** `ProgressIndicatorTask` - The task this is rendering for.      |
| `${data.key}--error-message` | Slot to display the error message, assuming there was an error, for a specific task. | <br/>**task** `ProgressIndicatorTask` - The task this is rendering for. |
| error-message                | Slot to display the error message, assuming there was an error, for all the tasks.   | **task** `ProgressIndicatorTask` - The task this is rendering for.      |
| `${data.key}--success`       | Slot to display when the task completes successfully for a specific task.            | <br/>**task** `ProgressIndicatorTask` - The task this is rendering for. |
| success                      | Slot to display when the task completes successfully for all the tasks.              | **task** `ProgressIndicatorTask` - The task this is rendering for.      |

***

### MultiSelectExtended

> An extension to the MultiSelect component to allow one to easily provide a label for the "Select All" toggle since
> other requests have not been approved: <https://github.com/primefaces/primevue/pull/4502>

#### Props

| Prop name      | Description                            | Type     | Default |
| -------------- | -------------------------------------- | -------- | ------- |
| toggleAllLabel | The label for the toggle all checkbox. | `string` |         |

#### Slots

| Name     | Description                                           | Bindings |
| -------- | ----------------------------------------------------- | -------- |
| slotName | All your slots from MultiSelect is available for use. |          |

***

### TimelineStepper

> This component enables users to perform certain tasks and view the current progress and results in a timeline-style
> user interface.

In following with PrimeVue's passthrough functionality, the following are available:

* **root**: The DOM element encapsulating the whole component.
* **pc-timeline**: The Timeline component used to display the steps.
* **icon**: The DOM element encapsulating the icon.
* **pc-default-icon**: The Button component for displaying the default icon for each step.
* **content**: The DOM element that wraps the content of each step.
* **pc-content-card**: The Card component that wraps the step's content.
* **pc-task-title**: The Message component that displays the title of the task.
* **task-body**: The DOM element that wraps the body of the step.

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

| Name                 | Description                                                                                          | Bindings                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `${item.name}--icon` | Individual slot for each step for displaying the icon. Use this to configure each step individually. | <br/>**step** `TimelineStep` - The timeline step this is for.<br/>**status** `TimelineStepStatus` - The current status of the step. |
| icon                 | Default slot for displaying the icon. Use this to configure for all steps.                           | **step** `TimelineStep` - The timeline step this is for.<br/>**status** `TimelineStepStatus` - The current status of the step.      |
| `${item.name}--body` | Slot for displaying the body for an individual step.                                                 | <br/>**step** `TimelineStep` - The timeline step this is for.<br/>**status** `TimelineStepStatus` - The current status of the step. |
| body                 | Slot for displaying the body for all steps.                                                          | **step** `TimelineStep` - The timeline step this is for.<br/>**status** `TimelineStepStatus` - The current status of the step.      |
| fully-completed      | Slot for displaying content after all steps has been fully completed.                                |                                                                                                                                     |

***

### TopbarWithSidebarLayout

> A component for rendering a layout which have a header row, a collapsible sidebar, and an area for some content.

In following with PrimeVue's passthrough functionality, the following are available:

* **root**: The root DOM element encapsulating the entire component.
* **header**: The encapsulating DOM element for the header row.
* **sidebar-toggle**: The encapsulating DOM element the icon that toggles the visibility of the sidebar.
* **sidebar-toggle-icon**: The DOM element for the sidebar toggle icon.
* **header-content**: The encapsulating DOM element for the content of the header row to the right of the sidebar
  toggle.
* **main**: The encapsulating DOM element for the rest of the page.
* **sidebar**: The encapsulating DOM element for the sidebar.
* **pc-main-menu**: The PanelMenu in the sidebar.
* **main-content**: The encapsulating DOM element for the main content.

#### Props

| Prop name        | Description                                                                                                                                  | Type                    | Default |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ------- |
| isSidebarVisible | True if the sidebar is visible, false otherwise.                                                                                             | `boolean`               |         |
| menuItems        | The list of menu items.                                                                                                                      | `Array&lt;MenuItem&gt;` |         |
| expandedMenuKeys | True if the initial state should be to expand all items, otherwise you can provide a list of the keys that should be automatically expanded. | `union&lt;Array&gt;`    | true    |
| headerHeight     | The height for the header row.                                                                                                               | `string`                | '3rem'  |
| sidebarWidth     | The width of the sidebar.                                                                                                                    | `string`                | '300px' |

#### Slots

| Name           | Description                                                                                                                                                                                                                            | Bindings                                                                                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| header         | Slot for the header row. The default content is for it to be 2 columns, with the left column containing the icon for toggling the visibility of the sidebar and the right column for any other content to be showed on the header row. | **is-sidebar-visible** `boolean` - True if the sidebar should be visible, false otherwise.                                                                                                                                       |
| sidebar-toggle | Slot for displaying the icon to toggle the visibility of the sidebar.                                                                                                                                                                  | **is-sidebar-visible** `boolean` - True if the sidebar should be visible, false otherwise.                                                                                                                                       |
| header-content | Slot for displaying any other content on the header row.                                                                                                                                                                               |                                                                                                                                                                                                                                  |
| sidebar        | Slot for displaying the sidebar. Defaults to a PanelMenu.                                                                                                                                                                              | **menu-items** `Array&lt;MenuItem&gt;` - The items in the menu as given via the prop.<br/>**expanded-menu-items** `Record&lt;string, boolean&gt;` - Map of the menu item's key with whether or not it should be expanded or not. |
| main-content   | Slot for the main content of the page.                                                                                                                                                                                                 |                                                                                                                                                                                                                                  |

***

### WizardStepper

> This is a wrapper component over the QStepper component with enhancements to make managing buttons and certain user
> interactions easier.

In following with PrimeVue's passthrough functionality, the following are available:

* **root**: The root DOM element encapsulating the entire component.
* **pc-stepper**: The Stepper component used to display all the steps in this wizard.
* **pc-step-list**: The StepList component used to display the step headings.
* **pc-step**: The Step component to display each individual step header.
* **step-header**: The DOM element displaying the step header.
* **pc-step-header-icon**: The Button component used to display the icon for a step.
* **step-header-title**: The DOM element for displaying the step's title.
* **pc-step-header-divider**: The Divider component used to display the divider between step headers.
* **pc-step-panels**: The StepPanels component used to wrap all the individual steps' content.
* **pc-step-panel**: The StepPanel component to wrap each step's content.
* **step-content**: The DOM element wrapping the step's content.
* **navigation**: The DOM element wrapping the navigation area of the wizard.
* **pc-navigation-button-group**: The ButtonGroup component that wraps all the navigational buttons.
* **pc-navigation-back-button**: The Button component for the navigating back a step.
* **pc-navigation-continue-button**: The Button component for navigating to the next step.
* **pc-navigation-success-button**: The Button component for displaying when all steps are completed.

#### Props

| Prop name                    | Description                                                                                                              | Type                      | Default              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------- | -------------------- |
| steps                        | The list of steps in the wizard.                                                                                         | `Array&lt;WizardStep&gt;` |                      |
| beforeLeaveDialogClass       | The CSS class name for the dialog that shows when the user tries to leave before completing all the steps.               | `string`                  | 'bg-warning text-h6' |
| beforeLeaveDialogButtonClass | The CSS class name for the button in the dialog that shows when the user tries to leave before completing all the steps. | `string`                  | ''                   |
| beforeLeaveDialogButtonColor | The color for the button in the dialog that shows when the user tries to leave before completing all the steps.          | `string`                  | 'primary'            |
| isBackButtonSupported        | True to enable showing of the back button, false otherwise.                                                              | `boolean`                 | false                |
| isBackButtonVisibleWhenDone  | Assuming that the back button is supported, should it be visible when all the steps are completed?                       | `boolean`                 | false                |

#### Slots

| Name                                            | Description                                                                         | Bindings                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `${currentStepState.stepName}--pre-navigation`  | Slot for rendering the content before the navigational buttons for a specific step. | <br/>**back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing-next-step** `boolean` - True if the step is currently processing in preparation for going to the next step.<br/>**is-processing-previous-step** `boolean` - True if the step is currently processing in preparation for going to the previous step. |
| pre-navigation                                  | Slot for rendering the content before the navigational buttons.                     | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing-next-step** `boolean` - True if the step is currently processing in preparation for going to the next step.<br/>**is-processing-previous-step** `boolean` - True if the step is currently processing in preparation for going to the previous step.      |
| `${currentStepState.stepName}--navigation`      | Slot for rendering the content of the navigational buttons for a specific step.     | <br/>**back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing-next-step** `boolean` - True if the step is currently processing in preparation for going to the next step.<br/>**is-processing-previous-step** `boolean` - True if the step is currently processing in preparation for going to the previous step. |
| navigation                                      | Slot for rendering the content of the navigational buttons.                         | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing-next-step** `boolean` - True if the step is currently processing in preparation for going to the next step.<br/>**is-processing-previous-step** `boolean` - True if the step is currently processing in preparation for going to the previous step.      |
| `${currentStepState.stepName}--post-navigation` | Slot for rendering the content after the navigational buttons for a specific step.  | <br/>**back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing-next-step** `boolean` - True if the step is currently processing in preparation for going to the next step.<br/>**is-processing-previous-step** `boolean` - True if the step is currently processing in preparation for going to the previous step. |
| post-navigation                                 | Slot for rendering the content after the navigational buttons.                      | **back-button-handler** `Function` - Executing function will navigate back to the previous step.<br/>**continue-button-handler** `Function` - Executing function will navigate to the next step.<br/>**is-back-button-enabled** `boolean` - True if the back button should be enabled.<br/>**is-back-button-supported** `boolean` - True if the back button is supported.<br/>**is-continue-button-enabled** `boolean` - True if continue button should be enabled.<br/>**is-done** `boolean` - True if we are on the last step and it is completed.<br/>**is-processing-next-step** `boolean` - True if the step is currently processing in preparation for going to the next step.<br/>**is-processing-previous-step** `boolean` - True if the step is currently processing in preparation for going to the previous step.      |

***

# API Docs

## Enumerations

### ColorOption

Defined in: utils.ts:7

PrimeVue doesn't have a consistent level of severity/color scheme for their components so we are going to assume one.

#### Enumeration Members

| Enumeration Member                 | Value |
| ---------------------------------- | ----- |
| <a id="contrast"></a> `CONTRAST`   | `6`   |
| <a id="error"></a> `ERROR`         | `5`   |
| <a id="help"></a> `HELP`           | `7`   |
| <a id="info"></a> `INFO`           | `3`   |
| <a id="primary"></a> `PRIMARY`     | `0`   |
| <a id="secondary"></a> `SECONDARY` | `1`   |
| <a id="success"></a> `SUCCESS`     | `2`   |
| <a id="warn"></a> `WARN`           | `4`   |

## Type Aliases

### ProgressIndicatorTask

> **ProgressIndicatorTask** = { `description`: `string`; `errorMessage`: `string`; `isInProgress`: `boolean`; `key`: `string`; }

Defined in: components/multi-progress-indicator/api.ts:4

Information for a task to show in the MultiProgressIndicator component.

#### Properties

| Property                                  | Type      | Description                                                                                                           |
| ----------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| <a id="description"></a> `description`    | `string`  | A description for what progress we are waiting for.                                                                   |
| <a id="errormessage"></a> `errorMessage?` | `string`  | When no longer in progress, error message to show. If value is null, it assumes that task was completed successfully. |
| <a id="isinprogress"></a> `isInProgress`  | `boolean` | True to show a progress bar, indicating that it is in progress or false other.                                        |
| <a id="key"></a> `key`                    | `string`  | Unique identifier for the task.                                                                                       |

***

### TimelineStep

> **TimelineStep** = { `body`: `string`; `isInitiallyHidden`: `boolean`; `name`: [`TimelineStepName`](#timelinestepname-1); `task`: (`step`) => `Promise`<[`TimelineStepTaskResult`](#timelinesteptaskresult)>; `title`: `string`; }

Defined in: components/timeline-stepper/api.ts:13

Representing a step in the timeline.

#### Properties

| Property                                            | Type                                                                       | Description                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="body"></a> `body?`                           | `string`                                                                   | The content for the body of the timeline step. Note that for more complex bodies, you can leave this `undefined` and use the slot instead. The slot name will be following the pattern `[TimelineStep.name]--body`. It will also be given the following props: - status: The current status of the step. |
| <a id="isinitiallyhidden"></a> `isInitiallyHidden?` | `boolean`                                                                  | Flag to determine if the step is initially hidden on the timeline until it is started. Set to true to hide it initially or to false to keep it visible.                                                                                                                                                  |
| <a id="name"></a> `name`                            | [`TimelineStepName`](#timelinestepname-1)                                  | Unique name for the step.                                                                                                                                                                                                                                                                                |
| <a id="task"></a> `task`                            | (`step`) => `Promise`<[`TimelineStepTaskResult`](#timelinesteptaskresult)> | Task to run when the step starts.                                                                                                                                                                                                                                                                        |
| <a id="title"></a> `title`                          | `string`                                                                   | The title for the step.                                                                                                                                                                                                                                                                                  |

***

### TimelineStepColorSupplier()

> **TimelineStepColorSupplier** = (`status`) => [`ColorOption`](#coloroption)

Defined in: components/timeline-stepper/api.ts:90

Function to use to get the color for a step.

#### Parameters

| Parameter | Type                                        | Description                     |
| --------- | ------------------------------------------- | ------------------------------- |
| `status`  | [`TimelineStepStatus`](#timelinestepstatus) | The current status of the step. |

#### Returns

[`ColorOption`](#coloroption)

The color for the step. Refer to PrimeVue's Button `severity` prop.

***

### TimelineStepIconSupplier()

> **TimelineStepIconSupplier** = (`status`) => `string`

Defined in: components/timeline-stepper/api.ts:100

Function to use to get the icon for a step.

#### Parameters

| Parameter | Type                                        | Description                     |
| --------- | ------------------------------------------- | ------------------------------- |
| `status`  | [`TimelineStepStatus`](#timelinestepstatus) | The current status of the step. |

#### Returns

`string`

The icon for the step. Refer to PrimeVue's Button `icon` prop.

***

### TimelineStepName

> **TimelineStepName** = `string`

Defined in: components/timeline-stepper/api.ts:7

Unique name for a step.

***

### TimelineStepStatus

> **TimelineStepStatus** = { `isCompletedStep`: `boolean`; `name`: `string`; }

Defined in: components/timeline-stepper/api.ts:70

Represents the status of a step.

#### Properties

| Property                                       | Type      | Description                                                             |
| ---------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| <a id="iscompletedstep"></a> `isCompletedStep` | `boolean` | True if the step is considered to be a completed step, false otherwise. |
| <a id="name-1"></a> `name`                     | `string`  | The name of the status.                                                 |

***

### TimelineStepTaskResult

> **TimelineStepTaskResult** = { `failed`: `boolean`; `nextSteps`: [`TimelineStepName`](#timelinestepname-1)\[]; `skipSteps`: [`TimelineStepName`](#timelinestepname-1)\[]; }

Defined in: components/timeline-stepper/api.ts:50

Represents the result of executing a step and what is expected to happen next.

#### Properties

| Property                           | Type                                         | Description                             |
| ---------------------------------- | -------------------------------------------- | --------------------------------------- |
| <a id="failed"></a> `failed`       | `boolean`                                    | True to mark the step as having failed. |
| <a id="nextsteps"></a> `nextSteps` | [`TimelineStepName`](#timelinestepname-1)\[] | List of timelineSteps to execute next.  |
| <a id="skipsteps"></a> `skipSteps` | [`TimelineStepName`](#timelinestepname-1)\[] | List of timelineSteps to skip.          |

## Variables

### TimelineStepStatuses

> `const` **TimelineStepStatuses**: `Record`<`"FAILED"` | `"IN_PROGRESS"` | `"NOT_STARTED"` | `"SKIPPED"` | `"SUCCEED"`, { `isCompletedStep`: `true`; `name`: `"FAILED"`; } | { `isCompletedStep`: `false`; `name`: `"IN_PROGRESS"`; } | { `isCompletedStep`: `false`; `name`: `"NOT_STARTED"`; } | { `isCompletedStep`: `true`; `name`: `"SKIPPED"`; } | { `isCompletedStep`: `true`; `name`: `"SUCCEED"`; }>

Defined in: components/timeline-stepper/api.ts:105

Map of [TimelineStepStatus](#timelinestepstatus)'s name to its definition.

## Functions

### createTimelineStepTaskResult()

> **createTimelineStepTaskResult**(`__namedParameters`): [`TimelineStepTaskResult`](#timelinesteptaskresult)

Defined in: components/timeline-stepper/api.ts:120

Create the result for the execution of a task.

#### Parameters

| Parameter           | Type                                                           |
| ------------------- | -------------------------------------------------------------- |
| `__namedParameters` | `Partial`<[`TimelineStepTaskResult`](#timelinesteptaskresult)> |

#### Returns

[`TimelineStepTaskResult`](#timelinesteptaskresult)

***

### defineTheme()

> **defineTheme**(`generator`): `ThemeGenerator`

Defined in: utils.ts:140

Add some type support for defining themes.

#### Parameters

| Parameter   | Type             | Description                               |
| ----------- | ---------------- | ----------------------------------------- |
| `generator` | `ThemeGenerator` | The generator to use to define the theme. |

#### Returns

`ThemeGenerator`

***

### exposePrimeVueHelpers()

> **exposePrimeVueHelpers**(): { `cx`: (`key`, `params`?) => `string` | `object`; `ptm`: (`key`, `params`?) => `object`; `ptmi`: (`key`, `params`?) => `object`; }

Defined in: utils.ts:173

Get the helper methods that PrimeVue defines for its components to allow passthrough support.

#### Returns

{ `cx`: (`key`, `params`?) => `string` | `object`; `ptm`: (`key`, `params`?) => `object`; `ptmi`: (`key`, `params`?) => `object`; }

| Name     | Type                                       |
| -------- | ------------------------------------------ |
| `cx()`   | (`key`, `params`?) => `string` \| `object` |
| `ptm()`  | (`key`, `params`?) => `object`             |
| `ptmi()` | (`key`, `params`?) => `object`             |

***

### extendStyle()

> **extendStyle**(`parentStyle`, `childStyle`): `__module`

Defined in: utils.ts:154

Allows extending the BaseStyle for a PrimeVue component.

#### Parameters

| Parameter     | Type       | Description                      |
| ------------- | ---------- | -------------------------------- |
| `parentStyle` | `__module` | The parent style to extend from. |
| `childStyle`  | `unknown`  | The child extension.             |

#### Returns

`__module`

The new class after it has been extended.

***

### getSeverityForBadge()

> **getSeverityForBadge**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

Defined in: utils.ts:26

Map the given color option to a Badge's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

The severity for the given color option.

***

### getSeverityForButton()

> **getSeverityForButton**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

Defined in: utils.ts:43

Map the given color option to a Button's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

The severity for the given color option.

***

### getSeverityForMessage()

> **getSeverityForMessage**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"` | `"error"`

Defined in: utils.ts:73

Map the given color option to a Message's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"` | `"error"`

The severity for the given color option.

***

### getSeverityForOverlayBadge()

> **getSeverityForOverlayBadge**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

Defined in: utils.ts:90

Map the given color option to an OverlayBadge's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

The severity for the given color option.

***

### getSeverityForSplitButton()

> **getSeverityForSplitButton**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

Defined in: utils.ts:114

Map the given color option to a SplitButton's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

The severity for the given color option.

***

### getSeverityForTag()

> **getSeverityForTag**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

Defined in: utils.ts:102

Map the given color option to a Tag's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

The severity for the given color option.

***

### getSeverityForToast()

> **getSeverityForToast**(`colorOption`): `undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

Defined in: utils.ts:126

Map the given color option to a Toast's severity level.

#### Parameters

| Parameter     | Type                          | Description              |
| ------------- | ----------------------------- | ------------------------ |
| `colorOption` | [`ColorOption`](#coloroption) | The color option to map. |

#### Returns

`undefined` | `"secondary"` | `"success"` | `"info"` | `"warn"` | `"danger"` | `"contrast"` | `"help"`

The severity for the given color option.

***

### isSameTimelineStepStatus()

> **isSameTimelineStepStatus**(`status1`, `status2`): `boolean`

Defined in: components/timeline-stepper/api.ts:140

Determine if the two [TimelineStepStatus](#timelinestepstatus) is the same.

#### Parameters

| Parameter | Type                                        | Description                 |
| --------- | ------------------------------------------- | --------------------------- |
| `status1` | [`TimelineStepStatus`](#timelinestepstatus) | The first status to check.  |
| `status2` | [`TimelineStepStatus`](#timelinestepstatus) | The second status to check. |

#### Returns

`boolean`
