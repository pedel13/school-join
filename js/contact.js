function openAddContactOverlay() {
    document.getElementById('contactOverlay').classList.remove('d-none');
}

function closeContactOverlay() {
    document.getElementById('contactOverlay').classList.add('d-none');
}

function activeContact() {
    document.getElementById('contactUlActive').classList.add('activeContact');
}

async function postContactData(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

/*
function createContactToDatabase() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("password").value;
    let contactData = {
        "name": name,
        "email": email,
        "phone": phone
    };
    await postContactData('contacts', contactData);
}*/
