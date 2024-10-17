/**
 * @function renderActiveContacts()
 * rendert das icon eines zugeteilten kontakt in einen task
 */
function renderActiveContacts(activeContact, contactId, taskId) {
    document.getElementById("selectContent"+taskId).innerHTML += `
        <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center ${activeContact.contactColor} -m-8" id="${contactId}">${activeContact.nameCharts[0]}${activeContact.nameCharts[1]}</p>
    `
}

/**
 * @function renderActiveContactsRest()
 * rendert den zähler der zusätzlichen Assignees
 */
function renderActiveContactsRest(i,taskId){
    i = i-4;
    document.getElementById("selectContent"+taskId).innerHTML += `
        <p class="supCounter rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-grey -m-8" id="${i}">+${i}</p>
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
    class="supCounter rounded-100 board-user-icon d-flex align-items-center justify-content-center ${newSelectedContact.contactColor}" id="select${contact}">
    ${newSelectedContact.nameCharts[0]}${newSelectedContact.nameCharts[1]}</p> `
}

/**
 * renders the number as file contacts were not changed
 */
function renderSelectedContactRest(i) {
    document.getElementById("selectedContact").innerHTML += `
    <p
    class="supCounter rounded-100 board-user-icon d-flex align-items-center justify-content-center" id="select${i}">+
    ${i}</p> `
}

/**
 * @function renderContactSelector()
 * rendert die zur auswahl stehenden kontakte in das dropdown
 */
function renderContactSelector(element, initials, name, contactColor) {
    document.getElementById('selectContacts').innerHTML += /*html*/ `
        <div class="d-flex align-items-center justify-content-between contactListWrapperContainer" id="contactListWrapperContainer_${element}" onclick="selectContact('${element}')">
            <div class="avatarAndName">
                <p class="fc-white rounded-100 board-user-icon d-flex flex-row align-items-center justify-content-center ${contactColor}">
                    ${initials[0]}${initials[1]}
                </p>
                <p>${name}</p>
            </div>
            <div class="chooseContact">
                <input type="checkbox" id="input${element}" class="addTaskContactInput"/>
                <label for="input${element}" class="d-flex justify-content-between contactLabels" id="contactLabels${element}"></label>
            </div>
        </div>
    `
}

/**
 * @function renderCreateSubtask()
 * rendert den existierenden subtask hinzu
 */
function renderCreateSubtask(newSubtask, subtaskCreateCount) {
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

/**
 * Rendering the contact details for editing
 * @function renderContacts
 */
async function renderAddContactsOverlay() {
    document.getElementById("contactOverlayWrapper").innerHTML =  /*html*/ ` 
        <div id="contactOverlayLeft" class="contactOverlayLeft">
            <div class="close-white">
                <img src="./img/icons/cancel-white.svg" alt="cancel" class="close-img white-cancel" onclick="closeContactOverlay(event)">
            </div>
            
            <div class="innerContactOverlayLeftContent">
                <img src="./img/join-logo-contacts.png" alt="join-logo" class="contactJoinLogo">
                <h1>Add contact</h1>
                <p>Tasks are better with a team!</p>
                <img src="./img/icons/blue-borderLine.png" alt="blue-border">
            </div>
        </div>
        
        <div id="contactOverlayRight" class="contactOverlayRight">
            <div class="close">
                <img src="./img/icons/cancel.svg" alt="cancel" class="close-img" onclick="closeContactOverlay(event)">
            </div>
            
            <div class="formWrapper">
                <form onsubmit="addContact(event)" id="createNewContactForm">
                    <div id="addContactFormAvatar" class="addContactFormAvatar">
                        <div class="avatar" id="avatar">
                            <img src="./img/icons/contactAvatar.png" alt="avatar" class="avatar-img">
                        </div>
                        <div class="addContactForm">
                            <input type="text" id="newContactName" class="icon-person" pattern="^[A-Za-z]+ [A-Za-z]+$" title="Firstname Space Name" placeholder="Name" required>
                            <label for="newContactName"></label>
                            
                            <input type="email" id="newContactMail" class="icon-letter" pattern=".*@.*\.\w{2,}" title="Bitte gib eine gültige E-Mailadresse ein. Z.B. max@muster.com" placeholder="Mail" required>   
                            <label for="newContactMail"></label>
                                                                     
                            <input type="tel" id="newContactPhone" class="icon-phone" pattern="[0-9]+" placeholder="Phone" required>
                            <label for="newContactPhone"></label>
                        </div>
                    </div>
                    
                    <div class="createContact">
                        <div class="spaceDivContacts">
                            &nbsp;
                        </div>
                        <div class="createContactButton">
                            <button id="clearNewContact" class="clearNewContact" type="button" onclick="clearNewContactForm()">
                                Cancel
                                <img src="./img/icons/cancel.svg"  class="createTaskButtonImg" alt="cancel_logo">
                            </button>
                            
                            <button id="createNewContact" class="createNewContact">
                                Create Contact
                                <img src="./img/icons/check-icon.png"  class="createTaskButtonImg" alt="check_icon">
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>       
    `;
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
 * add the message no subtask available when writing in the input field
 */
function renderSubtaskAlert() {
    document.getElementById("messageBoxSubtask").innerHTML =  /*html*/ `<span id="alertMassageSubtask" class="alert-massage">Bitte gib eine Aufgabe ein</span>`
}
/**
 * removes the message no subtask available when writing in the input field
 */
function deleteSubtaskAlert() {
    document.getElementById("messageBoxSubtask").innerHTML =  /*html*/ ``
}