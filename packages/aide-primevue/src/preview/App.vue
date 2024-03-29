<template>
    <TopbarWithSidebarLayout :is-sidebar-visible="isSidebarVisible" :menu-items="menuItems">
        <template #header-content> Header Content </template>
        <template #main-content>
            <p>Main content of page</p>
        </template>
    </TopbarWithSidebarLayout>
</template>

<script setup lang="ts">
    import { TopbarWithSidebarLayout } from '@src/index';
    import { type MenuItem } from 'primevue/menuitem';
    import { ref } from 'vue';

    const isSidebarVisible = ref(true);
    const menuItems: Array<MenuItem> = [
        { key: 'home', label: 'Home', url: '/' },
        { key: 'google', label: 'Google', url: 'https://www.google.com' },
    ];
</script>

<style>
    @import 'primevue/resources/themes/viva-light/theme.css';
    @import 'primeflex/primeflex.css';
    @import 'primeicons/primeicons.css';
</style>
