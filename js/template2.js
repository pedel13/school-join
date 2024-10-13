/**
 * @function renderActiveContacts()
 * rendert das icon eines zugeteilten kontakt in einen task
 */
function renderActiveContacts(activeContact, contactId, taskId) {
    document.getElementById("selectContent"+taskId).innerHTML += `
    <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center ${activeContact.contactColor} -m-8" id="${contactId}">${activeContact.nameCharts[0]}${activeContact.nameCharts[1]}</p>
    `
}

function renderActiveContactsRest(i,taskId){
    i = i-4;
    document.getElementById("selectContent"+taskId).innerHTML += `
    <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-grey -m-8" id="${i}">+${i}</p>
    `
}

/**
 * @function renderTask()
 * rendert eine task karte in die richtige progress spalte
 */
function renderTask(task, taskId, subtask, categoryText) {
    document.getElementById(task.position).innerHTML += /*html*/`
        <div id="taskID_${taskId}" onclick="openTaskOverlay('${taskId}')" ondragstart="drag('${taskId}')" draggable="true" class="d-flex board-task-card flex-column hoverRotation">
            <div class="d-flex align-items-center justify-content-between">
                <p class="fc-white rounded-8 board-user d-flex align-items-center ${task.categorySelect}" id="categoryTitle">${categoryText}</p>
                <div id="moveButtons">
                    <img src="img/icons/arrow_upward_32px.png" alt="arrow_upward" class="arrow-up-${task.position} moveArrows" onclick="taskGoBack('${task.position}', '${taskId}')">
                    <img src="img/icons/arrow_downward_32px.png" alt="arrow_downward" class="arrow-down-${task.position} moveArrows" onclick="taskGoForward('${task.position}', '${taskId}')">
                </div>
            </div>
            <div>
                <p class="board-card-subtitle">${task.title}</p>
            </div>
            <div>
                <p class="board-description">${task.description}</p>
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

// Wenn das Element über einer Drop-Zone schwebt, wird die Highlight-Klasse hinzugefügt
function highlightDropZone(zoneId="") {
    const dropZone = document.getElementById(zoneId);
    dropZone.classList.add('highlight');
}

// Entfernt die Highlight-Klasse, wenn das Element die Drop-Zone verlässt
function removeHighlightDropZone(zoneId="") {
    const dropZone = document.getElementById(zoneId);
    dropZone.classList.remove('highlight');
}

// Wenn das Element fallengelassen wird, wird die Highlight-Klasse entfernt
function dropremoveHighlightDropZone(zoneId) {
    const dropZone = document.getElementById(zoneId);
    dropZone.classList.remove('highlight');
    // Hier kann der Code hinzugefügt werden, der das tatsächliche Verschieben der Aufgabe regelt
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

function renderSelectedContactRest(i) {
    document.getElementById("selectedContact").innerHTML += `
    <p
    class="rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-grey" id="select${i}">+
    ${i}</p> `
}

/**
 * @function renderContactSelector()
 * rendert die zur auswahl stehenden kontakte in das dropdown
 */
function renderContactSelector(element, initials, name, contactColor) {
    document.getElementById('selectContacts').innerHTML += /*html*/ `
        <label for="${element}" onclick="selectContact('${element}')" class="d-flex justify-content-between w-100 contactLabels" id="contactLabels${element}">
            <div class="d-flex align-items-center justify-content-between">
                <p class="fc-white rounded-100 board-user-icon d-flex flex-row align-items-center justify-content-center ${contactColor}">
                    ${initials[0]}${initials[1]}
                </p>
                <p>${name}</p>
            </div>
            <input type="checkbox" id="input${element}" class="addTaskContactInput"/>
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
 * Rendering the contact details into the HTML
 * @function renderClickedContacts
 */
function renderClickedContact(contactID) {
    let contacts = localContactArray;
    let contact = contacts[contactID];
    let name = contact['name'];
    let email = contact['email'];
    let phone = contact['phone'];
    let color = contact['contactColor'];
    let nameCharts = contact['nameCharts'];
    renderContactHighlight(contactID);
    document.getElementById('renderedContactDetails').innerHTML = "";
    document.getElementById(`renderedContactDetails`).classList.remove('d-none');
    document.getElementById('renderedContactDetails').innerHTML += /*html*/ ` 
        <div id="contactSummary">
            <div id="contactTitle">
                <div id="contactAvatar">
                    <div class="credentialsCircle ${color}" id="credentialsCircle">
                        ${nameCharts[0]}${nameCharts[1]}
                    </div>
                </div>
                <div id="editName">
                    <div class="currentName">
                        ${name}
                    </div>
                    <div id="editButtons">
                        <div id="editCurrentContact" onclick="editContact('${contactID}')">
                            <img src="./img/icons/edit_icon.svg" alt="edit">
                            Edit
                        </div>          
                        <div id="deleteCurrentContact" onclick="deleteContactEverywhere('${contactID}')">
                            <img src="./img/icons/delete_icon.svg" alt="delete">
                            Delete
                        </div>
                    </div>
                </div>                
            </div>
        </div>
        <div id="contactDetails">
            <p>Contact Information</p>
            <div id="contactDetailMail">
                <b>Email:</b>
                <br>
                <br>
                <a href="mailto:${email}" class="mailLink">${email}</a>
            </div>
            <div id="contactDetailPhone">
                <b>Phone:</b>
                <br>
                <br>
                <a href="tel:${phone}" class="phoneLink">${phone}</a>
            </div>
        </div>
        <div  class="iconCircleContactPosition">
        <div id="contact-Navbar" class="contact-navbar-position d-none">
            <div class="contact-navbar">
                    <div id="editCurrentContact" onclick="editContact('${contactID}')">
                        <img src="./img/icons/edit_icon.svg" alt="edit">
                        Edit
                    </div>                     
                    <div id="deleteCurrentContact" onclick="deleteContactEverywhere('${contactID}')">
                        <img src="./img/icons/delete_icon.svg" alt="delete">
                        Delete
                    </div>
                </div>
        </div>
            <div class="iconCircleContact">
                <img src="./img/icons/three_points_With.png" onclick="contactNavbarOpenClose()" alt="">
            </div>
        </div>
    `;
}

/**
 * Rendering the contact data into the HTML
 * @function renderContacts
 */
async function renderContacts(contactID, name, mail, nameCharts, color, contactAlphabetElement) {
    contactAlphabetElement.innerHTML += /*html*/ `
        <div id="${contactID}" class="contactDetailWrapper">
            <ul class="namesList" id="contactUlActive_${contactID}" onclick="searchRenderPositionClickedContact('${contactID}'); highlightContactCard()">
                <li id="contactItem_${contactID}" class="contactItem">
                    <div class="innerContactDetailWrapper">
                        <div id="userProfile">
                        <div class="fc-white d-flex">
                    <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center ${color} -m-8">${nameCharts[0]}${nameCharts[1]}</p>
                    </div>
                        </div>
                        <div class="contact">
                            ${name}
                            <br>
                            <a href="mailto:${mail}" target="_blank" class="emailLink">
                                ${mail}
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    `;
}