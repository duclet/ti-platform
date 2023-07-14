/**
 * Given a list of tasks to execute, execute them, ensuring there is a maximum number of tasks actively running at the
 * same time. The returning array of responses should match the order of the task that was given.
 *
 * @param tasks
 *  The tasks to run.
 * @param maxNumOfWorkers
 *  The maximum number of tasks to run at once.
 * @return
 *  A promise that will resolve when all the tasks are completed.
 */
export function executeTasks<T>(tasks: ReadonlyArray<() => Promise<T>>, maxNumOfWorkers = 10): Promise<Array<T>> {
    const results: Array<T> = [];
    let numOfWorkers = 0;
    let taskIndex = 0;

    return new Promise((done) => {
        function handleResult(index: number) {
            return (result: T) => {
                results[index] = result;
                numOfWorkers--;
                getNextTask();
            };
        }

        function getNextTask() {
            if (numOfWorkers < maxNumOfWorkers && taskIndex < tasks.length) {
                void tasks[taskIndex]().then(handleResult(taskIndex));
                taskIndex++;
                numOfWorkers++;
                getNextTask();
            } else if (numOfWorkers === 0 && taskIndex === tasks.length) {
                done(results);
            }
        }

        getNextTask();
    });
}
