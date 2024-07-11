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
let counter;
/**
 * Rendering the contact data into the HTML
 */
async function renderContacts() {
    for (let indexOfContacts = 0; indexOfContacts < localContactArray.length; indexOfContacts++) {
        let name = localContactArray[indexOfContacts]['name'];
        let email = localContactArray[indexOfContacts]['email'];
        let phone = localContactArray[indexOfContacts]['phone'];
        document.getElementById('contactList').innerHTML += `
            <div id="contactDetailWrapper_${indexOfContacts}">
                <ul class="namesList" id="contactUlActive_${indexOfContacts}" onclick="activeContact(${indexOfContacts})">
                    <li id="contactItem_${indexOfContacts}" class="contactItem">
                        <div class="innerContactDetailWrapper">
                            <div id="userProfile">
                                <img src="./img/icons/person.png" alt="personImage">
                            </div>
                            <div class="contact">
                                ${name}
                                <br>
                                <a href="#" target="_blank" class="emailLink">
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

function openAddContactOverlay() {
    document.getElementById('contactOverlay').classList.remove('d-none');
}

function closeContactOverlay() {
    document.getElementById('contactOverlay').classList.add('d-none');
}

function activeContact(i) {
    document.getElementById(`contactUlActive_${i}`).classList.toggle('activeContact');
}

function clearNewContactForm() {
    document.getElementById('newContactName').value = '';
    document.getElementById('newContactMail').value = '';
    document.getElementById('newContactPhone').value = '';
}