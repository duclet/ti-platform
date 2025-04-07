import BaseStyle from '@primevue/core/base/style';
import { defineTheme, extendStyle } from '@src/utils';

const theme = defineTheme(
    ({ dt }) => `
.p-multiprogressindicator {}

.p-progressbar.p-multiprogressindicator-progressbar {
    height: 0.75rem;
}

.p-multiprogressindicator-progressbar-reverse {
    transform: scale(-1, -1);
}
`
);

const classes = {
    root: 'p-multiprogressindicator p-component',
    progressBar: 'p-multiprogressindicator-progressbar',
    progressBarReverse: 'p-multiprogressindicator-progressbar p-multiprogressindicator-progressbar-reverse',
};

export default extendStyle(BaseStyle, { name: 'multiprogressindicator', style: theme, classes });
