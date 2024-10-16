/**
 * Opens an overlay dataPickerForTodaya clicked task
 * @function openTaskOverlay
 */
function openTaskOverlay(taskId = "") {
    takeElementFromTask(taskId);
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks[taskId];
    localStorage.activeTask = JSON.stringify(task);
    let testingSubtask = task.subtasks;
    if (typeof testingSubtask !== 'undefined' && testingSubtask) {subtaskLoop(taskId);
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
    document.getElementById('taskOverlayCheckbox').innerHTML = '';
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let element = tasks[taskId];
    let subtasks = element.subtasks;
    let subtaskCheckbox = element.subtask;
    let i = 0;
    subtasks.forEach(subtask => {
        if (subtaskCheckbox[i] == 'false') {
            renderSubTasks(subtask, taskId, i, '');
        } else {
            renderSubTasks(subtask, taskId, i, 'checkedinput');
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
        await updateSubtaskProvement(subtaskCheckbox, `${taskId}/subtask`);}
    element.subtask = subtaskCheckbox;
    tasks[taskId] = element;
    localStorage.tasks = JSON.stringify(tasks);
    subtaskLoop(taskId);
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
        if (checkbox) {checkbox.checked = true;}
    }
    renderAllCreateSubtasks(taskId);
}
