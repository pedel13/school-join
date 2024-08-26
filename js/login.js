
let localUser;
let counter = 0;


async function login(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    for (const key in localUser) {
        const SINGLE_CONTACT = localUser[key];
        if (email === SINGLE_CONTACT.email) {
            counter ++;
            if (password === SINGLE_CONTACT.password) {
                console.log("Folgenden User gefunden:", SINGLE_CONTACT)
                let activeUserName = SINGLE_CONTACT.name;
                localStorage.setItem("activeUserName", `${activeUserName}`);
                window.location.assign('./index.html');
            }
            else {
                counter = 0;
            }
        }
    }
    if (counter === 0) {
        wrongPassword();
    }
    counter = 0;
}

function wrongPassword() {
    let passwordInput = document.getElementById('password');
    document.getElementById('massageBoxEmail').classList.remove("d-none");
    passwordInput.classList.add("alert-filled");
}

function removeWrongPassword(passwordInput) {
    document.getElementById('massageBoxEmail').classList.add("d-none");
    passwordInput.classList.remove("alert-filled");
}

async function guestLogin() {
    localStorage.setItem("activeUserName", ``);
    window.open("index.html", "_self");
}

async function fetchUserData() {
    let response = await fetch(BASE_URL + '/users' + ".json");
    let responseToJson = await response.json();
    
    localUser = responseToJson;
}
async function onloadLogin() {
    localStorage.clear();
    await fetchUserData();
}
