/**
 * Information for a task to show in the MultiProgressIndicator component.
 */
export type ProgressIndicatorTask = {
    /**
     * Unique identifier for the task.
     */
    key: string;

    /**
     * A description for what progress we are waiting for.
     */
    description: string;

    /**
     * True to show a progress bar, indicating that it is in progress or false other.
     */
    isInProgress: boolean;

    /**
     * When no longer in progress, error message to show. If value is null, it assumes that task was completed
     * successfully.
     */
    errorMessage?: string;
};
