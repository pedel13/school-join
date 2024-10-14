/**
 * Adds an HTML element where this tag is used. In this case head- and sidebar navigation
 * @function includeHTML
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        if (element.id === 'sideBarContainer' || element.id === 'header' || element.id ==='mobileNavBar') {
            let resp = await fetch(file);
            if (resp.ok) {
                element.innerHTML = await resp.text();
            } else {
                element.innerHTML = 'Page not found';}
        }
    }
    document.getElementById("sideBarContainer").classList.remove("d-none");
}

/**
 * Adds and shows only this HTML-element for guest user
 * @function includeHTMLNoUser
 */
async function includeHTMLNoUser() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        if (element.id === 'sidebarNoUserContainer' || element.id === 'header') {
            let resp = await fetch(file);
            if (resp.ok) {
                element.innerHTML = await resp.text();
            } else {
                element.innerHTML = 'Page not found';
            }
        }
    }
    document.getElementById("sidebarNoUserContainer").classList.remove("d-none");
}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}
/**
 * Adds the new user data to the database
 * @function templateNavbarOpenClose
 */
function templateNavbarOpenClose() {
    let navbarOpenOrClose = document.getElementById("header-Navbar");
    if (hasClass(navbarOpenOrClose,'d-none')) {
        navbarOpenOrClose.classList.remove("d-none");
        isContactOverlayJustOpened = true;
    setTimeout(() => { isContactOverlayJustOpened = false; }, 100);
    } else {
        navbarOpenOrClose.classList.add("d-none");
    }
}
/**
 * @function renderAddOverlay()
 * rendert das addTaskOverlay mit der entsprechenden position
 */
function renderAddOverlay(position) {
    document.getElementById('addTaskOverlay').innerHTML = ''
    document.getElementById('addTaskOverlay').innerHTML = `            
        <div id="outerTaskOverlayWrapper" class="outerTaskOverlayWrapper slide-top">
            <div class="addTaskOverlayHeadline">
                <h1>Add Task</h1>
                <img src="./img/icons/cancel.svg" alt="cancel" onclick="closeAddTaskOverlay()" title="Klick or press ESC to close">
            </div>
            <div id="innerTaskOverlayWrapper" class="innerTaskOverlayWrapper">
                <form class="main" onsubmit="addTask(event,'${position}')">
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
                                    <button class="d-flex" id="addTaskAddSubtaskButton" type="button" onclick="addSubtaskAddArray()">
                                            <div class="addTaskAdd"></div>
                                    </button>
                                </div>
                                <lu id="subtaskStorage"></lu>
                            </div>
                        </div>
                    </div>
                    <div id="addTaskBottom" class="addTaskBottom">
                        <p class="fSize-16">This field is required<span class="redStar">*</span></p>   
                        <div id="createTaskButton">
                            <button type="button" onclick="clearAddTask()" id="clear">Clear <img src="./img/icons/cancel.svg"  class="createTaskButtonImg"></button>
                            <button id="create">Create Task <img src="./img/icons/check-icon.png"  class="createTaskButtonImg"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>`
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
        </li>`;
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
        </div>`;
}
function renderTaskCardBig(element, categoryText, taskId) {
    document.getElementById('taskOverlay').innerHTML = `
        <div id="taskOverlayWrapper" class="taskOverlayWrapper slide-right">
            <div id="taskOverlayType" class="taskOverlayType">
                <div id="issueType" class="issueType ${element.categorySelect}">
                    ${categoryText}
                </div>
                <img src="./img/icons/cancel.svg" onclick="closeTaskOverlay()" alt="cancel-logo">
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
        </div>`;
}
function renderTaskEditor(taskId, task) {
    document.getElementById('taskOverlay').innerHTML = /*html*/ `
        <div  class="taskOverlayWrapper slide-right">
            <div  class="taskOverlayTypeEdite d-flex">
                <img src="./img/icons/cancel.svg" onclick="closeTaskOverlay()" alt="cancel-logo">
            </div>
                <form class="main" onsubmit="changeTask(event,'${taskId}')">
                    <div class="addTaskWrapper scrollbarTaskOverlayWrapper scrollbox">
                        <div>
                            <div>
                                <p class="fSize-20 editTaskWrapper taskEditTitle">Title<span class="redStar">*</span></p>
                                <input type="text" id="title" value="${task.title}" required/>
                            </div>    
                            <div>&nbsp;</div>
                            <div>
                                <p class="fSize-20 editTaskWrapper">Description</p>
                                <textarea rows="5" id="description" >${task.description}</textarea>
                            </div>                            
                            <div>&nbsp;</div>                            
                            <div>
                            <p class="fSize-20 editTaskWrapper">Due Date<span class="redStar">*</span></p>
                            <input type="date" id="datePicker" value="${task.datePicker}" required>
                            </div>                           
                            <div>&nbsp;</div>     
                            <div>
                                <p class="fSize-20 editTaskWrapper">Prio</p>
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
                                <p class="fSize-20 editTaskWrapper">Subtasks</p>
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
        </div>`;
}
/**
 * Rendering the contact details for editing
 * @function renderContacts
 */
async function renderEditContactsOverlay(contactId) {
    await loadContacts("/contacts");
    let name = localContactArray[contactId]['name'];
    let email = localContactArray[contactId]['email'];
    let phone = localContactArray[contactId]['phone'];
    let color = localContactArray[contactId]['contactColor'];
    let nameCharts = localContactArray[contactId]['nameCharts'];
    document.getElementById("newContactName").value = name;
    document.getElementById("newContactMail").value = email;
    document.getElementById("newContactPhone").value = phone;
    document.getElementById("clearNewContact").innerHTML = /*html*/ `Delete`
    document.getElementById("avatar").innerHTML =  /*html*/ `
        <div id="contactAvatar">
            <div class="credentialsCircle ${color}" id="credentialsCircle">
                ${nameCharts[0]}${nameCharts[1]}
            </div>
        </div>`;
    document.getElementById("createNewContact").innerHTML = /*html*/ `
        Save
        <img src="../img/icons/check-icon.png"  class="createTaskButtonImg" alt="check_icon">`;
    document.getElementById("contactOverlayLeft").innerHTML = /*html*/ `
        <img src="../img/cancel-white.svg" alt="join-logo" class="white-cancel">
        <h1>Edit contact</h1>
        <img src="../img/icons/blue-borderLine.png" alt="blue-border">`;
    document.getElementById("contactOverlayLeft").innerHTML = /*html*/ `
        <div class="contactOverlayLeft">
            <div class="close-white">
                <img src="../img/icons/cancel-white.svg" alt="cross" class="cancelContactEdit white-cancel" onclick="closeContactOverlay()">
            </div>
            <div class="innerContactOverlayLeftContent">
                <h1>Edit contact</h1>
                <img src="./img/icons/blue-borderLine.png" alt="blue-border">
            </div>
        </div>`;
}

/**
 * editCreatSubtask()
 * löst den subtask und schreibt ihn in das input um ihn zu bearbeiten
 */
function editCreatSubtask(subtaskCreateCount = '', newSubtask = '') {
    document.getElementById('subtasks').removeAttribute("placeholder");
    document.getElementById('subtasks').value = newSubtask;
    deleteCreateSubtask(subtaskCreateCount);
}

/**
 * @function prioButtonRemoveOther()
 * setzt die aktiven buttons zurück ausser der, der gerade aktiviert wurde
 */
function prioButtonRemoveOther(button, icon, buttonOther, iconOther) {
    buttonSelected = document.getElementById(button);
    iconSelected = document.getElementById(icon);
    buttonOtherSelected = document.getElementById(buttonOther);
    iconOtherSelected = document.getElementById(iconOther);
    buttonSelected.classList.add("priorityButton");
    buttonSelected.classList.remove("priorityButtonActive");
    iconSelected.classList.add(icon);
    iconSelected.classList.remove(icon + 'Activ');
    buttonOtherSelected.classList.add("priorityButton");
    buttonOtherSelected.classList.remove("priorityButtonActive");
    iconOtherSelected.classList.add(iconOther);
    iconOtherSelected.classList.remove(iconOther + 'Activ');
}
