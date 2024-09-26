<template>
    <Splitter>
        <SplitterPanel :size="30" class="p-4">
            <Card>
                <template #title>Configurations</template>
                <template #content>
                    <Accordion :value="['0']" multiple>
                        <AccordionPanel value="0">
                            <AccordionHeader>Actions</AccordionHeader>
                            <AccordionContent>
                                <Button label="Reload Component" @click="isComponentVisible = false" />
                            </AccordionContent>
                        </AccordionPanel>
                        <AccordionPanel value="1">
                            <AccordionHeader>Task Definitions</AccordionHeader>
                            <AccordionContent>
                                <div class="whitespace-pre">{{ JSON.stringify(rawTasks, undefined, 2) }}</div>
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </template>
            </Card>
        </SplitterPanel>
        <SplitterPanel class="p-4">
            <template v-if="isComponentVisible">
                <MultiProgressIndicator :tasks="filteredTasks" pt:pc-column-status:root:class="w-1/3" />
            </template>
        </SplitterPanel>
    </Splitter>
</template>

<script setup lang="ts">
    import type { ProgressIndicatorTask } from '@src/index';
    import { MultiProgressIndicator } from '@src/index';
    import { promiseTimeout, refAutoReset, whenever } from '@vueuse/core';
    import Accordion from 'primevue/accordion';
    import AccordionContent from 'primevue/accordioncontent';
    import AccordionHeader from 'primevue/accordionheader';
    import AccordionPanel from 'primevue/accordionpanel';
    import Button from 'primevue/button';
    import Card from 'primevue/card';
    import Splitter from 'primevue/splitter';
    import SplitterPanel from 'primevue/splitterpanel';
    import { onMounted, ref } from 'vue';

    const isComponentVisible = refAutoReset(true, 1000);

    const rawTasks: Array<ProgressIndicatorTask> = [
        {
            key: 'task1',
            description: 'Should succeed in 2 seconds',
            isInProgress: true,
        },
        {
            key: 'task2',
            description: 'Should succeed in 1 second',
            isInProgress: true,
        },
        {
            key: 'task3',
            description: 'Should succeed in 5 seconds',
            isInProgress: true,
        },
        {
            key: 'task4',
            description: 'Should fail in 2 seconds',
            isInProgress: true,
        },
        {
            key: 'task5',
            description: 'Should be added after task1 and should succeed in 2 seconds',
            isInProgress: true,
        },
    ];

    let filteredTasks = ref<Array<ProgressIndicatorTask>>([]);

    function executeTasks(tasks: Array<ProgressIndicatorTask>, toAddTask: ProgressIndicatorTask) {
        void promiseTimeout(1000).then(() => {
            tasks.filter((t) => ['task2'].includes(t.key)).forEach((t) => (t.isInProgress = false));
        });

        void promiseTimeout(2000).then(() => {
            tasks
                .filter((t) => ['task1', 'task4'].includes(t.key))
                .forEach((t) => {
                    t.isInProgress = false;

                    if (t.key === 'task1') {
                        tasks.push(toAddTask);
                        void promiseTimeout(2000).then(
                            () => (tasks.find((t) => t.key === 'task5')!.isInProgress = false)
                        );
                    }
                    if (t.key === 'task4') {
                        t.errorMessage = 'Task 4 has failed';
                    }
                });
        });

        void promiseTimeout(5000).then(() => {
            tasks.filter((t) => ['task3'].includes(t.key)).forEach((t) => (t.isInProgress = false));
        });
    }

    function initialize() {
        filteredTasks.value = rawTasks.filter((o) => o.key !== 'task5').map((o) => ({ ...o })); // Somewhat deep cloning
        executeTasks(filteredTasks.value, { ...rawTasks.find((o) => o.key === 'task5')! });
    }

    whenever(isComponentVisible, initialize);
    onMounted(initialize);
</script>
