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
    let elementAsStringify = JSON.stringify(dropCard);
    await updateTask(elementAsStringify,`/board/tasks/${cardDraggedId}`);
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
    renderAllTasks();
}

async function updateTask(task,path) {
    try {
        let response = await fetch(baseUrl + path + ".json", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: task
        }); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }  catch (error) {
        console.error("Error PUT data in database:", error);
    }
}


async function changeTask(event,taskId="") {
    event.preventDefault(event);
    let task = JSON.parse(localStorage.getItem("activeTask"));
    task["title"] = document.getElementById('title').value;
    task["description"] = document.getElementById('description').value;
    task["selectContacts"] = selectContacts;
    task["datePicker"] = document.getElementById('datePicker').value;
    task["priority"] = prio;
    if (subtasklist[0] !== 'no') {
        task["subtasks"] = subtasklist;
        task["subtask"] = subtaskProofment;
    }
    let taskAsStringify = JSON.stringify(task);
    await updateTask(taskAsStringify,`/board/tasks/${taskId}`);
    closeTaskOverlay();
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

function findeTask(value) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let filter = value.toUpperCase();
    cleanTaskboard();
    for (let taskId in tasks) {
        let element = tasks[taskId];
        let titleTest = element.title;
        let descriptionTest = element.description;
            if (titleTest.toUpperCase().indexOf(filter) > -1) {
                renderFindeTask(element, taskId, contacts);
                } else {
                    if (descriptionTest.toUpperCase().indexOf(filter) > -1) {
                        renderFindeTask(element, taskId, contacts);
                }
            }
        }
            noTasksInProgress();
}

function renderFindeTask(element, taskId, contacts) {
    let subtask = subtaskExist(element);
    let categoryText = categoryFinder(element);
    countForNoTask(element.position);
    renderTask(element, taskId, subtask, categoryText);
    for (let contact in element.selectContacts) {
        let activeContactId = element.selectContacts[contact];
        let activeContact = contacts[activeContactId];
        renderAktiveContakts(activeContact, activeContactId, taskId);
        }
        subtaskCount = 0;
    
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

async function loadTasks(path="") {
    let response = await fetch(baseUrl + path + ".json");
    return await response.json();
}

function cleanTaskboard() {
    document.getElementById("board-task-on-to-do").innerHTML = '';
    document.getElementById("board-task-on-in-progress").innerHTML = '';
    document.getElementById("board-task-on-await-feedback").innerHTML = '';
    document.getElementById("board-task-on-done").innerHTML = '';
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
}

async function renderAllTasks() {
    let tasks = await loadTasks("/board/tasks");
    localStorage.tasks = JSON.stringify(tasks);
    let contacts =  await loadTasks("/contacts");
    localStorage.usableContacts = JSON.stringify(contacts);
    cleanTaskboard();
    for (let taskId in tasks) {
        let element = tasks[taskId];
        let subtask = subtaskExist(element);
        let categoryText = categoryFinder(element);
        countForNoTask(element.position);
        renderTask(element, taskId, subtask, categoryText);
        for (let contact in element.selectContacts) {
            let activeContactId = element.selectContacts[contact];
            let activeContact = contacts[activeContactId];
                renderAktiveContakts(activeContact, activeContactId, taskId);
        }
        subtaskCount = 0;
    }
    noTasksInProgress();
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
    if (task.categorySelect == "technical-task") {
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

async function deleteTask(event, taskId) {
    event.preventDefault(event);
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

function renderAktiveContakts(activeContact, contactId, taskId) {
    document.getElementById("selectContent"+taskId).innerHTML += `
    <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center ${activeContact.contactColor} -m-8" id="${contactId}">${activeContact.nameCharts[0]}${activeContact.nameCharts[1]}</p>
    `
}

function renderTask(task, taskId, subtask, categoryText) {
    document.getElementById(task.position).innerHTML += `
        <div id="${taskId}" onclick="openTaskOverlay('${taskId}')" ondragstart="drag('${taskId}')" draggable="true" class="d-flex board-task-card flex-column">
            <div class="d-flex align-items-center">
                <p class="fc-white rounded-8 board-user d-flex align-items-center ${task.categorySelect}" id="categoryTitle">${categoryText}</p>
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
                <div class="fc-white d-flex" id="selectContent${taskId}">
                </div>
                <div class="board-icon-importance board-icon-${task.priority}-prio">
                </div>
            </div>
        </div>
    `;
}

