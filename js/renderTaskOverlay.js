function renderTaskOverlay() {

}

function openTaskOverlay(taskId = "") {
    takeElementFromTask(taskId);
    let task = tasks[taskId];
    if (task.subtasks == 'no') {
        document.getElementById('taskOverlayCheckbox').innerHTML = 'no subtask'
    }
    else {
        subtaskLoop(taskId);
    }
    document.getElementById('taskOverlay').classList.remove('d-none');
}

function closeTaskOverlay() {
    document.getElementById('taskOverlay').classList.add('d-none');
    renderAllTasks();
}

function takeElementFromTask(taskid) {
    let element = tasks[taskid];
    let categoryText = categoryFinder(element);
    renderTaskCardBig(element, categoryText, taskid);
}

function subtaskLoop(taskId) {
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

async function changeSuptaskPrufment(i, taskId = '') {
    let element = tasks[taskId];
    let subtaskCheckbox = element.subtask;
    if (subtaskCheckbox[i] == 'false') {
        subtaskCheckbox[i] = 'true';
        await updateSubtaskPrufment(subtaskCheckbox, `${taskId}/subtask`);
    } else {
        subtaskCheckbox[i] = 'false';
        await updateSubtaskPrufment(subtaskCheckbox, `${taskId}/subtask`);
    }
}

async function updateSubtaskPrufment(data = {}, path = '') {
    let response = await fetch(baseUrl + "/board/tasks/" + path + ".json", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function taskEdit(taskId) {
    let task = tasks[taskId];
    renderTaskEditor(taskId, task);
    renderAllCreateSubtasks(taskId);
}

async function changeTask(taskId='', taskposition='') {
    await changesInputs(taskposition, taskId);
}

async function changesInputs(position, taskId) {
    let task = tasks[taskId];
    // let categorySelect = task.categorySelect;
    let inputs = {
        "position": position,
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value,
        "selectInputAssignee": document.getElementById('selectInputAssignee').value,
        "datePicker": document.getElementById('datePicker').value,
        "priority": prio,
        "categorySelect": task.categorySelect,
        "subtasks": subtasklist,
        "subtask": subtaskProofment
    };
    console.log(inputs);
    console.log(task.categorySelect);
    /*await putTaskDataInDatabase(`/board/tasks/${taskId}/title`, document.getElementById('title').value);
    await putTaskDataInDatabase(`/board/tasks/${taskId}/description`, document.getElementById('description').value);
    await putTaskDataInDatabase(`/board/tasks/${taskId}/selectInputAssignee`, document.getElementById('selectInputAssignee').value);
    await putTaskDataInDatabase(`/board/tasks/${taskId}/datePicker`, document.getElementById('datePicker').value);
    await putTaskDataInDatabase(`/board/tasks/${taskId}/priority`, prio);
    await putTaskDataInDatabase(`/board/tasks/${taskId}/subtasks`, subtasklist);
    await putTaskDataInDatabase(`/board/tasks/${taskId}/subtask`, subtaskProofment);*/
    await updateSubtaskPrufment(inputs,`${taskId}`);
    clearAddTask();

}

async function putTaskDataInDatabase(path=``,taskId, data) {
    console.log(path, data);
    try {
        let response = await fetch(baseUrl + path + taskId + ".json", {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let responseData = await response.json();
    } catch (error) {
        console.error("Error PUT data in database:", error);
    }
}


function renderSubTasks(subtask, taskId, i, checkBox = '') {
    document.getElementById('taskOverlayCheckbox').innerHTML += `
    <div class="checkBox">
    <input type="checkbox" id="ceckBox_${i}" onclick="changeSuptaskPrufment(${i}, '${taskId}')" ${checkBox}>
    <span>${subtask}</span>
</div>`
}

function renderTaskCardBig(element, categoryText, taskId) {
    document.getElementById('taskOverlay').innerHTML =
        `<div id="taskOverlayWrapper" class="taskOverlayWrapper slide-right">
    <div id="taskOverlayType" class="taskOverlayType">
    <div id="issueType" class="issueType ${element.categorySelect}">
    ${categoryText}
    </div>
    <img src="./img/icons/cancel-logo.png" alt="" onclick="closeTaskOverlay()">
    </div>
    
    <div class="scrollbarTaskOverlayWapper scrollbox">
    <div id="taskOverlayTitle" class="taskOverlayTitle">
        ${element.title}
    </div>

    <div id="taskOverlayFacts" class="taskOverlayFacts">
        <p>${element.description}</p>
        <p>Due Date: ${element.datePicker}</p>
        <p>Priority: ${element.priority}</p>
    </div>

    <div id="taskOverlayAssignee" class="taskOverlayAssignee">
        Assigned to:
        <ul>
            <li>Patrick</li>
            <li>Farid</li>
        </ul>
    </div>

    <div id="taskOverlayCheckbox" class="taskOverlayCheckbox">
        <p>Subtasks:</p>
    </div>
    </div>
    <div id="taskOverlayBottomEdit" class="taskOverlayBottomEdit">
        <button class="unstyled-button editBar" type="button" onclick="deleteTask('${taskId}')">
            <img src="./img/icons/delete_icon.png">
            <p>Delete</p>
        </button>

        <button class="unstyled-button editBar" type="button" onclick="taskEdit('${taskId}')">
            <img src="./img/icons/edit_icon.png">
            <p>Edit</p>
        </button>
    </div>
</div>`
}

function renderTaskEditor(taskId, task) {
    console.log("halo",task.position);
    document.getElementById('taskOverlay').innerHTML = `
    <div  class="taskOverlayWrapper slide-right">
    <div  class="taskOverlayTypeEdite d-flex">
        <img src="./img/icons/cancel-logo.png" alt="" onclick="closeTaskOverlay()">
    </div>
    
                    <form class="main" onsubmit="changeTask('${taskId}','${task.position}')">
                        <div class="addTaskWrapper scrollbarTaskOverlayWapper scrollbox">
                            <div class="">
                                <div>
                                    <p class="fSize-20  editTaskWrapper">Title<span class="redStar">*</span></p>
                                    <input type="text" id="title" value="${task.title}" Title" required/>
                                </div>
        
                                <div >&nbsp;</div>
        
                                <div>
                                    <p class="fSize-20  editTaskWrapper">Description</p>
                                    <textarea rows="5" id="description" >${task.description}</textarea>
                                </div>
        
                                
                                <div >&nbsp;</div>
                                
                                <div>
                                <p class="fSize-20  editTaskWrapper">Due Date<span class="redStar">*</span></p>
                                <input type="date" id="datePicker" value="${task.datePicker}" required>
                                </div>
                                
                                <div >&nbsp;</div>
                                
                                <div>
                                <p class="fSize-20  editTaskWrapper">Prio</p>
                                <div id="priority" class="priority d-flex">
                                <button id="urgentButton" type="button" onclick="priobuttonSelect('urgent')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                Urgent
                                <div id="addTaskPrioUrgent" class="priorityImg addTaskPrioUrgent"></div>
                                </button>
                                <button id="mediumButton" type="button" onclick="priobuttonSelect('medium')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                Medium
                                <div id="addTaskPrioMedium" class="priorityImg addTaskPrioMedium"></div>                               
                                </button>
                                <button id="lowButton" type="button" onclick="priobuttonSelect('low')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                Low
                                <div id="addTaskPrioLow" class="priorityImg addTaskPrioLow"></div>
                                </button>
                                </div>
                                </div>

                                <div >&nbsp;</div>

                                <div>
                                    <p class="fSize-20  editTaskWrapper">Assigned to</p>
                                    <select name="choose" id="selectInputAssignee">
                                        <option value="${task.selectInputAssignee}">${task.selectInputAssignee}</option>
                                        <option value="Test 1">Test 1</option>
                                        <option value="Test 2">Test 2</option>
                                    </select>
                                </div>
                                
                                <div >&nbsp;</div>
                                
                                <div>
                                <p class="fSize-20  editTaskWrapper">Subtasks</p>
                                <div class="addTaskEnterSubtask d-flex align-items-center justify-content-between">
                                <input type="text" id="subtasks" placeholder="Enter Subtasks"/>
                                <button class="d-flex" id="addTaskAddSubtaskbutton" type="button" onclick="addSubtaskAddArray()">
                                <div class="addTaskAdd"></div>
                                </button>
                                    </div>
                                    <lu id="subtaskSorage"></lu>
                                </div>
                            </div>
                        </div>
        
                        <div class="editTaskBottom d-flex">

                            <div >
                                <button class="editTaskEditBottom d-flex align-items-center justify-content-center">OK <img src="./img/icons/check-icon.png" alt="" class="createTaskButtonImg"></button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>`
}