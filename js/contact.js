/* Local variables */
let localContactArray;

/**
 * Creates new Contact-Data and saves them to the Database
 * @function addContact
 */
async function addContact() {
    let contactName = document.getElementById('newContactName');
    let contactMail = document.getElementById('newContactMail');
    let contactPhone = document.getElementById('newContactPhone');
    
    await setContactToFirebase(contactName.value, contactMail.value, contactPhone.value);
    clearNewContactForm();
    closeContactOverlay();
    window.location.reload();
    await renderContacts();
    
}

async function postContactData(path = "", data) {
    try {
        let response = await fetch(BASE_URL + path + ".json",{
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error setting data in database:", error);
    }
}

async function setContactToFirebase(name,email,phone) {
    let contactData = {
        "name": name,
        "email": email,
        "phone": phone
    };
    await postContactData('contacts', contactData);
}

async function fetchContacts() {    
    await loadContacts();

    for (let contactID in localContactArray) {
        let element = localContactArray[contactID];
        let name = element.name;
        let mail = element.email;

        renderContacts(contactID, name, mail);
    }

    console.log('Kontakt (fetchContacts): ', localContactArray);
}

async function loadContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json");
    localContactArray =  await response.json();
}

/**
 * Rendering the contact data into the HTML
 */
async function renderContacts(contactID, name, mail) {    
    document.getElementById('contactList').innerHTML += '';
    document.getElementById('contactList').innerHTML += /*html*/ `
        <div id="contactDetailWrapper_${contactID}" class="contactDetailWrapper">
            <ul class="namesList" id="contactUlActive_${contactID}" onclick="activeContact('${contactID}'); renderClickedContact('${contactID}')">
                <li id="contactItem_${contactID}" class="contactItem">
                    <div class="innerContactDetailWrapper">
                        <div id="userProfile">
                            <img src="./img/icons/person.png" alt="personImage">
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
    
    console.log("Kontakt (Renderfunktion): ", localContactArray);
}

function renderClickedContact(contactID, nameLetter) {
    let name = localContactArray[contactID]['name'];
    let email = localContactArray[contactID]['email'];
    let phone = localContactArray[contactID]['phone'];
    document.getElementById('renderedContactDetails').innerHTML = "";
    document.getElementById(`renderedContactDetails`).classList.remove('d-none');
    //document.getElementById(`renderedContactDetails`).classList.add('slide-right');
    //filterNamesLetter(nameLetter);
    document.getElementById('renderedContactDetails').innerHTML += /*html*/ ` 
        <div id="contactSummary">
            <div id="contactTitle">
                <div id="contactAvatar">
                    <div class="credentialsCircle" id="credentialsCircle">
                        ${nameLetter}
                    </div>
                </div>
                
                <div id="editName">
                    <div class="currentName">
                        ${name}
                    </div>
                    <div id="editButtons" onclick="editContact()">
                        <div id="editCurrentContact">
                            <img src="./img/icons/edit_icon.svg" alt="edit">
                            Edit
                        </div>
                        
                        <div id="deleteCurrentContact" onclick="deleteContact('${contactID}')">
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
    `;
}

function filterNamesLetter(contactID) {
    let nameLetter = localContactArray[contactID]['name'];
    nameLetter = contactID;
    for (let index = 0; index < nameLetter.length; index++) {
        if (nameLetter.includes(nameLetter)) {
            return(nameLetter);
        }
    }
}

function openAddContactOverlay() {
    document.getElementById('contactOverlay').classList.remove('d-none');
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

function editContact() {

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