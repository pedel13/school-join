async function addContact() {
    let contactName = document.getElementById('newContactName');
    let contactMail = document.getElementById('newContactMail');
    let contactPhone = document.getElementById('newContactPhone');
    
    await setContactToFirebase(contactName.value, contactMail.value, contactPhone.value);
    clearNewContactForm();
    closeContactOverlay();
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

function openAddContactOverlay() {
    document.getElementById('contactOverlay').classList.remove('d-none');
}

function closeContactOverlay() {
    document.getElementById('contactOverlay').classList.add('d-none');
}

function activeContact() {
    document.getElementById('contactUlActive').classList.add('activeContact');
}

function clearNewContactForm() {
    document.getElementById('newContactName').value = '';
    document.getElementById('newContactMail').value = '';
    document.getElementById('newContactPhone').value = '';
}