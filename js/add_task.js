const baseUrl = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app";
let prio;
let subtasklist = ['no'];
let subtaskProofment = [];

async function addTask(position='') {
    await getInputs(position);
    renderAllTasks();
}

async function getInputs(position) {
    let inputs = {
        "position": position,
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value,
        "selectInputAssignee": document.getElementById('selectInputAssignee').value,
        "datePicker": document.getElementById('datePicker').value,
        "priority": prio,
        "categorySelect": document.getElementById('categorySelect').value,
        "subtasks": subtasklist,
        "subtask": subtaskProofment
    };
    await setTaskDataInDatabase("/board/tasks", inputs);
    clearAddTask();

}

function clearAddTask() {
    title.value = '';
    description.value = '';
    selectInputAssignee.value = '';
    datePicker.value = '';
    categorySelect.value = '';
    subtasks.value = '';
    subtasklist = ['no'];
    subtaskProofment = [];
    priobuttonclearselect()
    prio = '';
}

async function setTaskDataInDatabase(path = "", data = {}) {
    try {
        let response = await fetch(baseUrl + path + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let responseData = await response.json();
    } catch (error) {
        console.error("Error setting data in database:", error);
    }
}


function openAddTaskOverlay(position='') {
    document.getElementById('addTaskOverlay').classList.remove('d-none');
    console.log("for render overlay");
    renderAddOverlay(position);
    console.log("nach render overlay");
}

function closeAddTaskOverlay() {
    document.getElementById('addTaskOverlay').classList.add('d-none');
}

function priobutton(button, icon) {
    buttonSelected = document.getElementById(button);
    iconSelected = document.getElementById(icon);

    buttonSelected.classList.add("priorityButtonActiv");
    buttonSelected.classList.remove("priorityButton");
    iconSelected.classList.add(icon+'Activ');
    iconSelected.classList.remove(icon);
}

function priobuttonRemoveOther(button, icon, buttonOther, iconOther) {
    buttonSelected = document.getElementById(button);
    iconSelected = document.getElementById(icon);
    buttonOtherSelected = document.getElementById(buttonOther);
    iconOtherSelected = document.getElementById(iconOther);

    buttonSelected.classList.add("priorityButton");
    buttonSelected.classList.remove("priorityButtonActiv");
    iconSelected.classList.add(icon);
    iconSelected.classList.remove(icon+'Activ');

    buttonOtherSelected.classList.add("priorityButton");
    buttonOtherSelected.classList.remove("priorityButtonActiv");
    iconOtherSelected.classList.add(iconOther);
    iconOtherSelected.classList.remove(iconOther+'Activ');
}

function priobuttonclear(button, icon) {
    buttonSelected = document.getElementById(button);
    iconSelected = document.getElementById(icon);

    buttonSelected.classList.add("priorityButton");
    buttonSelected.classList.remove("priorityButtonActiv");
    iconSelected.classList.add(icon);
    iconSelected.classList.remove(icon+'Activ');
}

function priobuttonSelect(priority) {
    prio = priority;
    switch (prio) {
        case 'urgent':
            priobutton('urgentButton','addTaskPrioUrgent');
            priobuttonRemoveOther('mediumButton','addTaskPrioMedium','lowButton','addTaskPrioLow');
            break;
        case 'medium':
            priobutton('mediumButton','addTaskPrioMedium');
            priobuttonRemoveOther('urgentButton','addTaskPrioUrgent','lowButton','addTaskPrioLow');
            break;
        case 'low':
            priobutton('lowButton','addTaskPrioLow');
            priobuttonRemoveOther('urgentButton','addTaskPrioUrgent','mediumButton','addTaskPrioMedium');
            break;
        default:
            break;
    }
}

function priobuttonclearselect() {
    switch (prio) {
        case 'urgent':
            priobuttonclear('urgentButton','addTaskPrioUrgent');
            break;
        case 'medium':
            priobuttonclear('mediumButton','addTaskPrioMedium');
            break;
        case 'low':
            priobuttonclear('lowButton','addTaskPrioLow');
            break;
        default:
            break;
    }
}

function editCreatSubtaskNew(subtaskCreateCount, newSubtask) {
    document.getElementById('subtaskCreate_'+subtaskCreateCount).innerHTML
}

function editCreatSubtaskAlt(subtaskCreateCount, newSubtask) {
    document.getElementById('subtaskCreate_'+subtaskCreateCount).innerHTML
}

function deleteCreateSubtaskNew(subtaskCreateCount) {
    let element = document.getElementById('subtaskCreate_'+subtaskCreateCount);
    element.parentNode.removeChild(element);
}

function deleteCreateSubtaskAlt(subtaskCreateCount) {
    document.getElementById('subtaskCreate_'+subtaskCreateCount).innerHTML
}

function renderAllCreateSubtasks(taskId) {
    let i = 0;
    let element = tasks[taskId];
    for (let subtask in element.subtasks) {
    renderCrateSubtask(element.subtasks[i], i, 'Alt');
    i ++;
    }
}

function addSubtaskAddArray() {
    let newSubtask = document.getElementById('subtasks').value;
    if (subtasklist[0] == 'no') {
        subtasklist = [];
    }
    subtasklist.push(newSubtask);
    subtaskProofment.push("false");
    subtasks.value = '';
    let subtaskCreateCount = subtasklist.length - 1;
    renderCrateSubtask(newSubtask, subtaskCreateCount, 'New');
    }
    
    function renderCrateSubtask(newSubtask, subtaskCreateCount, age='') {
    document.getElementById('subtaskSorage').innerHTML += `
    <li class="addTaskSubtaskShow" id="subtaskCreate_${subtaskCreateCount}" justify-content-between">• ${newSubtask}<div class="d-flex">
    <button type="button"  class="addTaskSubtaskEdit" onclick="editCreatSubtask${age}('${subtaskCreateCount},${newSubtask}')"></button>
    <div class="addTaskSubtaskVertikalLine"></div>
    <button type="button"  class="addTaskSubtaskWaste" onclick="deleteCreateSubtask${age}('${subtaskCreateCount}')"></button>
    </div></li>`
}

function renderAddOverlay(position) {
    document.getElementById('addTaskOverlay').innerHTML = ''
    document.getElementById('addTaskOverlay').innerHTML = `            
        <div class="outerTaskOverlayWrapper slide-top">
                <div class="addTaskOverlayHeadline">
                    <h1>Add Task</h1>
                    <img src="./img/icons/cancel-logo.png" alt="cancel" onclick="closeAddTaskOverlay()" title="Klick or press ESC to close">
                </div>
                <div id="innerTaskOverlayWrapper" class="innerTaskOverlayWrapper">

                    <form class="main" onsubmit="addTask('${position}')">
                        <div id="addTaskWrapper" class="addTaskWrapper">
                            <div class="addTaskWrapperLeft">
                                <div>
                                    <p class="fSize-16">Title<span class="redStar">*</span></p>
                                    <input type="text" id="title" placeholder="Enter Title" required/>
                                </div>
        
                                <div class="spacer">&nbsp;</div>
        
                                <div>
                                    <p class="fSize-16">Description</p>
                                    <textarea rows="5" id="description" placeholder="Enter a Description"></textarea>
                                </div>
        
                                <div class="spacer">&nbsp;</div>
        
                                <div>
                                    <p class="fSize-16">Assigned to</p>
                                    <select name="choose" id="selectInputAssignee">
                                        <option value="Assigned to...">Assigned to...</option>
                                        <option value="Test 1">Test 1</option>
                                        <option value="Test 2">Test 2</option>
                                    </select>
                                </div>
                            </div>
        
                            <div class="addTaskWrapperMid divider">&nbsp;</div>
        
                            <div class="addTaskWrapperRight">
                                <div>
                                    <p class="fSize-16">Due Date<span class="redStar">*</span></p>
                                    <input type="date" id="datePicker" required>
                                </div>
        
                                <div>
                                    <p class="fSize-16">Prio</p>
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
        
                                <div>
                                    <p class="fSize-16">Category<span class="redStar">*</span></p>
                                    <select name="choose" id="categorySelect" required>
                                        <option value="" disabled selected>Select Category</option>
                                        <option value="technical-task">Technical-Task</option>
                                        <option value="user-story">User-Story</option>
                                    </select>
                                </div>
        
                                <div>
                                    <p class="fSize-16">Subtasks</p>
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
        
                        <div id="addTaskBottom" class="addTaskBottom">
                            <p class="fSize-16">This field is required<span class="redStar">*</span></p>
        
                            <div id="createTaskButton">
                                <button type="button" onclick="clearAddTask()" id="clear">Clear <img src="./img/icons/cancel-logo.png" alt="" class="createTaskButtonImg"></button>
                                <button id="create">Create Task <img src="./img/icons/check-icon.png" alt="" class="createTaskButtonImg"></button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>`
}