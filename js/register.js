function addUser() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let checkBox = document.getElementById("registerCheckbox");
    /**
     * Register-function
     * @TODO: pushing into remote-storage??
     */
    preventRefresh();
    if (name.value !== "" && password.value === passwordConfirm.value) {
        if (checkBox.checked === true) {
            users.push({email: email.value, password: password.value});
            window.alert("Du hast dich erfolgreich registriert!");
            window.location.href = 'signup.html?msg=Du hast dich erfolgreich registriert!';
            clearRegisterForm();
            successRegister();
        }
        else if (checkBox.checked === false) {
            window.alert("Bitte setze den Haken!");
        }
    }
    else window.alert("Passwörter stimmen nicht überein!");
}

function clearRegisterForm(name, email, password, passwordConfirm, checkBox) {
    name.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
    checkBox.checked = false;
}

function preventRefresh() {
    document.getElementById('formIdSignup').addEventListener (
        "submit",
        function (evt) {
            // Eingaben nicht korrekt
            evt.preventDefault();
            //
        }
    );
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