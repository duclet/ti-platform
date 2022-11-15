/**
 * Information for a task to show in the MultiProgressIndicator component.
 *
 * @property key
 *  Unique identifier for the task.
 * @property description
 *  A description for what progress we are waiting for.
 * @property isInProgress
 *  True to show a progress bar, indicating that it is in progress or false other.
 * @property errorMessage
 *  When no longer in progress, error message to show. If value is null, it assumes that task was completed
 *  successfully.
 */
export type ProgressIndicatorTask = {
    key: string;
    description: string;
    isInProgress: boolean;
    errorMessage?: string;
};
