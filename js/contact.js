/* Local variables */
let localContactArray;
let alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
/**
 * Creates new Contact-Dataset
 * @function addContact
 */
async function addContact(event) {
    event.preventDefault(event);
    let contactName = document.getElementById('newContactName').value;
    let contactMail = document.getElementById('newContactMail').value;
    let contactPhone = document.getElementById('newContactPhone').value;
    let nameCharts = [];
    nameCharts = splitName(contactName);
    let contactColor = setColor();
    await setContactToFirebase(contactName, contactMail, contactPhone, nameCharts, contactColor);
    closeContactOverlay();
    await fetchContacts();
}

/**
 * Sets the background color of a contact avatar
 * @function setColor
 */
function setColor() {
    let randomNumber = Math.floor(Math.random() * 7);
    let color = '';
    switch (randomNumber) {
        case 0:
            color = "bg-orange";
            break;
        case 1:
            color = "bg-purple";
            break;
        case 2:
            color = "bg-blue";
            break;
        case 3:
            color = "bg-pink";
            break;
        case 4:
            color = "bg-yellow";
            break;
        case 5:
            color = "bg-green";
            break;
        case 6:
            color = "bg-dark-blue";
            break;
        case 7:
            color = "bg-red";
            break;
        default:
            break;
    }
    return color;
}

/**
 * Splits the name of a contact in his first letters to show them inside the contact avatar
 * @function splitName
 */
function splitName(data) {
    let cdata = data.split(" ");
    let firstName = cdata[0];
    let secondName = cdata[1];
    let nameCharts = [];
    let firstChart = firstName.charAt(0);
    let firstChartUpperCase = firstChart.toUpperCase();
    let secondChart = secondName.charAt(0);
    let secondChartUpperCase = secondChart.toUpperCase();
    nameCharts.push(firstChartUpperCase);
    nameCharts.push(secondChartUpperCase);
    return nameCharts;
}

async function postContactData(path = "", data) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error setting data in database:", error);
    }
}


/**
 * Sets the new contact to the database
 * @function setContactToFirebase
 */
async function setContactToFirebase(name, email, phone, nameCharts, contactColor) {
    let contactData = {
        "name": name,
        "email": email,
        "phone": phone,
        "nameCharts": nameCharts,
        "contactColor": contactColor,
    };
    let contactDataAsString = JSON.stringify(contactData);
    await postContactData("contacts", contactDataAsString);
}

/**
 * Clears all loaded contacts to reload them after fetching contact data
 * @function clearContactRendering
 */
function clearContactRendering() {
    for (let i = 0; i < alphabet.length; i++) {
        document.getElementById(`contactListContent-${alphabet[i]}`).innerHTML ='';
    }
}

/**
 * Fetching all contact data on loading the page
 * @function fetchContacts
 */
async function fetchContacts() {
    await loadContacts("/contacts");
    clearContactRendering();
    for (let contactID in localContactArray) {
        let element = localContactArray[contactID];
        let name = element.name;
        let mail = element.email;
        let nameCharts = element.nameCharts;
        let color = element.contactColor;
        let contactAlphabetElement = document.getElementById(`contactList-${nameCharts[0]}`);
        let contactAlphabetRenderElement = document.getElementById(`contactListContent-${nameCharts[0]}`);
        if (contactAlphabetElement.classList.contains("d-none")) {
            contactAlphabetElement.classList.remove("d-none");
        }
        renderContacts(contactID, name, mail, nameCharts, color, contactAlphabetRenderElement);
    }

}

async function loadContacts(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    localContactArray = await response.json();
}

function highlightContactCard() {
    //
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

function searchRenderPositionClickedContact(contactId) {
    let testForOverlay = document.getElementById("contactsRight");
    renderClickedContact(contactId);
    if (matchMedia`(max-width: 970px)`.matches) {
        testForOverlay.classList.remove('max-w-970');
        document.getElementById('contactRightHeadSection').classList.add('max-w-970');
        document.getElementById('contactLeft').classList.add('max-w-970');
        document.getElementById('contactRightHeadSectionMobile').classList.remove('d-none')
    }
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


let anyID;
function renderContactHighlight(contactID) {
    if(anyID) {
        document.getElementById(`${anyID}`).classList.remove('activeContact');
    }
    document.getElementById(`${contactID}`).classList.add('activeContact');
    anyID = contactID;
}

function contactNavbarOpenClose() {
    let navbarOpenOrClose = document.getElementById("contact-Navbar");
    if (hasClass(navbarOpenOrClose,'d-none')) {
        navbarOpenOrClose.classList.remove("d-none");
        isContactOverlayJustOpened = true;
        setTimeout(() => { isContactOverlayJustOpened = false; }, 100);
    } else {
        navbarOpenOrClose.classList.add("d-none");
    }
}

function openAddContactOverlay() {
    let overlay = document.getElementById('contactOverlay');
    overlay.classList.remove('d-none');
    isContactOverlayJustOpened = true;
    setTimeout(() => { isContactOverlayJustOpened = false; }, 100);
}

function activeContact() {
    const navLinkEls = document.querySelectorAll('.contactDetailWrapper');

    navLinkEls.forEach(navLinkEl => {
        navLinkEl.addEventListener('click', () => {
            document.querySelector('.activeContact')?.classList.remove('activeContact');
            navLinkEl.classList.add('activeContact');
        })
    });
}

function clearNewContactForm() {
    document.getElementById('newContactName').value = '';
    document.getElementById('newContactMail').value = '';
    document.getElementById('newContactPhone').value = '';
}

function closeContactOverlay() {
    clearNewContactForm();
    document.getElementById('contactOverlay').classList.add('d-none');
}

/**
 * Allows to edit a contact
 * @function editContact
 */
async function editContact(contactId = "") {
    var form = document.getElementById("createNewContactForm");
    form.onsubmit = null;
    form.onsubmit = function () {
        return editContactToFirebase(event, contactId);
    };
    var deleteButtenExistContact = document.getElementById("clearNewContact");
    deleteButtenExistContact.onclick = null;
    deleteButtenExistContact.onclick = function () {
        return deleteContactEverywhere(contactId);
    };
    await renderEditContactsOverlay(contactId);
    openAddContactOverlay();
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
        </div>
    `;
    document.getElementById("createNewContact").innerHTML = /*html*/ `
        Save
        <img src="./img/icons/check-icon.png"  class="createTaskButtonImg" alt="check_icon">
    `;
    document.getElementById("contactOverlayLeft").innerHTML = /*html*/ `
        <!--img src="./img/join-logo-contacts.png" alt="join-logo" class="contactJoinLogo"-->
        <img src="./img/cancel-logo-white.png" alt="join-logo" class="">
        <h1>Edit contact</h1>
        <img src="./img/icons/blue-borderLine.png" alt="blue-border">
    `;
    document.getElementById("contactOverlayLeft").innerHTML = /*html*/ `
        <img src="../img/icons/cancel-logo-white.png" alt="cross" class="cancelContactEdit" onclick="closeContactOverlay()">
        <h1>Edit contact</h1>
        <img src="./img/icons/blue-borderLine.png" alt="blue-border">
    `;
}

/**
 * Send the edited contact details to the database
 * @function editContactToFirebase
 */
async function editContactToFirebase(event, contactId) {
    event.preventDefault(event);
    localContactArray[contactId]['name'] = document.getElementById('newContactName').value;
    localContactArray[contactId]['email'] = document.getElementById('newContactMail').value;
    localContactArray[contactId]['phone'] = document.getElementById('newContactPhone').value;
    localContactArray[contactId]['nameCharts'] = splitName(localContactArray[contactId]['name']);
    let dataAsStringify = JSON.stringify(localContactArray[contactId]);
    await updateTask(dataAsStringify, `/contacts/${contactId}`)
    await fetchContacts();
    closeContactOverlay();
    searchRenderPositionClickedContact(contactId);
}

/**
 * Deletes the contact
 * @function deleteContactEverywhere
 */
async function deleteContactEverywhere(contactID) {
    await searchContactsInTasks(contactID);
    await deleteContact(contactID);
}

/**
 * Searching a contact inside a Task
 * @function editContactToFirebase
 */
async function searchContactsInTasks(contactID) {
    let tasks = await loadTasks("/board/tasks");
    let contactIsInTask = false;
    for (const taskId in tasks) {
        contactIsInTask = false;
        const element = tasks[taskId];
        let contactsInTask = element.selectContacts;
        for (const activeContactCount in contactsInTask) {
            let activeContactId = contactsInTask[activeContactCount];
            if (contactID == activeContactId) {
                contactIsInTask = true;
                contactsInTask.splice(activeContactCount, 1);
            }
        }
        let elementAsStringify = JSON.stringify(element);
        updateTask(elementAsStringify, `/board/tasks/${taskId}`)
    }
}

async function deleteContact(contactToDelete) {
    try {
        let response = await fetch(BASE_URL + "/contacts/" + contactToDelete + ".json", {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
    catch (error) {
        console.error("Error delete data in database:", error);
    }
    await fetchContacts();
    document.getElementById('renderedContactDetails').innerHTML = "";
    document.getElementById(`renderedContactDetails`).classList.remove('d-none');
}