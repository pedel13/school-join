let cardDraggedId;
let countOnToDo = 0;
let countOnInProgress = 0;
let countOnAwaitFeedback = 0;
let countOnDone = 0;
let subtaskCount = 0;
let subtaskCountInProzent = 0;
let subtaskCountProvement = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(id) {
    cardDraggedId = id;
}

async function drop(dropPosition) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let dropCard = tasks[cardDraggedId];
    reduceDroppedElement(dropCard["position"]);
    dropCard["position"] = dropPosition;
    localStorage.activeTask = JSON.stringify(dropCard);
    localStorage.setItem("taskId", `${cardDraggedId}`);
    await updateTask();
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
    renderAllTasks();
}

async function updateTask() {
    task = JSON.parse(localStorage.getItem("activeTask"));
    taskId = localStorage.getItem("taskId");
    console.log(localStorage);
    try {
        await fetch(baseUrl + "/board/tasks/" + taskId + ".json", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }); 
    }  catch (error) {
        console.log(response);
        console.error("Error PUT data in database:", error);
    }

}


async function changeTask(taskId='') {
    let task = JSON.parse(localStorage.getItem("activeTask"));
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let selectInputAssignee = document.getElementById('selectInputAssignee').value;
    let datePicker = document.getElementById('datePicker').value;
    task["title"] = title;
    task["description"] = description;
    task["selectInputAssignee"] = selectInputAssignee;
    task["datePicker"] = datePicker;
    task["priority"] = prio;
    task["subtasks"] = subtasklist;
    task["subtask"] = subtaskProofment;
    localStorage.activeTask = JSON.stringify(task);
    localStorage.setItem("taskId", `${taskId}`);
    await updateTask();
}


function removeDraggedCard() {
    const element = document.getElementById(cardDraggedId);
    element.remove();
}

function reduceDroppedElement(elementPosition) {
    switch (elementPosition) {
        case "board-task-on-to-do":
            countOnToDo--;
            break;

        case "board-task-on-in-progress":
            countOnInProgress--;
            break;

        case "board-task-on-await-feedback":
            countOnAwaitFeedback--;
            break;

        case "board-task-on-done":
            countOnDone--;
            break;
    }

}

function noTasksInProgress() {
    if (countOnToDo != 0) {
        addNoTaskInProgress("no-tasks-to-do");
    }

    else {
        removeNoTaskInProgress("no-tasks-to-do");
    }

    if (countOnInProgress != 0) {
        addNoTaskInProgress("no-tasks-in-progress");
    }
    else {
        removeNoTaskInProgress("no-tasks-in-progress");
    }

    if (countOnAwaitFeedback != 0) {
        addNoTaskInProgress("no-tasks-await-feedback");
    }
    else {
        removeNoTaskInProgress("no-tasks-await-feedback");
    }

    if (countOnDone != 0) {
        addNoTaskInProgress("no-tasks-Done");
    }
    else {
        removeNoTaskInProgress("no-tasks-Done");
    }
}

function addNoTaskInProgress(taskInProgress = "") {
    let element = document.getElementById(taskInProgress);
    element.classList.add("d-none");
}

function removeNoTaskInProgress(taskInProgress = "") {
    let element = document.getElementById(taskInProgress);
    element.classList.remove("d-none");
}

async function loadTasks() {
    let response = await fetch(baseUrl + "/board/tasks" + ".json");
    return await response.json();
}

function cleanTaskboard() {
    document.getElementById("board-task-on-to-do").innerHTML = '';
    document.getElementById("board-task-on-in-progress").innerHTML = '';
    document.getElementById("board-task-on-await-feedback").innerHTML = '';
    document.getElementById("board-task-on-done").innerHTML = '';
}

async function renderAllTasks() {
    let tasks = await loadTasks();
    localStorage.tasks = JSON.stringify(tasks);
    cleanTaskboard();
    for (let taskId in tasks) {
        let element = tasks[taskId];
        let subtask = subtaskExist(element);
        let categoryText = categoryFinder(element);
        countForNoTask(element.position);
        renderTask(element, taskId, subtask, categoryText);
        subtaskCount = 0;
    }
    noTasksInProgress()
}

function subtaskExist(task) {
    let subtask = " ";
    if (task.subtasks == "no") {
        subtask = "d-none";
    }
    else {
        subtaskCounter(task);
    }
    return subtask;
}

function subtaskCounter(task) {
    let subtask = task.subtasks;
    subtaskProofments = task.subtask;
    subtaskCount = 0;
    let i = 0;
    subtaskCountProvement = 0;
    for (const element of subtask) {
        if (subtaskProofments[i] == 'true') {
            subtaskCountProvement++;
        }
        i++;
        subtaskCount++;

    }
    subtaskCountInProzent = 100 / subtaskCount * subtaskCountProvement;

}

function categoryFinder(task) {
    let categoryText = "";
    if (task.categorySelect === "technical-task") {
        categoryText = "Technical Task";
    } else {
        categoryText = "User Story";
    }
    return categoryText;
}

function countForNoTask(positionFromCard) {
    switch (positionFromCard) {
        case "board-task-on-to-do":
            countOnToDo++;
            break;

        case "board-task-on-in-progress":
            countOnInProgress++;
            break;

        case "board-task-on-await-feedback":
            countOnAwaitFeedback++;
            break;

        case "board-task-on-done":
            countOnDone++;
            break;
    }
}

async function deleteTask(taskId) {
    try {
    let response = await fetch(baseUrl + "/board/tasks/" + taskId + ".json", {
        method: 'DELETE',
    });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error delete data in database:", error);
    }
    closeTaskOverlay();
}

function renderTask(task, taskId, subtask, categoryText) {
    document.getElementById(task.position).innerHTML += `
        <div id="${taskId}" onclick="openTaskOverlay('${taskId}')" ondragstart="drag('${taskId}')" draggable="true" class="d-flex board-task-card flex-column">
            <div class="d-flex align-items-center">
                <p class="fc-white rounded-8 board-user d-flex align-items-center ${task.categorySelect}" id="">${categoryText}</p>
            </div>
            <div>
                <p class="board-card-subtitle" id="">${task.title}</p>
            </div>
            <div>
                <p class="board-description" id="">${task.description}</p>
            </div>
            <div class="d-flex align-items-center gap-10 ${subtask}" id="board-done-progressbar">
                <div class="board-progressbar-full rounded-8">
                    <div class="board-progressbar rounded-8" style="width: ${subtaskCountInProzent}%;">
                    </div>
                </div>
                <div class="d-flex board-subtasks gap-4">
                  <p> ${subtaskCountProvement}/${subtaskCount}</p>
                  <p>Subtasks</p>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="fc-white d-flex">
                    <!-- TODO: Farbklasse dynamisch gestalten -->
                    <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-orange -m-8">PW</p>
                    <!-- TODO: user-icons printer funktion -->
                    <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-red -m-8">FF</p>
                </div>
                <div class="board-icon-importance board-icon-${task.priority}-prio">
                </div>
            </div>
        </div>
    `;
}

