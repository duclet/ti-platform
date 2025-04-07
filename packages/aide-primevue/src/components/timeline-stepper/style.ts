import BaseStyle from '@primevue/core/base/style';
import { defineTheme, extendStyle } from '@src/utils';

const theme = defineTheme(
    ({ dt }) => `
.p-timelinestepper {}

.p-timelinestepper-content {
    margin-top: 1rem;
}
`
);

const classes = {
    root: 'p-timelinestepper p-component',
    content: 'p-timelinestepper-content',
};

export default extendStyle(BaseStyle, { name: 'timelinestepper', style: theme, classes });
