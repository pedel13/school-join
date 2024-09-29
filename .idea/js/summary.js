let urgentCount = 0;
let taskCount = 0;
let earliestTask = null;
let earliestDate = null;

async function summaryOnLoad(){
    let tasks = await loadTasks("/board/tasks");
    localStorage.tasks = JSON.stringify(tasks);
    taskCountAndDataFinde(tasks);
    renderTaskCounts();
    let activeUserName = localStorage.getItem("activeUserName");
    let greet = summaryGetTime();
    renderUserGreeting(greet, activeUserName);
    clearCounter();
}

function clearCounter() {
    taskCount=0;
    urgentCount=0;
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
}

function taskCountAndDataFinde(tasks) {
    earliestDate = null;
    for (let taskId in tasks) {
        let element = tasks[taskId];
        urgentCounting(element.priority);
        countForNoTask(element.position);
        checkDate(element.datePicker);
        taskCount++;
    }
    earliestDate = earliestDate.toJSON().slice(0,10);
}

function checkDate(datePicker) {
    let taskDate = new Date(datePicker);
    if (earliestDate === null || taskDate < earliestDate) {
        earliestDate = taskDate; 
    }
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
    document.getElementById('upComingDeatline').innerHTML =`${earliestDate}`;
}

function renderUserGreeting(greet, activeUserName) {
    document.getElementById('summary-time').innerHTML = `${greet}`;
    document.getElementById('summary-user').innerHTML = `${activeUserName}`;
}