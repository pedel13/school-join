/* Local variables */
let localContactArray;

/**
 * Creates new Contact-Data and saves them to the Database
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
    clearNewContactForm();
    closeContactOverlay();
    window.location.reload();
}

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

function splitName(data) {
    let cdata = data.split(" ");
    let firstName = cdata[0];
    let secentName = cdata[1];
    let nameCharts = [];
    let firstChart = firstName.charAt(0);
    let firstChartUpperCase = firstChart.toUpperCase();
    let secentChart = secentName.charAt(0);
    let secentChartUpperCase = secentChart.toUpperCase();
    nameCharts.push(firstChartUpperCase);
    nameCharts.push(secentChartUpperCase);
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

async function fetchContacts() {
    await loadContacts("/contacts");
    for (let contactID in localContactArray) {
        let element = localContactArray[contactID];
        let name = element.name;
        let mail = element.email;
        let nameCharts = element.nameCharts;
        let color = element.contactColor;
        let contactAlphabetElement = document.getElementById(`contactList-${nameCharts[0]}`);
        if (contactAlphabetElement.classList.contains("d-none")) {
            contactAlphabetElement.classList.remove("d-none");
        }
        renderContacts(contactID, name, mail, nameCharts, color, contactAlphabetElement);
    }

}

async function loadContacts(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    localContactArray = await response.json();
}

/**
 * Rendering the contact data into the HTML
 */
async function renderContacts(contactID, name, mail, nameCharts, color, contactAlphabetElement) {
    contactAlphabetElement.innerHTML += /*html*/ `
        <div id="contactDetailWrapper_${contactID}" class="contactDetailWrapper">
            <ul class="namesList" id="contactUlActive_${contactID}" onclick="surcheRenderPositionClickedContact('${contactID}')">
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
function surcheRenderPositionClickedContact(contactId) {
    let testForOferlay = document.getElementById("contactsRight");
    renderClickedContact(contactId);
    if (matchMedia`(max-width: 970px)`.matches) {
        testForOferlay.classList.remove('max-w-970');
        document.getElementById('contactRightHeadSection').classList.add('max-w-970');
        document.getElementById('contactLeft').classList.add('max-w-970');
        document.getElementById('contactRightHeadSectionMobile').classList.remove('d-none')
    }
}

function renderClickedContact(contactID) {
    let name = localContactArray[contactID]['name'];
    let email = localContactArray[contactID]['email'];
    let phone = localContactArray[contactID]['phone'];
    let color = localContactArray[contactID]['contactColor'];
    let nameCharts = localContactArray[contactID]['nameCharts'];
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

function closeContactOverlay() {
    document.getElementById('contactOverlay').classList.add('d-none');
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
    await renderEditContatsOferlay(contactId);
    openAddContactOverlay();
}

async function renderEditContatsOferlay(contactId) {
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
    document.getElementById("avatar").innerHTML =  /*html*/ `<div id="contactAvatar">
    <div class="credentialsCircle ${color}" id="credentialsCircle">
        ${nameCharts[0]}${nameCharts[1]}
    </div>
</div>`
    document.getElementById("createNewContact").innerHTML = /*html*/ `Save
        <img src="./img/icons/check-icon.png"  class="createTaskButtonImg" alt="check_icon">`
    document.getElementById("contactOverlayLeft").innerHTML = /*html*/ `<img src="./img/join-logo-contacts.png" alt="join-logo" class="contactJoinLogo">
    <h1>Edit contact</h1>
    <img src="./img/icons/blue-borderLine.png" alt="blue-border">`
    document.getElementById("contactOverlayLeftMobile").innerHTML = /*html*/ `<h1>Edit contact</h1>
        <img src="./img/icons/blue-borderLine.png" alt="blue-border">`
}

async function editContactToFirebase(event, contactId) {
    event.preventDefault(event);
    localContactArray[contactId]['name'] = document.getElementById('newContactName').value;
    localContactArray[contactId]['email'] = document.getElementById('newContactMail').value;
    localContactArray[contactId]['phone'] = document.getElementById('newContactPhone').value;
    localContactArray[contactId]['nameCharts'] = splitName(localContactArray[contactId]['name']);
    let dataAsStringify = JSON.stringify(localContactArray[contactId]);
    await updateTask(dataAsStringify, `/contacts/${contactId}`)
    clearNewContactForm();
    closeContactOverlay();
    window.location.reload();
}

async function deleteContactEverywhere(contactID) {
    await surcheContactsInTasks(contactID);
    await deleteContact(contactID);
}

async function surcheContactsInTasks(contactID) {
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
    window.location.reload();
}