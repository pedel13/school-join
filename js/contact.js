/* Local variables */
let localContactArray;

/**
 * Creates new Contact-Data and saves them to the Database
 * @function addContact
 */
async function addContact() {
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
            color = "bg-jelliow";
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
    var cdata = data.split(" ");
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

async function setContactToFirebase(name, email, phone, nameCharts, contactColor) {
    let contactData = {
        "name": name,
        "email": email,
        "phone": phone,
        "nameCharts": nameCharts,
        "contactColor": contactColor,
    };
    await postContactData('contacts', contactData);
}

async function fetchContacts() {
    await loadContacts();

    for (let contactID in localContactArray) {
        let element = localContactArray[contactID];
        let name = element.name;
        let mail = element.email;
        let nameCharts = element.nameCharts;
        let color = element.contactColor
        renderContacts(contactID, name, mail, nameCharts, color);
    }

}

async function loadContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json");
    localContactArray = await response.json();
}

/**
 * Rendering the contact data into the HTML
 */
async function renderContacts(contactID, name, mail, nameCharts, color) {
    document.getElementById('contactList').innerHTML += /*html*/ `
        <div id="contactDetailWrapper_${contactID}" class="contactDetailWrapper">
            <ul class="namesList" id="contactUlActive_${contactID}" onclick="activeContact('${contactID}'); renderClickedContact('${contactID}')">
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