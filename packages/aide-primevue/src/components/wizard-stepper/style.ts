import BaseStyle from '@primevue/core/base/style';
import { defineTheme, extendStyle } from '@src/utils';

const theme = defineTheme(
    ({ dt }) => `
.p-wizardstepper {}

.p-wizardstepper-steplist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.p-wizardstepper-stepheader {
    display: flex;
    flex: 1 1 0%;
    align-items: center;
    gap: 0.5rem;
    margin: 0.5rem;
}

.p-wizardstepper-stepheader-title {
    white-space: nowrap;
}

.p-wizardstepper-stepheader-divider {
    flex-grow: 1;
    width: auto;
}

.p-wizardstepper-stepcontent {
    color: ${dt('stepper.steppanel.color')}; 
    border-radius: ${dt('border.radius.md')};
    border-width: 2px;
    border-style: dashed;
    border-color: ${dt('surface.200')};
    background-color: ${dt('surface.50')};
    padding: 1rem;
}

.p-wizardstepper-navigation {
    margin-top: 1rem;
}
`
);

const classes = {
    root: 'p-wizardstepper p-component',
    stepList: 'p-wizardstepper-steplist',
    stepHeader: 'p-wizardstepper-stepheader',
    stepHeaderTitle: 'p-wizardstepper-stepheader-title',
    stepHeaderDivider: 'p-wizardstepper-stepheader-divider',
    stepContent: 'p-wizardstepper-stepcontent',
    navigation: 'p-wizardstepper-navigation',
};

export default extendStyle(BaseStyle, { name: 'wizardstepper', theme, classes });
