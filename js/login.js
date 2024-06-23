let users = [
    {
        email: 'admin@join.de',
        password: '123456'
    },
    {
        email: 'ff@nix.de',
        password: '1111'
    }
];

let downloadedUserData = [];
let localUser;
let contacts = [];
let counter = 0;
async function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    for (const key in localUser) {
        const SINGLE_CONTACT = localUser[key];
        let contact = {
            "id": key,
            "name": SINGLE_CONTACT.name,
            "email": SINGLE_CONTACT.email,
            "password": SINGLE_CONTACT.password
            
        };
        if (email === SINGLE_CONTACT.email) {
            counter ++;
            console.log(email);
            console.log("Counter", counter);
            if (password === SINGLE_CONTACT.password) {
                console.log("Folgenden User gefunden:", SINGLE_CONTACT)
            }
            else {
                counter = 0;
                console.log("Passwort falsch")
            }
        }
        contacts.push(contact);
    }
    if (counter === 0) {
        console.log("E-Mail Adresse nicht vorhanden");
    }
    counter = 0;
}

async function guestLogin(event) {
    event.preventDefault();
    document.getElementById('loginEmail').value = "test@test.de";
    document.getElementById('loginPassword').value = "testUser";
    window.open("summary.html", "_self");
}

async function fetchUserData() {
    let response = await fetch(BASE_URL + '/users' + ".json");
    let responseToJson = await response.json();
    
    downloadedUserData = downloadedUserData.concat(await responseToJson);
    console.log("Downloaded (fetchUserData):", downloadedUserData[0]);
    
    localUser = downloadedUserData[0];
    //localUser.push(...downloadedUserData);
    console.log("Show local user:", localUser);
}

async function postUserData(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

async function onloadLogin() {
    await fetchUserData();
}