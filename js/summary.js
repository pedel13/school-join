let urgentCount = 0;
let taskCount = 0;

/**
 * Initially loads all tasks in the summary view
 * @function summaryOnload
 */
async function summaryOnLoad(){
    let tasks = await loadTasks("/board/tasks");
    localStorage.tasks = JSON.stringify(tasks);
    for (let taskId in tasks) {
        let element = tasks[taskId];
        urgentCounting(element.priority);
        countForNoTask(element.position);
        taskCount++;
    }
    renderTaskCounts();
    let activeUserName = localStorage.getItem("activeUserName");
    let greet = summaryGetTime();
    renderUserGreeting(greet, activeUserName);
    setCountToZero();
}

/**
 * resets the counters for the tasks
 */
function setCountToZero() {
    taskCount=0;
    urgentCount=0;
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
}

/**
 * Initially loads all tasks which has the priority
 * @function urgentCounting
 */
function urgentCounting(priority) {
    if (priority == 'urgent'){
        urgentCount++;
    }
}

/**
 * Check the time to set the proper greeting for the user
 * @function summaryGetTime
 */
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

/**
 * Renders the user greeting
 * @function summaryOnload
 */
function renderUserGreeting(greet, activeUserName) {
    document.getElementById('summary-time').innerHTML = `${greet}`;
    document.getElementById('summary-user').innerHTML = `${activeUserName}`;
}

/**
 * Renders all existing tasks on the summary site for each category
 * @function renderTaskCounts
 */
function renderTaskCounts() {
    document.getElementById('summary-toDo').innerHTML =`${countOnToDo}`;
    document.getElementById('summary-done').innerHTML =`${countOnDone}`;
    document.getElementById('summary-urgent').innerHTML =`${urgentCount}`;
    document.getElementById('summary-all-tasks').innerHTML =`${taskCount}`;
    document.getElementById('summary-taskInProgress').innerHTML =`${countOnInProgress}`;
    document.getElementById('summary-awaitFeedback').innerHTML =`${countOnAwaitFeedback}`;
}