<template>
    <div :class="cx('root')" v-bind="ptmi('root')">
        <DataTable :value="dataTableValue" :pt="ptm('pc-table')">
            <Column field="task" header="Task" :pt="ptm('pc-column-task')">
                <template #body="{ data }: { data: ProgressIndicatorTask }">
                    <!--
                   @slot Slot to display the description for a specific task.
                   @binding {ProgressIndicatorTask} task The task this is rendering for.
                   -->
                    <slot :name="`${data.key}--description`" :task="data">
                        <!--
                        @slot Default slot for displaying the description for all the tasks.
                        @binding {ProgressIndicatorTask} task The task this is rendering for.
                        -->
                        <slot name="description" :task="data">
                            {{ data.description }}
                        </slot>
                    </slot>
                </template>
            </Column>
            <Column field="status" header="Status" :pt="ptm('pc-column-status')">
                <template #body="{ data }: { data: ProgressIndicatorTask }">
                    <template v-if="data.isInProgress">
                        <!--
                        @slot Slot to display the progress indicator for a specific task.
                        @binding {ProgressIndicatorTask} task The task this is rendering for.
                        -->
                        <slot :name="`${data.key}--in-progress`" :task="data">
                            <!--
                            @slot Default slot for displaying the progress indicator for all the tasks.
                            @binding {ProgressIndicatorTask} task The task this is rendering for.
                            -->
                            <slot name="in-progress" :task="data">
                                <ProgressBar
                                    mode="indeterminate"
                                    :class="cx('progress-bar')"
                                    v-bind="ptm('pc-progress-bar-top')"
                                />
                                <ProgressBar
                                    mode="indeterminate"
                                    :class="cx('progress-bar-reverse')"
                                    v-bind="ptm('pc-progress-bar-bottom')"
                                />
                            </slot>
                        </slot>
                    </template>
                    <template v-else-if="!!data.errorMessage">
                        <!--
                        @slot Slot to display the error message, assuming there was an error, for a specific task.
                        @binding {ProgressIndicatorTask} task The task this is rendering for.
                        -->
                        <slot :name="`${data.key}--error-message`" :task="data">
                            <!--
                            @slot Slot to display the error message, assuming there was an error, for all the tasks.
                            @binding {ProgressIndicatorTask} task The task this is rendering for.
                            -->
                            <slot name="error-message" :task="data">
                                <Message
                                    :icon="PrimeIcons.EXCLAMATION_TRIANGLE"
                                    :severity="getSeverityForMessage(ColorOption.ERROR)"
                                    v-bind="ptm('pc-default-error-message')"
                                >
                                    {{ data.errorMessage }}
                                </Message>
                            </slot>
                        </slot>
                    </template>
                    <template v-else>
                        <!--
                        @slot Slot to display when the task completes successfully for a specific task.
                        @binding {ProgressIndicatorTask} task The task this is rendering for.
                        -->
                        <slot :name="`${data.key}--success`" :task="data">
                            <!--
                            @slot Slot to display when the task completes successfully for all the tasks.
                            @binding {ProgressIndicatorTask} task The task this is rendering for.
                            -->
                            <slot name="success" :task="data">
                                <Message
                                    :icon="PrimeIcons.CHECK"
                                    :severity="getSeverityForMessage(ColorOption.SUCCESS)"
                                    v-bind="ptm('pc-default-success-message')"
                                >
                                    Completed
                                </Message>
                            </slot>
                        </slot>
                    </template>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script lang="ts">
    import BaseMultiProgressIndicator from '@src/components/multi-progress-indicator/BaseMultiProgressIndicator.vue';

    export default {
        name: 'MultiProgressIndicator',
        extends: BaseMultiProgressIndicator,
        inheritAttrs: false,
    };
</script>

<script setup lang="ts">
    /*@component
    This component displays a progress indicator for each specified task during its execution, and will either display
    an error message if any errors occur, or a success message if the task is completed successfully.

    In following with PrimeVue's passthrough functionality, the following are available:
    - **root**: The DOM element encapsulating the whole component.
    - **pc-table**: The DataTable component used to render the list of progress.
    - **pc-column-task**: The Column component for the name of the task.
    - **pc-column-status**: The Column component for the current status of the task.
    - **pc-progress-bar-top**: The top ProgressBar component.
    - **pc-progress-bar-reverse**: The bottom ProgressBar component.
    - **pc-default-error-message**: The Message component for displaying the default error message.
    - **pc-default-success-message**: The Message component for displaying the default success message.
    */
    import { PrimeIcons } from '@primevue/core';
    import type { ProgressIndicatorTask } from '@src/components/multi-progress-indicator/api';
    import { ColorOption, exposePrimeVueHelpers, getSeverityForMessage } from '@src/utils';
    import { whenever } from '@vueuse/core';
    import Column from 'primevue/column';
    import DataTable from 'primevue/datatable';
    import Message from 'primevue/message';
    import ProgressBar from 'primevue/progressbar';
    import { computed } from 'vue';

    const { cx, ptm, ptmi } = exposePrimeVueHelpers();

    const props = defineProps<{
        /**
         * The list of {@link ProgressIndicatorTask} we are showing the progress indicators for.
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

    const dataTableValue = computed(() => props.tasks);
    const isAllCompleted = computed(() => props.tasks.every((task) => !task.isInProgress));

    whenever(isAllCompleted, () =>
        emit(
            'complete',
            props.tasks.filter((task) => task.errorMessage === undefined).map((task) => task.key),
            props.tasks.filter((task) => task.errorMessage !== undefined).map((task) => task.key)
        )
    );
</script>
