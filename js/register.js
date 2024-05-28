function addUser() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    users.push({email: email.value, password: password.value});
}