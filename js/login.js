let users = [
    {
        email: 'admin@join.de',
        password: '123456'
    },
    {
        email: 'test@test.de',
        password: 'testUser'
    }
];
function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user =  users.find(user => user.email === email.value && user.password === password.value);
    console.log(user);
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

async function onloadLogin() {
    console.log('test');
    await loadUsers("users");
    await postUserData("");
}

//Überprüfung in der Datenbank, ob ein User vorhanden ist
async function loadUsers(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
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