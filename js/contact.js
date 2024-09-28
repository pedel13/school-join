/* Local variables */
let localContactArray;
let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
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
    closeContactOverlay();
    await fetchContacts();
    surcheRenderPositionClickedContact(contactId);
}

async function addContactMobile(event) {
    event.preventDefault(event);
    let contactName = document.getElementById('newContactNameMobile').value;
    let contactMail = document.getElementById('newContactMailMobile').value;
    let contactPhone = document.getElementById('newContactPhoneMobile').value;
    let nameCharts = [];
    nameCharts = splitName(contactName);
    let contactColor = setColor();
    await setContactToFirebase(contactName, contactMail, contactPhone, nameCharts, contactColor);
    closeContactOverlay();
    await fetchContacts();
    surcheRenderPositionClickedContact(contactId);
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

function clearContactrendering() {
    for (let i = 0; i < alphabet.length; i++) {
        document.getElementById(`contactListContent-${alphabet[i]}`).innerHTML = '';
    }
}

async function fetchContacts() {
    let contacts =  await loadTasks("/contacts");
    localStorage.usableContacts = JSON.stringify(contacts);
    clearContactrendering();
    for (let contactID in contacts) {
        let element = contacts[contactID];
        let name = element.name;
        let mail = element.email;
        let nameCharts = element.nameCharts;
        let color = element.contactColor;
        let contactAlphabetElement = document.getElementById(`contactList-${nameCharts[0]}`);
        let contactAlphabetContentElement = document.getElementById(`contactListContent-${nameCharts[0]}`);
        if (contactAlphabetElement.classList.contains("d-none")) {
            contactAlphabetElement.classList.remove("d-none");
        }
        renderContacts(contactID, name, mail, nameCharts, color, contactAlphabetContentElement);
    }
}

async function loadContacts(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    localContactArray = await response.json();
}

/**
 * Rendering the contact data into the HTML
 */
async function renderContacts(contactID, name, mail, nameCharts, color, contactAlphabetContentElement) {
    contactAlphabetContentElement.innerHTML += /*html*/ `
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
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let contact = contacts[contactID];
    let name = contact['name'];
    let email = contact['email'];
    let phone = contact['phone'];
    let color = contact['contactColor'];
    let nameCharts = contact['nameCharts'];
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
        <div  class="iconCircleContactPosition" onclick="contactNavbarOpenClose()">
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
        </div>
    `;
}

function contactNavbarOpenClose() {
    let navbarOpenOrClose = document.getElementById("contact-Navbar");
    if (hasClass(navbarOpenOrClose, 'd-none')) {
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
    clearNewContactForm();
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

function clearNewContactFormNotClose() {
    document.getElementById("newContactNameMobile").innerHTML = '';
    document.getElementById("newContactMailMobile").innerHTML = '';
    document.getElementById("newContactPhoneMobile").innerHTML = '';
    document.getElementById("newContactName").innerHTML = '';
    document.getElementById("newContactMail").innerHTML = '';
    document.getElementById("newContactPhone").innerHTML = '';
}

function clearNewContactForm() {
    document.getElementById('contactOverlay').value = `<div id="contactOverlayWrapperMobile" class="contactOverlayWrapperMobile">
                        <div id="contactWrapperTop" class="contactWrapperTop">
                            <div class="closeMobile">
                                <img src="./img/icons/cancel-logo-white.png" alt="cancel" class="close-img"
                                    onclick="closeContactOverlay()">
                            </div>

                            <div id="contactOverlayMobileTop" class="contactOverlayMobileTop">
                                <h1>Add contact</h1>
                                <p>Tasks are better with a team!</p>
                                <img src="./img/icons/blue-borderLine.png" alt="blue-border">
                            </div>
                        </div>

                        <div id="contactWrapperBottom" class="contactWrapperBottom">
                            <div id="contactOverlayMobileBottom" class="contactOverlayMobileBottom">
                                <form onsubmit="addContactMobile(event)" id="createNewContactFormMobile">
                                    <div id="addContactFormAvatarMobile" class="addContactFormAvatarMobile">
                                        <div class="avatar" id="avatarMobile">
                                            <img src="./img/icons/contactAvatar.png" alt="avatar" class="avatar-img">
                                        </div>
                                        <div class="addContactFormMobile">
                                            <input type="text" id="newContactNameMobile" class="icon-person"
                                                pattern="^[A-Za-z]+ [A-Za-z]+$" title="Firstname Space Name"
                                                placeholder="Name" required>
                                            <label for="newContactNameMobile"></label>

                                            <input type="email" id="newContactMailMobile" class="icon-letter"
                                                placeholder="Mail" required>
                                            <label for="newContactMailMobile"></label>

                                            <input type="text" id="newContactPhoneMobile" class="icon-phone"
                                                placeholder="Phone" required>
                                            <label for="newContactPhoneMobile"></label>
                                        </div>
                                    </div>

                                    <div class="createContact" id="createNewContactMobile">
                                        <div class="createContactButton">
                                            <button id="clearNewContactMobile" class="clearNewContact" type="button"
                                                onclick="clearNewContactFormNotClose()">
                                                Cancel
                                                <img src="./img/icons/cancel-logo.png" class="createTaskButtonImg"
                                                    alt="cancel_logo">
                                            </button>

                                            <button id="createNewContactMobile" class="createNewContact">
                                                Create Contact
                                                <img src="./img/icons/check-icon.png" class="createTaskButtonImg"
                                                    alt="check_icon">
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div id="contactOverlayWrapper" class="contactOverlayWrapper">
                        <div id="contactOverlayLeft" class="contactOverlayLeft">
                            <img src="./img/join-logo-contacts.png" alt="join-logo" class="contactJoinLogo">
                            <h1>Add contact</h1>
                            <p>Tasks are better with a team!</p>
                            <img src="./img/icons/blue-borderLine.png" alt="blue-border">
                        </div>

                        <div id="contactOverlayRight" class="contactOverlayRight">
                            <div class="close">
                                <img src="./img/icons/cancel-logo.png" alt="cancel" class="close-img"
                                    onclick="closeContactOverlay(event)">
                            </div>

                            <div id="contactOverlayLeftMobile" class="contactOverlayLeftMobile">
                                <div class="innerContactOverlayLeftMobile" id="innerContactOverlayLeftMobile">
                                    <h1>Add contact</h1>
                                    <p>Tasks are better with a team!</p>
                                    <img src="./img/icons/blue-borderLine.png" alt="blue-border">
                                </div>
                            </div>

                            <form onsubmit="addContact(event)" id="createNewContactForm">
                                <div id="addContactFormAvatar" class="addContactFormAvatar">
                                    <div class="avatar" id="avatar">
                                        <img src="./img/icons/contactAvatar.png" alt="avatar" class="avatar-img">
                                    </div>
                                    <div class="addContactForm">
                                        <input type="text" id="newContactName" class="icon-person"
                                            pattern="^[A-Za-z]+ [A-Za-z]+$" title="Firstname Space Name"
                                            placeholder="Name" required>

                                        <input type="email" id="newContactMail" class="icon-letter" placeholder="Mail"
                                            required>

                                        <input type="text" id="newContactPhone" class="icon-phone" placeholder="Phone"
                                            required>
                                    </div>
                                </div>

                                <div class="createContact" id="createNewContact">
                                    <div class="spaceDivContacts">
                                        &nbsp;
                                    </div>
                                    <div class="createContactButton">
                                        <button id="clearNewContact" class="clearNewContact" type="button"
                                            onclick="clearNewContactFormNotClose()">
                                            Cancel
                                            <img src="./img/icons/cancel-logo.png" class="createTaskButtonImg"
                                                alt="cancel_logo">
                                        </button>

                                        <button id="createNewContact" class="createNewContact">
                                            Create Contact
                                            <img src="./img/icons/check-icon.png" class="createTaskButtonImg"
                                                alt="check_icon">
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>`;
}

async function editContact(contactId) {
    var form = document.getElementById("createNewContactForm");
    form.onsubmit = null;
    form.onsubmit = function (event) {
        event.preventDefault();
        return editContactToFirebase(contactId);
    };
    await renderEditContactsOverlay(contactId);
    await editContactMobile(contactId);
    openAddContactOverlay();
}

async function editContactMobile(contactId) {
    var form = document.getElementById("createNewContactFormMobile");
    form.onsubmit = null;
    form.onsubmit = function (event) {
        event.preventDefault();
        return editContactToFirebaseMobile(contactId);
    };
    await renderEditContactsOverlayMobile(contactId);
}

async function renderEditContactsOverlay(contactId) {
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let contact = contacts[contactId];
    let color = contact['contactColor'];
    let nameCharts = contact['nameCharts'];
    document.getElementById("newContactName").value = contact['name'];
    document.getElementById("newContactMail").value = contact['email'];
    document.getElementById("newContactPhone").value = contact['phone'];
    document.getElementById("avatar").innerHTML =  /*html*/ `<div id="contactAvatar">
    <div class="credentialsCircle ${color}" id="credentialsCircle">
        ${nameCharts[0]}${nameCharts[1]}
    </div>
</div>`
document.getElementById("createNewContact").innerHTML = /*html*/`<div class="createContactButton">
                                            <button id="clearNewContactMobile" class="clearNewContact" type="button"
                                                onclick="deleteContactEverywhere('${contactId}')">
                                                Delete
                                            </button>

                                            <button id="createNewContactMobile" class="createNewContact">
                                            Save
                                            <img src="./img/icons/check-icon.png"  class="createTaskButtonImg" alt="check_icon">
                                            </button>
                                        </div>`;
    document.getElementById("contactOverlayLeft").innerHTML = /*html*/ `<img src="./img/join-logo-contacts.png" alt="join-logo" class="contactJoinLogo">
    <h1>Edit contact</h1>
    <img src="./img/icons/blue-borderLine.png" alt="blue-border">`;
}

async function renderEditContactsOverlayMobile(contactId) {
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let contact = contacts[contactId];
    let color = contact['contactColor'];
    let nameCharts = contact['nameCharts'];
    document.getElementById("newContactNameMobile").value = contact['name'];
    document.getElementById("newContactMailMobile").value = contact['email'];
    document.getElementById("newContactPhoneMobile").value = contact['phone'];
    document.getElementById("contactOverlayLeftMobile").innerHTML = /*html*/ `<h1>Edit contact</h1>
        <img src="./img/icons/blue-borderLine.png" alt="blue-border">`
    document.getElementById("avatarMobile").innerHTML =  /*html*/ `<div id="contactAvatarMobile">
        <div class="credentialsCircle ${color}" id="credentialsCircle">
        ${nameCharts[0]}${nameCharts[1]}
    </div>
</div>`;
        document.getElementById("createNewContactMobile").innerHTML = /*html*/`<div class="createContactButton">
        <button id="clearNewContactMobile" class="clearNewContact" type="button"
            onclick="deleteContactEverywhere('${contactId}')">
            delete
        </button>
    
        <button id="createNewContactMobile" class="createNewContact">
        Save
        <img src="./img/icons/check-icon.png"  class="createTaskButtonImg" alt="check_icon">
        </button>
    </div>`;
}

async function editContactToFirebase(contactId) {
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let contact = contacts[contactId];
    contact["name"] = document.getElementById('newContactName').value;
    contact["email"] = document.getElementById('newContactMail').value;
    contact["phone"] = document.getElementById('newContactPhone').value;
    contact["nameCharts"] = splitName(contact['name']);
    let dataAsStringify = JSON.stringify(contact);
    await updateContact(dataAsStringify, `contacts/${contactId}`);
    closeContactOverlay();
    await fetchContacts();
    renderClickedContact(contactId);
}

async function editContactToFirebaseMobile(contactId) {
    let contacts = JSON.parse(localStorage.getItem("usableContacts"));
    let contact = contacts[contactId];
    contact["name"] = document.getElementById('newContactNameMobile').value;
    contact["email"] = document.getElementById('newContactMailMobile').value;
    contact["phone"] = document.getElementById('newContactPhoneMobile').value;
    contact["nameCharts"] = splitName(contact['name']);
    let dataAsStringify = JSON.stringify(contact);
    await updateContact(dataAsStringify, `contacts/${contactId}`);
    closeContactOverlay();
    await fetchContacts();
    renderClickedContact(contactId);
}

async function updateContact(element,path="") {
    console.log(BASE_URL);
    console.log(BASE_URL + path + ".json",);
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: element
        });
        if (!response.ok) {
            console.error(`Error status: ${response.status}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error PUT data in database:", error);
    }
}

async function deleteContactEverywhere(contactID) {
    await searchContactsInTasks(contactID);
    await deleteContact(contactID);
}

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
        updateTask(elementAsStringify, `board/tasks/${taskId}`)
    }
}

async function deleteContact(contactToDelete) {
    try {
        let response = await fetch(BASE_URL + "contacts/" + contactToDelete + ".json", {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }
    catch (error) {
        console.error("Error delete data in database:", error);
    }
    document.getElementById('renderedContactDetails').innerHTML = "";
    document.getElementById(`renderedContactDetails`).classList.remove('d-none');
    await fetchContacts();
}