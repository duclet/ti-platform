<template>
    <div :class="cx('root')" v-bind="ptmi('root')">
        <div :class="cx('header')" v-bind="ptm('header')" :style="{ height: headerHeight }">
            <!--
            @slot Slot for the header row. The default content is for it to be 2 columns, with the left column containing the icon for toggling the visibility of the sidebar and the right column for any other content to be showed on the header row.
            @binding {boolean} is-sidebar-visible True if the sidebar should be visible, false otherwise.
            -->
            <slot name="header" :is-sidebar-visible="isSidebarVisible">
                <div :class="cx('sidebar-toggle')" v-bind="ptm('sidebar-toggle')">
                    <!--
                    @slot Slot for displaying the icon to toggle the visibility of the sidebar.
                    @binding {boolean} is-sidebar-visible True if the sidebar should be visible, false otherwise.
                    -->
                    <slot name="sidebar-toggle" :is-sidebar-visible="isSidebarVisible">
                        <span
                            :class="PrimeIcons.BARS"
                            v-bind="ptm('sidebar-toggle-icon')"
                            @click="toggleSidebarVisibility"
                        />
                    </slot>
                </div>
                <div :class="cx('header-content')" v-bind="ptm('header-content')">
                    <!-- @slot Slot for displaying any other content on the header row. -->
                    <slot name="header-content" />
                </div>
            </slot>
        </div>
        <div :class="cx('main')" v-bind="ptm('main')" :style="{ minHeight: `calc(100vh - ${headerHeight})` }">
            <div :class="cx('sidebar')" v-bind="ptm('sidebar')" :style="sidebarStyles">
                <!--
                @slot Slot for displaying the sidebar. Defaults to a PanelMenu.
                @binding {Array<MenuItem>} menu-items The items in the menu as given via the prop.
                @binding {Record<string, boolean>} expanded-menu-items Map of the menu item's key with whether or not it should be expanded or not.
                -->
                <slot name="sidebar" :menu-items="menuItems" :expanded-menu-items="expandedMenuItems">
                    <PanelMenu
                        v-model:expanded-keys="expandedMenuItems"
                        :model="menuItems"
                        v-bind="ptm('pc-main-menu')"
                    />
                </slot>
            </div>
            <div :class="cx('main-content')" v-bind="ptm('main-content')">
                <!-- @slot Slot for the main content of the page. -->
                <slot name="main-content"></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import BaseTopbarWithSidebarLayout from '@src/components/topbar-with-sidebar-layout/BaseTopbarWithSidebarLayout.vue';

    /*@component
    A component for rendering a layout which have a header row, a collapsible sidebar, and an area for some content.

    In following with PrimeVue's passthrough functionality, the following are available:
    - **root**: The root DOM element encapsulating the entire component.
    - **header**: The encapsulating DOM element for the header row.
    - **sidebar-toggle**: The encapsulating DOM element the icon that toggles the visibility of the sidebar.
    - **sidebar-toggle-icon**: The DOM element for the sidebar toggle icon.
    - **header-content**: The encapsulating DOM element for the content of the header row to the right of the sidebar
        toggle.
    - **main**: The encapsulating DOM element for the rest of the page.
    - **sidebar**: The encapsulating DOM element for the sidebar.
    - **pc-main-menu**: The PanelMenu in the sidebar.
    - **main-content**: The encapsulating DOM element for the main content.
    */
    export default {
        name: 'TopbarWithSidebarLayout',
        extends: BaseTopbarWithSidebarLayout,
        inheritAttrs: false,
    };
</script>

<script setup lang="ts">
    import { PrimeIcons } from '@primevue/core';
    import { exposePrimeVueHelpers } from '@src/utils';
    import { toMap } from '@ti-platform/aide';
    import { useVModel } from '@vueuse/core';
    import type { MenuItem } from 'primevue/menuitem';
    import PanelMenu from 'primevue/panelmenu';
    import { computed, onMounted, ref } from 'vue';

    const { cx, ptm, ptmi } = exposePrimeVueHelpers();

    const props = withDefaults(
        defineProps<{
            // v-models
            /**
             * True if the sidebar is visible, false otherwise.
             */
            isSidebarVisible: boolean;

            // Other data

            /**
             * The list of menu items.
             */
            menuItems: Array<MenuItem>;

            /**
             * True if the initial state should be to expand all items, otherwise you can provide a list of the keys
             * that should be automatically expanded.
             */
            expandedMenuKeys?: Array<string> | true;

            /**
             * The height for the header row.
             */
            headerHeight?: string;

            /**
             * The width of the sidebar.
             */
            sidebarWidth?: string;
        }>(),
        {
            expandedMenuKeys: true,
            headerHeight: '3rem',
            sidebarWidth: '300px',
        }
    );

    const isSidebarVisible = useVModel(props, 'isSidebarVisible');

    const expandedMenuItems = ref<Record<string, boolean> | undefined>();

    function expandAll(items: Array<MenuItem>, current: Record<string, boolean> = {}): Record<string, boolean> {
        items.forEach((item) => {
            current[item.key!] = true;
            if (item.items) {
                expandAll(item.items, current);
            }
        });

        return current;
    }

    function toggleSidebarVisibility() {
        isSidebarVisible.value = !isSidebarVisible.value;
    }

    const sidebarStyles = computed(() =>
        isSidebarVisible.value
            ? { width: props.sidebarWidth }
            : {
                  borderLeft: 0,
                  borderRight: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  width: 0,
              }
    );

    onMounted(() => {
        if (props.expandedMenuKeys === true) {
            expandedMenuItems.value = expandAll(props.menuItems);
        } else if (Array.isArray(props.expandedMenuKeys) && props.expandedMenuKeys.length) {
            expandedMenuItems.value = toMap(
                props.expandedMenuKeys,
                (k) => k,
                (k) => true
            );
        }
    });
</script>
