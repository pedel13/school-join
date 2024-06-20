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
async function login(path = "/users") {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user =  users.find(u => u.email === email.value && u.password === password.value);
    console.log("Folgenden User gefunden:", user);
    
    if (user) {
        console.log('user gefunden')
    }
    else console.log('user nicht gefunden')
}

async function guestLogin(event) {
    event.preventDefault();
    document.getElementById('loginEmail').value = "test@test.de";
    document.getElementById('loginPassword').value = "testUser";
    window.open("summary.html", "_self");
}

//Überprüfung in der Datenbank, ob ein User vorhanden ist
async function loadUsers(path = "/users", email, password) {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    let user = await responseToJson.find(u => u.email === email.value && u.password === password.value);
    if (user) {
        console.log('user gefunden')
    }
    else console.log('user nicht gefunden')
    console.log("Function loadUsers: ",responseToJson);
}

async function postUserData(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    //return responseToJson = await response.json();
}

async function deleteFunction(path = "", data={}) {
    let response = await fetch(BASE_URL + path + ".json", {
       method: "DELETE",
    });
}

/*async function onloadLogin() {
    console.log('test');
    await loadUsers("users");
    await postUserData("");
}*/