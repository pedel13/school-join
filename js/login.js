let users = [
    {'email': 'admin@join.de', 'password': '123456'},
    {'email': 'test@test.de', 'password': 'testUser'}
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

function guestLogin(event) {
    event.preventDefault();
    document.getElementById('loginEmail').value = "test@test.de";
    document.getElementById('loginPassword').value = "testUser";
}

function onloadLogin() {
    loadUsers("users");
}

async function loadUsers(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
}