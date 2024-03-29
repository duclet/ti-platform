<template>
    <div class="root">
        <div :class="`header ${extraHeaderClass}`">
            <slot name="header" :is-sidebar-visible="isSidebarVisible">
                <div :class="`sidebar-toggle ${extraSidebarToggleClass}`">
                    <slot name="sidebar-toggle" :is-sidebar-visible="isSidebarVisible">
                        <BarsIcon @click="isSidebarVisible = !isSidebarVisible" />
                    </slot>
                </div>
                <div :class="`header-content ${extraHeaderContentClass}`">
                    <slot name="header-content" />
                </div>
            </slot>
        </div>
        <div :class="`main ${extraMainClass}`">
            <div :class="`sidebar ${extraSidebarClass}`" :style="sidebarStyles">
                <slot name="sidebar" :menu-items="menuItems" :expanded-menu-items="expandedMenuItems">
                    <PanelMenu v-model:expanded-keys="expandedMenuItems" :model="menuItems" :style="sidebarWidth" />
                </slot>
            </div>
            <div :class="`main-content ${extraMainContentClass}`">
                <slot name="main-content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useVModel } from '@vueuse/core';
    import BarsIcon from 'primevue/icons/bars';
    import type { MenuItem } from 'primevue/menuitem';
    import { computed, ref } from 'vue';

    const props = withDefaults(
        defineProps<{
            // v-models
            isSidebarVisible: boolean;

            // Other data
            menuItems: Array<MenuItem>;

            sidebarWidth?: string;

            // Styles
            extraHeaderClass?: string;
            extraHeaderContentClass?: string;
            extraMainClass?: string;
            extraMainContentClass?: string;
            extraSidebarClass?: string;
            extraSidebarToggleClass?: string;
        }>(),
        {
            sidebarWidth: '300px',
            extraHeaderClass: '',
            extraHeaderContentClass: '',
            extraMainClass: '',
            extraMainContentClass: '',
            extraSidebarClass: '',
            extraSidebarToggleClass: '',
        }
    );

    const isSidebarVisible = useVModel(props, 'isSidebarVisible');
    const expandedMenuItems = ref(
        Object.fromEntries<boolean>(props.menuItems.map((menuItem) => [menuItem.key!, true]))
    );

    const sidebarStyles = computed(() =>
        isSidebarVisible.value
            ? {}
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
</script>

<style scoped>
    .header {
        display: flex;
        align-items: center;
    }

    .main {
        display: flex;
        align-items: stretch;
    }

    .header-content,
    .main-content {
        flex-grow: 1;
        flex-basis: 0;
    }

    .sidebar {
        overflow: hidden;
        transition-duration: 200ms;
        transition-property: all;
        transition-timing-function: ease-in;
    }
</style>
