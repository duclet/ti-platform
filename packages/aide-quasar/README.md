# @ti-platform/aide-quasar

This package exposes new components based off Vue and Quasar.

## API Docs

### References

- [WizardStepperComponent](README.md#wizardsteppercomponent)

### Type Aliases

- [TimelineStep](README.md#timelinestep)
- [TimelineStepColorSupplier](README.md#timelinestepcolorsupplier)
- [TimelineStepIconSupplier](README.md#timelinestepiconsupplier)
- [TimelineStepName](README.md#timelinestepname)
- [TimelineStepStatePublic](README.md#timelinestepstatepublic)
- [TimelineStepStatus](README.md#timelinestepstatus)
- [TimelineStepTaskResult](README.md#timelinesteptaskresult)
- [WizardStep](README.md#wizardstep)
- [WizardStepName](README.md#wizardstepname)
- [WizardStepStatePublic](README.md#wizardstepstatepublic)

### Variables

- [TimelineStepStatuses](README.md#timelinestepstatuses)
- [TimelineStepperComponent](README.md#timelinesteppercomponent)

### Functions

- [createTimelineStep](README.md#createtimelinestep)
- [createTimelineStepTaskResult](README.md#createtimelinesteptaskresult)
- [createWizardStep](README.md#createwizardstep)
- [getTimelineStepColorByStatus](README.md#gettimelinestepcolorbystatus)
- [getTimelineStepIconByStatus](README.md#gettimelinestepiconbystatus)

## References

### WizardStepperComponent

Renames and re-exports [TimelineStepperComponent](README.md#timelinesteppercomponent)

## Type Aliases

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

components/timeline-stepper/public.ts:22

___

### TimelineStepColorSupplier

Ƭ **TimelineStepColorSupplier**: (...`args`: `Parameters`<typeof [`getTimelineStepColorByStatus`](README.md#gettimelinestepcolorbystatus)\>) => `string`

#### Type declaration

▸ (...`args`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<typeof [`getTimelineStepColorByStatus`](README.md#gettimelinestepcolorbystatus)\> |

##### Returns

`string`

#### Defined in

components/timeline-stepper/public.ts:88

___

### TimelineStepIconSupplier

Ƭ **TimelineStepIconSupplier**: (...`args`: `Parameters`<typeof [`getTimelineStepIconByStatus`](README.md#gettimelinestepiconbystatus)\>) => `string`

#### Type declaration

▸ (...`args`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<typeof [`getTimelineStepIconByStatus`](README.md#gettimelinestepiconbystatus)\> |

##### Returns

`string`

#### Defined in

components/timeline-stepper/public.ts:106

___

### TimelineStepName

Ƭ **TimelineStepName**: `string`

#### Defined in

components/timeline-stepper/public.ts:7

___

### TimelineStepStatePublic

Ƭ **TimelineStepStatePublic**: `MarkReadonly`<`TimelineStepStateInternal`, ``"status"``\>

#### Defined in

components/timeline-stepper/public.ts:30

___

### TimelineStepStatus

Ƭ **TimelineStepStatus**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isCompletedStep` | `boolean` |
| `name` | `string` |

#### Defined in

components/timeline-stepper/internal.ts:3

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

components/timeline-stepper/public.ts:54

___

### WizardStep

Ƭ **WizardStep**: `Object`

**`Property`**

The component that will be used to render the step. It will be given the state of the step as it's "modelValue".

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

components/wizard-stepper/public.ts:21

___

### WizardStepName

Ƭ **WizardStepName**: `string`

#### Defined in

components/wizard-stepper/public.ts:6

___

### WizardStepStatePublic

Ƭ **WizardStepStatePublic**: `Omit`<`MarkReadonly`<`WizardStepStateInternal`, ``"isDone"`` \| ``"stepIndex"``\>, ``"backButtonHandler"`` \| ``"continueButtonHandler"``\>

#### Defined in

components/wizard-stepper/public.ts:30

## Variables

### TimelineStepStatuses

• `Const` **TimelineStepStatuses**: `Record`<``"FAILED"`` \| ``"IN_PROGRESS"`` \| ``"NOT_STARTED"`` \| ``"SKIPPED"`` \| ``"SUCCEED"``, { `isCompletedStep`: ``true`` = true; `name`: ``"FAILED"`` = 'FAILED' } \| { `isCompletedStep`: ``false`` = false; `name`: ``"IN_PROGRESS"`` = 'IN\_PROGRESS' } \| { `isCompletedStep`: ``false`` = false; `name`: ``"NOT_STARTED"`` = 'NOT\_STARTED' } \| { `isCompletedStep`: ``true`` = true; `name`: ``"SKIPPED"`` = 'SKIPPED' } \| { `isCompletedStep`: ``true`` = true; `name`: ``"SUCCEED"`` = 'SUCCEED' }\>

#### Defined in

components/timeline-stepper/internal.ts:16

___

### TimelineStepperComponent

• `Const` **TimelineStepperComponent**: `DefineComponent`<{}, {}, `any`\>

#### Defined in

env.d.ts:4

## Functions

### createTimelineStep

▸ **createTimelineStep**(`name`, `subtitle`, `task`, `body?`): [`TimelineStep`](README.md#timelinestep)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `subtitle` | `string` |
| `task` | (`step`: [`TimelineStep`](README.md#timelinestep)) => `Promise`<[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)\> |
| `body?` | `string` |

#### Returns

[`TimelineStep`](README.md#timelinestep)

#### Defined in

components/timeline-stepper/public.ts:32

___

### createTimelineStepTaskResult

▸ **createTimelineStepTaskResult**(`__namedParameters?`): [`TimelineStepTaskResult`](README.md#timelinesteptaskresult)

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Partial`<[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)\> |

#### Returns

[`TimelineStepTaskResult`](README.md#timelinesteptaskresult)

#### Defined in

components/timeline-stepper/public.ts:60

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

components/wizard-stepper/public.ts:35

___

### getTimelineStepColorByStatus

▸ **getTimelineStepColorByStatus**(`status`): ``"positive"`` \| ``"negative"`` \| ``"warning"`` \| ``"grey-12"`` \| ``"primary"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`TimelineStepStatus`](README.md#timelinestepstatus) |

#### Returns

``"positive"`` \| ``"negative"`` \| ``"warning"`` \| ``"grey-12"`` \| ``"primary"``

#### Defined in

components/timeline-stepper/public.ts:72

___

### getTimelineStepIconByStatus

▸ **getTimelineStepIconByStatus**(`status`): `undefined` \| ``"done_all"`` \| ``"new_releases"`` \| ``"hourglass_top"`` \| ``"hourglass_disabled"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | [`TimelineStepStatus`](README.md#timelinestepstatus) |

#### Returns

`undefined` \| ``"done_all"`` \| ``"new_releases"`` \| ``"hourglass_top"`` \| ``"hourglass_disabled"``

#### Defined in

components/timeline-stepper/public.ts:90
