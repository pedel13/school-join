/**
 * Opens an overlay from a clicked task
 * @function openTaskOverlay
 */
function openTaskOverlay(taskId = "") {
    takeElementFromTask(taskId);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks[taskId];
    localStorage.activeTask = JSON.stringify(task);
    let testingSubtask = task.subtasks;
    if (typeof testingSubtask !== 'undefined' && testingSubtask) {
        subtaskLoop(taskId);
    }else {
        document.getElementById('taskOverlayCheckbox').innerHTML = 'no subtask'
    }
    let overlay = document.getElementById('taskOverlay');
    overlay.classList.remove('d-none');
    isTaskOverlayJustOpened = true;
    setTimeout(() => { isTaskOverlayJustOpened = false; }, 100);
}

/**
 * Closes the opened task overlay
 * @function closeTaskOverlay
 */
function closeTaskOverlay() {
    document.getElementById('taskOverlay').classList.add('d-none');
    renderAllTasks();
}

function takeElementFromTask(taskid) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let element = tasks[taskid];
    let categoryText = categoryFinder(element);
    renderTaskCardBig(element, categoryText, taskid);
    for (let contact in element.selectContacts) {
        let activeContactId = element.selectContacts[contact];
        let activeContact = contacts[activeContactId];
        renderContactNameInOverlay(activeContact, activeContactId)
    }
}
/**
 * Look if there is a subtask checked and if it is it will render the progress bar
 * @function subtaskLoop
 */
function subtaskLoop(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let element = tasks[taskId];
    let subtasks = element.subtasks;
    let subtaskCheckbox = element.subtask;
    let i = 0;
    subtasks.forEach(subtask => {
        if (subtaskCheckbox[i] == 'false') {
            renderSubTasks(subtask, taskId, i, '');
        } else {
            renderSubTasks(subtask, taskId, i, 'checked');
        }
        i++;
    });
}

async function changeSubtaskProvement(i, taskId = '') {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let element = tasks[taskId];
    let subtaskCheckbox = element.subtask;
    if (subtaskCheckbox[i] == 'false') {
        subtaskCheckbox[i] = 'true';
        await updateSubtaskProvement(subtaskCheckbox, `${taskId}/subtask`);
    } else {
        subtaskCheckbox[i] = 'false';
        await updateSubtaskProvement(subtaskCheckbox, `${taskId}/subtask`);
    }
}

async function updateSubtaskProvement(data = {}, path = '') {
    try {
        let response = await fetch(baseUrl + "/board/tasks/" + path + ".json", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.error("Error PUT data in database:", error);
    }
}

/**
 * Allows to edit an existing task after being saved
 * @function taskEdit
 */
async function taskEdit(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks[taskId];
    renderTaskEditor(taskId, task);
    prioButtonSelect(task.priority);
    await loadUsableContacts();
    selectContacts = [];
    for (let contact in task.selectContacts) {
        let activeContactId = task.selectContacts[contact];
        selectContact(activeContactId);
        let checkboxId = `input${activeContactId}`;
        let checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = true;
        }
    }
    renderAllCreateSubtasks(taskId);
}

/**
 * Renders the name of a clicked contact
 * @function renderContactNameInOverlay
 */
function renderContactNameInOverlay(activeContact, contactId) {
    document.getElementById("selectedContactsInOverlay").innerHTML += `
        <li class="d-flex align-items-center">
            <p class="rounded-100 fc-white board-user-icon d-flex align-items-center justify-content-center m-8 ${activeContact.contactColor}" id="${contactId}">
                ${activeContact.nameCharts[0]}${activeContact.nameCharts[1]}
            </p>
            <p>${activeContact.name}</p>
        </li>
    `;
}

/**
 * Renders the newly added subtask inside the ticket
 * @function renderContactNameInOverlay
 */
function renderSubTasks(subtask, taskId, i, checkBox = '') {
    document.getElementById('taskOverlayCheckbox').innerHTML += `
        <div class="checkBox">
            <input type="checkbox" id="ceckBox_${i}" onclick="changeSubtaskProvement(${i}, '${taskId}')" ${checkBox}>
            <span>${subtask}</span>
        </div>
    `;
}

function renderTaskCardBig(element, categoryText, taskId) {
    document.getElementById('taskOverlay').innerHTML = `
        <div id="taskOverlayWrapper" class="taskOverlayWrapper slide-right">
            <div id="taskOverlayType" class="taskOverlayType">
                <div id="issueType" class="issueType ${element.categorySelect}">
                    ${categoryText}
                </div>
                <img src="./img/icons/cancel-logo.png" onclick="closeTaskOverlay()" alt="cancel-logo">
            </div>
            
            <div class="scrollbarTaskOverlayWrapper scrollbox">
                <div  class="taskOverlayTitle">
                    ${element.title}
                </div>
        
                <div id="taskOverlayFacts" class="taskOverlayFacts">
                    <p>${element.description}</p>
                    <p>Due Date: ${element.datePicker}</p>
                    <p>Priority: ${element.priority}</p>
                </div>
        
                <div id="taskOverlayAssignee" class="taskOverlayAssignee">
                    Assigned to:
                    <ul id="selectedContactsInOverlay">
                    </ul>
                </div>
        
                <div id="taskOverlayCheckbox" class="taskOverlayCheckbox">
                    <p>Subtasks:</p>
                </div>
            </div>
            
            <div id="taskOverlayBottomEdit" class="taskOverlayBottomEdit">
                <button class="unstyled-button editBar" type="button" onclick="deleteTask(event, '${taskId}')">
                    <img src="./img/icons/delete_icon.png" alt="delete-icon">
                    <p>Delete</p>
                </button>
        
                <button class="unstyled-button editBar" type="button" onclick="taskEdit('${taskId}')">
                    <img src="./img/icons/edit_icon.png" alt="edit-icon">
                    <p>Edit</p>
                </button>
            </div>
        </div>
    `;
}

function renderTaskEditor(taskId, task) {
    document.getElementById('taskOverlay').innerHTML = /*html*/ `
        <div  class="taskOverlayWrapper slide-right">
            <div  class="taskOverlayTypeEdite d-flex">
                <img src="./img/icons/cancel-logo.png" onclick="closeTaskOverlay()" alt="cancel-logo">
            </div>
                <form class="main" onsubmit="changeTask(event,'${taskId}')">
                    <div class="addTaskWrapper scrollbarTaskOverlayWrapper scrollbox">
                        <div>
                            <div>
                                <p class="fSize-20  editTaskWrapper">Title<span class="redStar">*</span></p>
                                <input type="text" id="title" value="${task.title}" required/>
                            </div>
    
                            <div>&nbsp;</div>
    
                            <div>
                                <p class="fSize-20  editTaskWrapper">Description</p>
                                <textarea rows="5" id="description" >${task.description}</textarea>
                            </div>
    
                            
                            <div>&nbsp;</div>
                            
                            <div>
                            <p class="fSize-20  editTaskWrapper">Due Date<span class="redStar">*</span></p>
                            <input type="date" id="datePicker" value="${task.datePicker}" required>
                            </div>
                            
                            <div>&nbsp;</div>
                            
                            <div>
                                <p class="fSize-20  editTaskWrapper">Prio</p>
                                <div id="priority" class="priority d-flex">
                                    <button id="urgentButton" type="button" onclick="prioButtonSelect('urgent')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                    Urgent
                                    <div id="addTaskPrioUrgent" class="priorityImg addTaskPrioUrgent"></div>
                                        </button>
                                        <button id="mediumButton" type="button" onclick="prioButtonSelect('medium')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                            Medium
                                            <div id="addTaskPrioMedium" class="priorityImg addTaskPrioMedium"></div>
                                        </button>
                                        <button id="lowButton" type="button" onclick="prioButtonSelect('low')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                            Low
                                            <div id="addTaskPrioLow" class="priorityImg addTaskPrioLow"></div>
                                        </button>
                                </div>
                            </div>
    
                            <div>&nbsp;</div>
    
                            <div class="gap-8">
                                <p class="fSize-16 mb-8">Assigned to</p>
                                <div>
                                    <div class="selectBox" onclick="showCheckboxes()">
                                        <select id="selectInputAssignee">
                                            <option value="" disabled selected>Select contacts to assign</option>
                                        </select>
                                        <div class="overSelect"></div>
                                    </div>
                                    <div id="checkboxes" class="">
                                        <div class="d-flex flex-column w-100" id="selectContacts">
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between mt-8">
                                    <div class="fc-white d-flex gap-10" id="selectedContact">
                                    </div>
                                </div>
                            </div>
                            
                            <div>&nbsp;</div>
                            
                            <div>
                                <p class="fSize-20  editTaskWrapper">Subtasks</p>
                                <div class="addTaskEnterSubtask d-flex align-items-center justify-content-between">
                                    <input type="text" id="subtasks" placeholder="Enter Subtasks"/>
                                    <button class="d-flex" id="addTaskAddSubtaskButton" type="button" onclick="addSubtaskAddArray()">
                                    <div class="addTaskAdd"></div>
                                    </button>
                                </div>
                                <ul id="subtaskStorage"></ul>
                            </div>
                        </div>
                    </div>
    
                    <div class="editTaskBottom d-flex">
                        <div>
                            <button class="editTaskEditBottom d-flex align-items-center justify-content-center">OK <img src="./img/icons/check-icon.png"  class="createTaskButtonImg"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `;
}