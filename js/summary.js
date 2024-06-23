let urgentCount = 0;
let taskCount = 0;

async function summaryOnLoad(){
    tasks = await loadTasks();
    for (let taskId in tasks) {
        let element = tasks[taskId];
        urgentCounting(element.priority);
        countForNoTask(element.position);
        taskCount++;
    }
    renderTaskCounts();
    taskCount=0;
    urgentCount=0;
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
}

function urgentCounting(priority) {
    if (priority == 'urgent'){
        urgentCount++;
    }
}

function renderTaskCounts() {
    document.getElementById('summary-toDo').innerHTML =`${countOnToDo}`;
    document.getElementById('summary-done').innerHTML =`${countOnDone}`;
    document.getElementById('summary-urgent').innerHTML =`${urgentCount}`;
    document.getElementById('summary-all-tasks').innerHTML =`${taskCount}`;
    document.getElementById('summary-taskInProgress').innerHTML =`${countOnInProgress}`;
    document.getElementById('summary-awaitFeedback').innerHTML =`${countOnAwaitFeedback}`;
}