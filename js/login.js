let users = [
    {'email': 'admin@join.de', 'password': '123456'},
    {'email': 'test@test.de', 'password': 'testUser'}
];
function loginValidation() {

}

function guestLogin(event) {
    event.preventDefault();
    document.getElementById('loginEmail').value = "test@test.de";
    document.getElementById('loginPassword').value = "testUser";
}