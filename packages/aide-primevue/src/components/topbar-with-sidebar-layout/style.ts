import BaseStyle from '@primevue/core/base/style';
import { defineTheme, extendStyle } from '@src/utils';

const theme = defineTheme(
    ({ dt }) => `
.p-topbarwithsidebarlayout {}

.p-topbarwithsidebarlayout-header {
    display: flex;
    align-items: center;
}

.p-topbarwithsidebarlayout-sidebar-toggle {
    cursor: pointer;
    flex: none;
}

.p-topbarwithsidebarlayout-main {
    display: flex;
    align-items: stretch;
}

.p-topbarwithsidebarlayout-header-content,
.p-topbarwithsidebarlayout-main-content {
    flex-grow: 1;
    flex-basis: 0;
}

.p-topbarwithsidebarlayout-header-content {
    padding-left: 1rem;
}

.p-topbarwithsidebarlayout-sidebar {
    overflow: hidden;
    transition-duration: ${dt('transition.duration')};
    transition-property: all;
    transition-timing-function: ease-in;
}
`
);

const classes = {
    root: 'p-topbarwithsidebarlayout p-component',
    header: 'p-topbarwithsidebarlayout-header',
    main: 'p-topbarwithsidebarlayout-main',
    headerContent: 'p-topbarwithsidebarlayout-header-content',
    mainContent: 'p-topbarwithsidebarlayout-main-content',
    sidebar: 'p-topbarwithsidebarlayout-sidebar',
    sidebarToggle: 'p-topbarwithsidebarlayout-sidebar-toggle',
};

export default extendStyle(BaseStyle, { name: 'topbarwithsidebarlayout', style: theme, classes });
