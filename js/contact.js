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
    closeContactOverlay();
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

async function fetchContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    
    let localContact = Object.values(responseToJson);
    
    localContactArray = localContact;
    console.log('Kontakt (fetchContacts): ', localContact);
    
    await renderContacts();
}
/**
 * Rendering the contact data into the HTML
 */
async function renderContacts() {
    for (let indexOfContacts = 0; indexOfContacts < localContactArray.length; indexOfContacts++) {
        let name = localContactArray[indexOfContacts]['name'];
        let email = localContactArray[indexOfContacts]['email'];
        document.getElementById('contactList').innerHTML += `
            <div id="contactDetailWrapper_${indexOfContacts}">
                <ul class="namesList" id="contactUlActive_${indexOfContacts}" onclick="activeContact(${indexOfContacts}); renderClickedContact(${indexOfContacts})">
                    <li id="contactItem_${indexOfContacts}" class="contactItem">
                        <div class="innerContactDetailWrapper">
                            <div id="userProfile">
                                <img src="./img/icons/person.png" alt="personImage">
                            </div>
                            <div class="contact">
                                ${name}
                                <br>
                                <a href="mailto:${email}" target="_blank" class="emailLink">
                                    ${email}
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        `;
    }
    
    console.log("Kontakt (Renderfunktion): ", localContactArray);
}

function renderClickedContact(indexOfContacts) {
    if (indexOfContacts >= 0) {
        let name = localContactArray[indexOfContacts]['name'];
        let email = localContactArray[indexOfContacts]['email'];
        let phone = localContactArray[indexOfContacts]['phone'];
        document.getElementById('renderedContactDetails').innerHTML = "";
        document.getElementById(`renderedContactDetails`).classList.remove('d-none');
        //document.getElementById(`renderedContactDetails`).classList.add('slide-right');
        document.getElementById('renderedContactDetails').innerHTML += `
            <div id="contactSummary">
                <div id="contactTitle">
                    <div id="contactAvatar">
                        <div class="credentialsCircle">
                            FF
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
                            
                            <div id="deleteCurrentContact" onclick="deleteContact()">
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
}

function openAddContactOverlay() {
    document.getElementById('contactOverlay').classList.remove('d-none');
}

function closeContactOverlay() {
    document.getElementById('contactOverlay').classList.add('d-none');
}

function activeContact(idOfContact) {
    let activatedContacts = document.getElementsByClassName('activeContact');
    console.log("Aktiv:", activatedContacts);
    if (activatedContacts[0]) {
        activatedContacts[0].classList.remove('activeContact');
    }
    let contactToActivate = document.getElementById(`contactItem_${idOfContact}`);
    contactToActivate.classList.add('activeContact');
}

function removeActiveContact(j) {
    document.getElementById(`contactUlActive_${j}`).classList.remove('activeContact');
}

function clearNewContactForm() {
    document.getElementById('newContactName').value = '';
    document.getElementById('newContactMail').value = '';
    document.getElementById('newContactPhone').value = '';
}

function editContact() {

}

function deleteContact() {

}