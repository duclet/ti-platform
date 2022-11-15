<template>
    <QTable :columns="columns" :rows="rows" :rows-per-page-options="[0]" hide-pagination>
        <template #body-cell-status="scope">
            <QTd v-if="asTask(scope).isInProgress">
                <!--
                @slot Slot to display the progress indicator for a specific task.
                    @binding {Task} task The task this is rendering for.
                -->
                <slot :name="`${asTask(scope).key}--in-progress`" :task="asTask(scope)">
                    <!--
                    @slot Default slot for displaying the progress indicator for all the tasks.
                        @binding {Task} task The task this is rendering for.
                    -->
                    <slot name="in-progress" :task="asTask(scope)">
                        <QLinearProgress color="positive" indeterminate />
                        <QLinearProgress color="negative" query />
                    </slot>
                </slot>
            </QTd>
            <QTd v-else-if="!!asTask(scope).errorMessage">
                <!--
                @slot Slot to display the error message, assuming there was an error, for a specific task.
                    @binding {Task} task The task this is rendering for.
                -->
                <slot :name="`${asTask(scope).key}--error-message`" :task="asTask(scope)">
                    <!--
                    @slot Slot to display the error message, assuming there was an error, for all the tasks.
                        @binding {Task} task The task this is rendering for.
                    -->
                    <slot name="error-message" :task="asTask(scope)">
                        <QBanner color="negative">{{ asTask(scope).errorMessage }}</QBanner>
                    </slot>
                </slot>
            </QTd>
            <QTd v-else>
                <!--
                @slot Slot to display when the task completes successfully for a specific task.
                    @binding {Task} task The task this is rendering for.
                -->
                <slot :name="`${asTask(scope).key}--success`" :task="asTask(scope)">
                    <!--
                    @slot Slot to display when the task completes successfully for all the tasks.
                        @binding {Task} task The task this is rendering for.
                    -->
                    <slot name="success" :task="asTask(scope)">
                        <QBtn color="positive" icon="done_all" label="Completed" />
                    </slot>
                </slot>
            </QTd>
        </template>
    </QTable>
</template>

<script setup lang="ts">
    /*@component
    This component display a progress indicator for each of the given task while it is executing and when it is
    completed, either show the error message if there are any or show the success message if it was successful.
    */
    import { whenever } from '@vueuse/core';
    import { QBanner, QBtn, QLinearProgress, QTable, QTableProps, QTd } from 'quasar';
    import { computed } from 'vue';

    import { ProgressIndicatorTask } from './api';

    const props = defineProps<{
        /**
         * The list of ProgressIndicatorTask we are showing the progress indicators for.
         */
        tasks: Array<ProgressIndicatorTask>;
    }>();

    const emit = defineEmits<{
        /**
         * Triggered when all tasks are completed.
         *
         * @event complete
         * @property {Array<string>} success An array with the key of the tasks that completed without errors.
         * @property {Array<string>} failure An array with the key of the tasks that completed with errors.
         */
        (event: 'complete', success: Array<string>, failure: Array<string>): void;
    }>();

    const columns: QTableProps['columns'] = [
        {
            name: 'description',
            label: 'Task',
            field: 'description',
            align: 'left',
        },
        {
            name: 'status',
            label: 'Status',
            field: 'status',
            align: 'left',
        },
    ];

    const rows = computed(() => props.tasks);
    const isAllCompleted = computed(() => props.tasks.every((task) => !task.isInProgress));

    function asTask(scope: unknown) {
        return (scope as { row: ProgressIndicatorTask }).row;
    }

    whenever(isAllCompleted, () =>
        emit(
            'complete',
            props.tasks.filter((task) => task.errorMessage === undefined).map((task) => task.key),
            props.tasks.filter((task) => task.errorMessage !== undefined).map((task) => task.key)
        )
    );
</script>

<style scoped lang="scss"></style>
