let cardDraggedId;
let countOnToDo = 0;
let countOnInProgress = 0;
let countOnAwaitFeedback = 0;
let countOnDone = 0;
let subtaskCount = 0;
let subtaskCountInProzent = 0;
let subtaskCountProvement = 0;
/**
 * allows dropping
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/** 
 * @function drag()
 * speichert die id des tasks global
 */
function drag(id) {cardDraggedId = id;}
/**
 * @function drop()
 * rendert die position und gibt sie danach der updateTask funktion
 * und lässt die task neu rendern
 */
async function drop(dropPosition, zoneId) {
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
    dropremoveHighlightDropZone(zoneId);
    renderAllTasks();
}

/**
 * @function updateTask()
 * gibt einen PUT fetch mit variablem pfad und data ans backend
 */
async function updateTask(element,path="") {
    try {
        let response = await fetch(baseUrl + path + ".json", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: element
        }); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }  catch (error) {
        console.error("Error PUT data in database:", error);
    }
}

/**
 * @function changeTask()
 * überschreibt die geänderten Variablen eines tasks Global mit den im input und lässt sie durch updateTask() ins backend schreiben
 */
async function changeTask(event,taskId="") {
    event.preventDefault(event);
    let task = JSON.parse(localStorage.getItem("activeTask"));
    task["title"] = document.getElementById('title').value;
    task["description"] = document.getElementById('description').value;
    task["selectContacts"] = selectContacts;
    task["datePicker"] = document.getElementById('datePicker').value;
    task["priority"] = prio;
    if (subtaskList.length >  0) {
        task["subtasks"] = subtaskList;
        task["subtask"] = subtaskProofments;
    }
    let taskAsStringify = JSON.stringify(task);
    await updateTask(taskAsStringify,`/board/tasks/${taskId}`);
    closeTaskOverlay();
}

/**
 * @function reduceDroppedElement()
 * reduziert den zähler um 1 an der position wo mit drag & drop ein element entfernt
 */
function reduceDroppedElement(elementPosition) {
    switch (elementPosition) {
        case "board-task-on-to-do": countOnToDo--;
            break;
        case "board-task-on-in-progress": countOnInProgress--;
            break;
        case "board-task-on-await-feedback": countOnAwaitFeedback--;
            break;
        case "board-task-on-done": countOnDone--;
            break;
    }
}

/**
 * 
 * @function taskGoBackNext()
 * verändert die position von dem verschobenen task ohne drag & drop und gibt diese an die funktion taskGoBack() zurück
 */
function taskGoBackNext(position) {

    switch (position) {
        case "board-task-on-in-progress":  
        position = "board-task-on-to-do";
            break;
            case "board-task-on-await-feedback":  
            position = "board-task-on-in-progress";
            break;
            case "board-task-on-done":
                position = "board-task-on-await-feedback";
            break;
        default:
            break;
    }
    return position;
}

/** 
* @function taskGoBackNext()
* verändert die position von dem verschobenen tasks ohne drag & drop und gibt diese an die funktion taskGoForward() zurück
*/
function taskGoForwardNext(position) {
    switch (position) {
        case "board-task-on-to-do":
            position = "board-task-on-in-progress";
            break;
            case "board-task-on-in-progress":  
            position = "board-task-on-await-feedback";
            break;
            case "board-task-on-await-feedback":  
            position = "board-task-on-done";
            break;
        default:
            break;
    }
    return position;
}

/**
 *  taskGoBack()
 *  setzt die position im aufgabenfeld zurück und gibt sie danach der funktion updateTask one drag and drop
 *  und läst die task neu rendern
 */
async function taskGoBack(position="", taskId="") {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let dropCard = tasks[taskId];
    reduceDroppedElement(dropCard["position"]);
    dropCard["position"] = taskGoBackNext(position);
    let elementAsStringify = JSON.stringify(dropCard);
    await updateTask(elementAsStringify,`/board/tasks/${taskId}`);
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
    document.getElementById('taskOverlay').classList.add('d-none');
    renderAllTasks();
}

/**
 *  @function taskGoBack()
 *  setzt die position im aufgabenfeld nach vorne und gibt sie danach der funktion updateTask one drag & drop
 *  und lässt die tasks neu rendern
 */
async function taskGoForward(position="", taskId="") {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let dropCard = tasks[taskId];
    reduceDroppedElement(dropCard["position"]);
    dropCard["position"] = taskGoForwardNext(position);
    let elementAsStringify = JSON.stringify(dropCard);
    await updateTask(elementAsStringify,`/board/tasks/${taskId}`);
    countOnToDo = 0;
    countOnInProgress = 0;
    countOnAwaitFeedback = 0;
    countOnDone = 0;
    document.getElementById('taskOverlay').classList.add('d-none');
    renderAllTasks();
}

/**
 *  @function findeTask()
 *  sucht task die den gewünschten suchbegriff im titel oder in der beschreibung haben und rendert nur diese
 */
function findeTask(value) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let filter = value.toUpperCase();
    cleanTaskboard();
    for (let taskId in tasks) {
        let element = tasks[taskId];
        let titleTest = element.title;
        let descriptionTest = element.description;
            if (titleTest.toUpperCase().indexOf(filter) > -1) {renderFindeTask(element, taskId, contacts);
                } else {
                    if (descriptionTest.toUpperCase().indexOf(filter) > -1) {renderFindeTask(element, taskId, contacts);}
            }
    }
    noTasksInProgress();
}

/**
 * 
 * @function renderFindeTask()
 * lässt den gefundenen task rendern und lässt die vorhandenen Kontakte reinrendern
 */
function renderFindeTask(element, taskId, contacts) {
    let subtask = subtaskExist(element);
    let categoryText = categoryFinder(element);
    countForNoTask(element.position);
    let i = 0;
    renderTask(element, taskId, subtask, categoryText);
    for (let contact in element.selectContacts) {
        let activeContactId = element.selectContacts[contact];
        let activeContact = contacts[activeContactId];
        i++;
        if (i<5){renderActiveContacts(activeContact, activeContactId, taskId);}
        }if (i>=5){renderActiveContactsRest(i,taskId)}
        subtaskCount = 0; 
}
/**
 * @function noTasksInProgress()
 * kontrolliert ob tasks in der jeweiligen spalte vorhanden sind und lässt das no task feld erscheinen oder verschwinden
 */
function noTasksInProgress() {
    if (countOnToDo != 0) {
        addNoTaskInProgress("no-tasks-to-do");
    } else { removeNoTaskInProgress("no-tasks-to-do"); }
    if (countOnInProgress != 0) {
        addNoTaskInProgress("no-tasks-in-progress");
    } else { removeNoTaskInProgress("no-tasks-in-progress"); }
    if (countOnAwaitFeedback != 0) {
        addNoTaskInProgress("no-tasks-await-feedback");
    } else { removeNoTaskInProgress("no-tasks-await-feedback"); }
    if (countOnDone != 0) {
        addNoTaskInProgress("no-tasks-Done");
    } else { removeNoTaskInProgress("no-tasks-Done"); }
}
/**
 * @function addNoTaskInProgress()
 * lässt das no task feld in der entsprechenden Spalte erscheinen oder verschwinden
 */
function addNoTaskInProgress(taskInProgress = "") {
    let element = document.getElementById(taskInProgress);
    element.classList.add("d-none");
}

/**
 * @function addNoTaskInProgress()
 * lädt das no task feld in der entsprechenden Spalte und lässt es erscheinen oder verschwinden
 */
function removeNoTaskInProgress(taskInProgress = "") {
    let element = document.getElementById(taskInProgress);
    element.classList.remove("d-none");
}

/**
 * @function loadTasks()
 * lädt daten mit variablem pfad vom backand
 */
async function loadTasks(path="") {
    let response = await fetch(baseUrl + path + ".json");
    return await response.json();
}
/**
 * @function cleanTaskboard()
 * löscht die tasks aus den entsprechenden progress spalten und setzt die dazugehörigen zähler wieder auf 0
 */
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
/**
 * @function renderAllTasks()
 * ladet alle tasks fom backend und speichert sie lokal, leert das bord und rendert die tasks neu
 */
async function renderAllTasks() {
    let tasks = await loadTasks("/board/tasks");
    localStorage.tasks = JSON.stringify(tasks);
    let contacts =  await loadTasks("/contacts");
    localStorage.usableContacts = JSON.stringify(contacts);
    cleanTaskboard();
    for (let taskId in tasks) {
        let element = tasks[taskId];
        renderFindeTask(element, taskId, contacts);
    }
    noTasksInProgress();
}

/**
 * @function subtaskExist()
 * kontrolliert, ob ein oder mehrere subtasks vorhanden sind und rendert die progressbar oder läst sie verschwinden
 */
function subtaskExist(task) {
    let subtask = " ";
    let testingSubtask = task.subtasks;
    if (typeof testingSubtask !== 'undefined' && testingSubtask) {
        subtaskCounter(task);
    }else {
        subtask = "d-none";
    }
    return subtask;
}

/**
 * @function subtaskCounter()
 * zählt die subtasks und berechnet wie viel prozent davon erledigt sind
 */

function subtaskCounter(task) {
    let subtask = task.subtasks;
    subtaskProofments = task.subtask;
    subtaskCount = 0;
    subtaskCountProvement = 0;
    for (let i=0; i<subtask.length; i++) {
        if (subtaskProofments[i] === 'true') {
            subtaskCountProvement = subtaskCountProvement+1;
        }
        subtaskCount++;
    }
    subtaskCountInProzent = 100 / subtaskCount * subtaskCountProvement;
}
/**
 * @function categoryFinder()
 * kontrolliert welcher kategorie der task angehört und setzt den dazugehörigen text fest da das abgespeicherte nur die klasse festlegt für die farbe
 */
function categoryFinder(task) {
    let categoryText = "";
    if (task.categorySelect == "technical-task") {
        categoryText = "Technical Task";
    } else {
        categoryText = "User Story";
    }
    return categoryText;
}
/**
 * @function countForNoTask()
 * zählt die tasks in der jeweiligen progress spalte, um herauszufinden, wo kein task ist
 */

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

/**
 * @function deleteTask()
 * löst einen bestimmten task anhand seiner id
 */

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