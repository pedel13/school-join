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
    let greet = summaryGetTime();
    renderUserGreeting(greet);
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

function summaryGetTime() {
    const d = new Date();
    let hours = d.getHours();
    let greet;
    if (hours >= 0 && hours < 12) {
        greet = 'Good morning';
    } else if (hours >= 12 && hours < 18) {
        greet = 'good afternoon';
    } else {
        greet = 'Good evening';
    }
    return greet;

}

function renderTaskCounts() {
    document.getElementById('summary-toDo').innerHTML =`${countOnToDo}`;
    document.getElementById('summary-done').innerHTML =`${countOnDone}`;
    document.getElementById('summary-urgent').innerHTML =`${urgentCount}`;
    document.getElementById('summary-all-tasks').innerHTML =`${taskCount}`;
    document.getElementById('summary-taskInProgress').innerHTML =`${countOnInProgress}`;
    document.getElementById('summary-awaitFeedback').innerHTML =`${countOnAwaitFeedback}`;
}

function renderUserGreeting(greet) {
    document.getElementById('summary-time').innerHTML = `${greet}`;
    document.getElementById('summary-user').innerHTML = `${activeUserName}`;
}