const baseUrl = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";
let prio;

async function addTask() {
    await getInputs();
}

function getInputs() {
    let inputs = {
        "position": "board-task-on-to-do",
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value,
        "selectInputAssignee": document.getElementById('selectInputAssignee').value,
        "datePicker": document.getElementById('datePicker').value,
        "priority": prio,
        "categorySelect": document.getElementById('categorySelect').value,
        "subtasks": document.getElementById('subtasks').value,
    };
    setTaskData("board/tasks", inputs);
    clearAddTask();
}

function clearAddTask() {
    title.value = '';
    description.value = '';
    selectInputAssignee.value = '';
    datePicker.value = '';
    categorySelect.value = '';
    subtasks.value = '';
    priobuttonclearselect()
    prio = '';
}

async function setTaskData(path="", data={}) {
    let response = await fetch(baseUrl + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

function formValidation() {
    let titleValidation = document.getElementById('title').value;
    let descriptionValidation = document.getElementById('description').value;
    
    if (titleValidation !== '' && descriptionValidation !== '') {
        document.getElementById("create").removeAttribute('disabled');
    }
    else window.alert("Bitte Mindestens ein Feld ausfüllen");
}

function openAddTaskOverlay() {
    document.getElementById('addTaskOverlay').classList.remove('d-none');
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
    console.log(prio);
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