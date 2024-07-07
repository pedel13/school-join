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

let downloadedUserData;
let localUser;
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
            counter ++;;
            if (password === SINGLE_CONTACT.password) {
                console.log("Folgenden User gefunden:", SINGLE_CONTACT)
                let activeUserName = SINGLE_CONTACT.name;
                localStorage.setItem("activeUserName", `${activeUserName}`);
                window.location.assign('./index.html');
            }
            else {
                counter = 0;
                console.log("Passwort falsch")
            }
        }
    }
    if (counter === 0) {
        console.log("E-Mail Adresse nicht vorhanden");
    }
    counter = 0;
}

async function guestLogin() {
    document.getElementById('email').value = "test@nixx.de";
    document.getElementById('password').value = "11111";
    await login();
    window.open("index.html", "_self");
}

async function fetchUserData() {
    let response = await fetch(BASE_URL + '/users' + ".json");
    let responseToJson = await response.json();
    
    localUser = responseToJson;
}
async function onloadLogin() {
    await fetchUserData();
    showLogoAnimation();
}
