<template>
    <TopbarWithSidebarLayout
        v-model:is-sidebar-visible="isSidebarVisible"
        :menu-items="menuItems"
        pt:header:class="z-10 drop-shadow-md py-1 px-4 bg-primary text-white"
        pt:sidebar-toggle:class="text-white"
        pt:sidebar:class="bg-surface-50 drop-shadow-md p-4"
        pt:main-content:class="p-4"
        expanded-menu-keys
    >
        <template #header-content>Components Preview</template>
        <template #main-content>
            <RouterView />
        </template>
    </TopbarWithSidebarLayout>
</template>

<script setup lang="ts">
    import { TopbarWithSidebarLayout } from '@src/index';
    import type { MenuItem } from 'primevue/menuitem';
    import { ref } from 'vue';
    import { RouterView, useRouter } from 'vue-router';

    const router = useRouter();

    const isSidebarVisible = ref(true);
    const menuItems: Array<MenuItem> = [
        { key: 'home', label: 'Home', url: '/' },
        {
            key: 'components',
            label: 'Components',
            items: [
                {
                    key: 'multi-progress-indicator',
                    label: 'Multi Progress Indicator',
                },
                {
                    key: 'timeline-stepper',
                    label: 'Timeline Stepper',
                },
                {
                    key: 'wizard-stepper',
                    label: 'Wizard Stepper',
                },
            ].map((item) => ({
                ...item,
                command: (event) => void router.push(`/${event.item.key!}`),
            })),
        },
        {
            key: 'external',
            label: 'External Sites',
            items: [
                {
                    key: 'primevue',
                    label: 'PrimeVue',
                    url: 'https://primevue.org',
                    target: '_blank',
                },
                { key: 'tailwindcss', label: 'Tailwind CSS', url: 'https://tailwindcss.com', target: '_blank' },
            ],
        },
    ];
</script>

<style lang="postcss">
    @import 'primeicons/primeicons.css';

    @layer tailwind-base, primevue, tailwind-utilities;

    @layer tailwind-base {
        @tailwind base;
    }

    @layer tailwind-utilities {
        @tailwind components;
        @tailwind utilities;
    }
</style>
