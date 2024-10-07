const baseUrl = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app";
let prio = 'medium';
let subtaskList = [];
let subtaskProvement = [];
let expanded = false;
let contacts;
let selectContacts;

/**
 * @function loadUsableContacts()
 * lädt alle verfügbaren kontakte und lässt sie der Reihe nach in den selector rendern
 */

async function loadUsableContacts() {
    contacts = await loadTasks("/contacts");
    selectContacts = [];
    for (const element in contacts) {
            const contact = contacts[element];
            let initials = contact.nameCharts;
            let name = contact.name;
            let contactColor = contact.contactColor;
            renderContactSelector(element, initials, name, contactColor);
    }
    dataPickerForToday();
}

/**
 * @function dataPickerForToday()
 * verhindert das vergangene tage im task verwendet werden können
 */
function dataPickerForToday() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("datePicker").setAttribute('min', today);
}

/**
 * @function selectContact()
 * kontrolliert ob der kontakt schon ausgewählt ist und löst in oder fügt in hinzu
 */
function selectContact(contact="") {
    contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let selectedContact = true;
    let i = 0;
    for (const element in selectContacts) {
        if (contact == selectContacts[element]) {
            selectedContact = false;
            selectContacts.splice(i, 1);
            document.getElementById(`input${contact}`).checked = false;
            oldSelectedContact = document.getElementById("select"+contact)
            oldSelectedContact.remove();
        }
        i++;
    }
    if (selectedContact === true) {
        selectContacts.push(contact);
        document.getElementById(`input${contact}`).checked = true;
        let newSelectedContact = contacts[contact];
    renderSelectedContact(newSelectedContact, contact);
    }
}

/**
 * @function addEventListener()
 * schliesst das kontaktauswahl dropdown beim klicken ausserhalb des dropdowns
 */

document.addEventListener('click', function(event) {
    var checkboxes = document.getElementById("checkboxes");
    var selectBox = document.querySelector(".selectBox");
    if (expanded && !checkboxes.contains(event.target) && !selectBox.contains(event.target)) {
        checkboxes.style.display = "none";
        expanded = false;
    }
});

/**
 * @function showCheckboxes()
 * öffnet und schliesst das dropdown
 */

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "flex";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}

/**
 * @function addTask()
 * stoppt seite von reload
 */
async function addTask(event, position = '') {
    event.preventDefault(event);
    await getInputs(position);
}

/**
 * @function getInputs()
 * speichert den neuen task in einem json und übergibt sie der funktion setTaskDataInDatabase()
 */
async function getInputs(position) {
    let inputs = {
        "selectContacts": selectContacts,
        "position": position,
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value,
        "datePicker": document.getElementById('datePicker').value,
        "priority": prio,
        "categorySelect": document.getElementById('categorySelect').value,
        "subtasks": subtaskList,
        "subtask": subtaskProvement
    };
    await setTaskDataInDatabase(inputs);
    await clearAddTask();
}

/**
 * @function clearAddTask()
 * setzt alle inputfelder und variablen zurück von addtask.html und dem addtask overlay
 */
async function clearAddTask() {
    subtaskList = [];
    subtaskProvement = [];
    prioButtonClearSelect()
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('datePicker').value = '';
    document.getElementById('categorySelect').value = '';
    document.getElementById('subtasks').value = '';
    document.getElementById('subtaskStorage').innerHTML = '';
    document.getElementById('selectedContact').innerHTML = '';
    document.getElementById('selectContacts').innerHTML = '';
    await loadUsableContacts();
}

/**
 * @function setTaskDataInDatabase()
 * setzt einen neuen task in der datenbank ab, unter board/tasks
 */
async function setTaskDataInDatabase(data) {
    try {
        let response = await fetch(baseUrl + "/board/tasks" + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        else {
            window.location.assign('./board.html');
        }
        let responseData = await response.json();
    } catch (error) {
        console.error("Error setting data in database:", error);
    }
}

/**
 * @function openAddTaskOverlay()
 * entfernt display: none von dem addTaskOverlay und setzt einen timer, um das schliessen zu verhindern, wenn man nicht aufs overlay klickt
 * bis der timer abgelaufen ist
 */

async function openAddTaskOverlay(position = '') {
    let overlay = document.getElementById('addTaskOverlay');
    overlay.classList.remove('d-none');
    isAddTaskOverlayJustOpened = true;
    setTimeout(() => { isAddTaskOverlayJustOpened = false; }, 100); 
    renderAddOverlay(position);
    await loadUsableContacts();
}

/**
 * @function closeAddTaskOverlay()
 * fügt dem addTaskOverlay die klasse d-none hinzu und schliesst das overlay
 */
function closeAddTaskOverlay() {
    document.getElementById('addTaskOverlay').classList.add('d-none');
}

/**
 * @function prioButton()
 * fügt dem gedrückten priobutton die farbe hinzu und die farbe des icons
 */
function prioButton(button, icon) {
    buttonSelected = document.getElementById(button);
    iconSelected = document.getElementById(icon);

    buttonSelected.classList.add("priorityButtonActive");
    buttonSelected.classList.remove("priorityButton");
    iconSelected.classList.add(icon + 'Activ');
    iconSelected.classList.remove(icon);
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

/**
 * @function prioButtonRemoveOther()
 * setzt die aktiven buttons zurück
 */
function prioButtonclear(button, icon) {
    buttonSelected = document.getElementById(button);
    iconSelected = document.getElementById(icon);

    buttonSelected.classList.add("priorityButton");
    buttonSelected.classList.remove("priorityButtonActive");
    iconSelected.classList.add(icon);
    iconSelected.classList.remove(icon + 'Activ');
}

/**
 * @function prioButtonSelect()
 * wechselt die prio und lässt den aktiven button ändern
 */
function prioButtonSelect(priority) {
    prio = priority;
    switch (prio) {
        case 'urgent':
            prioButton('urgentButton', 'addTaskPrioUrgent');
            prioButtonRemoveOther('mediumButton', 'addTaskPrioMedium', 'lowButton', 'addTaskPrioLow');
            break;
        case 'medium':
            prioButton('mediumButton', 'addTaskPrioMedium');
            prioButtonRemoveOther('urgentButton', 'addTaskPrioUrgent', 'lowButton', 'addTaskPrioLow');
            break;
        case 'low':
            prioButton('lowButton', 'addTaskPrioLow');
            prioButtonRemoveOther('urgentButton', 'addTaskPrioUrgent', 'mediumButton', 'addTaskPrioMedium');
            break;
        default:
            break;
    }
}

/**
 * @function prioButtonClearSelect()
 * kontrolliert den aktiven button und lässt ihn zurücksetzen
 */
function prioButtonClearSelect() {
    switch (prio) {
        case 'urgent':
            prioButtonclear('urgentButton', 'addTaskPrioUrgent');
            break;
        case 'medium':
            prioButtonclear('mediumButton', 'addTaskPrioMedium');
            break;
        case 'low':
            prioButtonclear('lowButton', 'addTaskPrioLow');
            break;
        default:
            break;
    }
    prioButtonSelect('medium');
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
 * @function deleteCreateSubtask()
 * entfernt den zu löschenden subtask aus der liste und löst in global
 */
function deleteCreateSubtask(subtaskCreateCount = '') {
    if (subtaskList.length === 1) {
        subtaskList = [];
        subtaskProvement = []
    }
    else {
        let subtaskCreateCountSplice = subtaskCreateCount;
        subtaskList.splice(subtaskCreateCountSplice, 1);
        subtaskProvement.splice(subtaskCreateCountSplice, 1);
    }
    let element = document.getElementById('subtaskStorage');
    if (element) {
        let child = document.querySelector('#subtaskCreate_' + subtaskCreateCount);;
        if (child) {
            child.remove();
        }
    }
    document.getElementById('subtaskStorage').innerHTML = ''
    renderAllCreateSubtaskNew();
}

/**
 * @function renderAllCreateSubtaskNew()
 * rendert die liste der existierenden subtasks, nachdem einer gelöst wurde, neu
 */
function renderAllCreateSubtaskNew() {
    if (subtaskList.length < 1) {
    } else {
        let i = 0;
        for (let subtask in subtaskList) {
            renderCrateSubtask(subtaskList[i], i);
            i++;
        }
    }
}

/**
 * @function renderAllCreateSubtasks()
 * rendert alle bestehenden subtask ins overlay
 */
function renderAllCreateSubtasks(taskId) {
    let i = 0;
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let element = tasks[taskId];
    let subtask = element.subtasks;
    if (subtask == 'no') {
        subtaskList = [];
    } else {
        for (let subtask in element.subtasks) {
            subtaskList.push(element.subtasks[i]);
            subtaskProvement.push(element.subtask[i]);
            renderCrateSubtask(element.subtasks[i], i);
            i++;
        }
    }
}

/**
 * @function addSubtaskAddArray()
 * fügt die erstellten subtask dem globalen array hinzu
 */
function addSubtaskAddArray() {
    let newSubtask = document.getElementById('subtasks').value;
    if (subtaskList.length < 1) {
        subtaskList = [];
        subtaskProvement = [];
    }
    subtaskList.push(newSubtask);
    subtaskProvement.push("false");
    subtasks.value = '';
    let subtaskCreateCount = subtaskList.length - 1;
    renderCrateSubtask(newSubtask, subtaskCreateCount);
}

/**
 * @function renderSelectedContact()
 * rendert das icon des ausgewählten kontakts hinzu
 */
function renderSelectedContact(newSelectedContact, contact) {
    document.getElementById("selectedContact").innerHTML += `
    <p
    class="rounded-100 board-user-icon d-flex align-items-center justify-content-center ${newSelectedContact.contactColor}" id="select${contact}">
    ${newSelectedContact.nameCharts[0]}${newSelectedContact.nameCharts[1]}</p> `
}

/**
 * @function renderContactSelector()
 * rendert die zur auswahl stehenden kontakte in das dropdown
 */
function renderContactSelector(element, initials, name, contactColor) {
    document.getElementById('selectContacts').innerHTML += /*html*/ `
        <label for="${element}" onclick="selectContact('${element}')" class="d-flex justify-content-between w-100">
            <div class="d-flex align-items-center justify-content-between">
                <p 
                class="fc-white rounded-100 board-user-icon d-flex flex-row align-items-center justify-content-center ${contactColor}">
                ${initials[0]}${initials[1]}</p>
                <p>${name}</p>
            </div>
            <input type="checkbox" id="input${element}"/>
        </label>`
}

/**
 * @function renderCrateSubtask()
 * rendert den existierenden subtask hinzu
 */
function renderCrateSubtask(newSubtask, subtaskCreateCount) {
    document.getElementById('subtaskStorage').innerHTML += `
        <li class="addTaskSubtaskShow" id="subtaskCreate_${subtaskCreateCount}" class="justify-content-between">
            • ${newSubtask}
            <div class="d-flex" id="subTaskButton">
                <button type="button"  class="addTaskSubtaskEdit" onclick="editCreatSubtask('${subtaskCreateCount}', '${newSubtask}')"></button>
                <div class="addTaskSubtaskVertikalLine"></div>
                <button type="button"  class="addTaskSubtaskWaste" onclick="deleteCreateSubtask('${subtaskCreateCount}')"></button>
            </div>
        </li>
    `;
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
                <img src="./img/icons/cancel-logo.png" alt="cancel" onclick="closeAddTaskOverlay()" title="Klick or press ESC to close">
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
                            <button type="button" onclick="clearAddTask()" id="clear">Clear <img src="./img/icons/cancel-logo.png"  class="createTaskButtonImg"></button>
                            <button id="create">Create Task <img src="./img/icons/check-icon.png"  class="createTaskButtonImg"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
}