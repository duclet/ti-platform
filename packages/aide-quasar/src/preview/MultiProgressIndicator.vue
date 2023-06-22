<template>
    <QSplitter v-model="splitterModel">
        <template #before>
            <QCardActions>
                <QBtn color="primary" label="Reload Component" @click="isComponentVisible = false" />
            </QCardActions>
            <QCardSection>
                <strong>Task Definitions:</strong><br />
                <pre>{{ JSON.stringify(rawTasks, undefined, 2) }}</pre>
            </QCardSection>
        </template>
        <template #after>
            <QCardSection v-if="isComponentVisible">
                <MultiProgressIndicatorComponent :tasks="filteredTasks" class="progress-indicators" />
            </QCardSection>
        </template>
    </QSplitter>
</template>

<script setup lang="ts">
    import { promiseTimeout, refAutoReset, whenever } from '@vueuse/core';
    import { nextTick, onMounted, ref } from 'vue';

    import { type ProgressIndicatorTask } from '../components/multi-progress-indicator';
    import { MultiProgressIndicatorComponent } from '../index';

    const splitterModel = ref(30);
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
                        void nextTick().then(() =>
                            document.querySelector('[data-row-key=task5] td:first-child')!.classList.add('flash')
                        );
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

<style scoped lang="scss">
    .progress-indicators:deep(th) {
        font-size: 1.25em;
        font-weight: bold;
    }
</style>
