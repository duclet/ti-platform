<template>
    <Splitter>
        <SplitterPanel :size="30" class="p-4">
            <Card>
                <template #title>Configurations</template>
                <template #content> TODO </template>
            </Card>
        </SplitterPanel>
        <SplitterPanel class="p-4">
            <MultiSelectExtended
                v-model="selected"
                :options="options"
                display="chip"
                option-label="label"
                option-value="value"
                toggle-all-label="Select All"
            />
        </SplitterPanel>
    </Splitter>
</template>

<script setup lang="ts">
    import { MultiSelectExtended } from '@src/index';
    import Card from 'primevue/card';
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';
    import { ref } from 'vue';

    const options = [
        { label: 'Canada', value: 'can' },
        { label: 'Mexico', value: 'mex' },
        { label: 'United States', value: 'usa' },
    ];

    const selected = ref<Array<(typeof options)[number]>>([]);
</script>
