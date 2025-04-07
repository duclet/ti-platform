import BaseStyle from '@primevue/core/base/style';
import { defineTheme, extendStyle } from '@src/utils';

const theme = defineTheme(
    ({ dt }) => `
.p-multiselectextended {}

.tip.p-multiselectextended-headercheckboxroot {
    width: auto;
}

.p-multiselectextended-headercheckboxlabel {
    margin-left: ${dt('multiselect.option.gap')};
}
`
);

export const classes = {
    root: 'p-multiselectextended p-component',
    headerCheckboxRoot: 'tip p-multiselectextended-headercheckboxroot',
    headerCheckboxLabel: 'tip p-multiselectextended-headercheckboxlabel',
};

export default extendStyle(BaseStyle, { name: 'multiselectextended', style: theme, classes });
