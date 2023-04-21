# Change Log - @ti-platform/aide-quasar

This log was last generated on Fri, 21 Apr 2023 15:44:57 GMT and should not be manually modified.

## 2.2.0
Fri, 21 Apr 2023 15:44:57 GMT

### Minor changes

- Adding ability to hide or show the navigation bar

### Patches

- Switching to use VueUse's useStepper utility method to handle the steps interactions

## 2.1.1
Fri, 24 Mar 2023 14:42:12 GMT

_Version update only_

## 2.1.0
Fri, 17 Feb 2023 17:13:09 GMT

### Minor changes

- MultiProgressIndicator: Adding more slots that can be used to customize the display.
- MultiProgressIndicator: Adding a data attribute to each progress item row which can be queried against for further customizations.
- MultiProgressIndicator: The error message now renders inside of a QBtn.
- MultiProgressIndicator: This component is now also exported as MultiProgressIndicatorComponent for consistency with the other components.
- TimelineStepper: Adding ability to initially hide a step until it is started.
- TimelineStepper: This component is now also exported as TimelineStepper for consistency with other components.
- WizardStepper: Adding more slots that can be used to customize the display.
- WizardStepper: The navigational slots now also receives property to let it know when the user is done with the last step.
- WizardStepper: The default template for the navigational slots now hides the continue button when the last step is done and also shows a done button instead.
- WizardStepper: The default template for the navigational slots can now be configured to hide the back button when the user is in the last step and it is done.
- WizardStepper: Modifying execution to only call vue-router related features if it is actually used by user.
- WizardStepper: This component is now also exported as WizardStepper for consistency with other components.
- Adding functionality to preview components during development to help with testing. Note I didn't want to include the huge dependencies of Storybook so just using Vite for this.

### Patches

- TimelineStepper: Fixing bug where the skipped steps before didn't actually skip and ran the task instead. It should now just mark the step as skipped.

## 2.0.0
Tue, 15 Nov 2022 19:59:59 GMT

### Breaking changes

- Adding the MultiProgressIndicator component; Standardize the TimelineStepper and WizardStepper component public API and usage; Adding much needed documentation

## 1.0.3
Wed, 19 Oct 2022 18:53:48 GMT

_Version update only_

## 1.0.2
Fri, 09 Sep 2022 19:08:12 GMT

### Patches

- Dependencies version updates.

## 1.0.1
Tue, 03 May 2022 18:29:13 GMT

### Patches

- Fixing bug with properly supporting the back button for WizardStepper component

## 1.0.0
Tue, 03 May 2022 16:22:27 GMT

### Breaking changes

- Remove wrapper element from WizardStepper

## 0.2.0
Tue, 01 Mar 2022 20:10:41 GMT

### Minor changes

- WizardStepperComponent - Add ability to get index of latest step that was viewed

## 0.1.0
Mon, 28 Feb 2022 20:13:03 GMT

### Minor changes

- Initial addition with components TimelineStepper and WizardStep

