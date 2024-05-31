function addUser() {
    /**
     * Register-function
     * @TODO: pushing into remote-storage
     */
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let checkBox = document.getElementById("registerCheckbox");
    
    if (name.value !== "" && password.value === passwordConfirm.value) {
        if (checkBox.checked === true) {
            users.push({email: email.value, password: password.value});
            window.alert("Du hast dich erfolgreich registriert!");
            window.location.href = 'register.html?msg=Du hast dich erfolgreich registriert!';
            name.value = "";
            email.value = "";
            password.value = "";
            passwordConfirm.value = "";
            successRegister();
        }
        else if (checkBox.checked === false) {
            window.alert("Bitte setze den Haken!");
        }
    }
    else window.alert("Passwörter stimmen nicht überein!");
}

function successRegister() {
    let msgBox = document.getElementById("msgBox");
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    
    if (msg) {
        msgBox.innerText = msg;
    }
    else msgBox.classList.add('d-none');
}