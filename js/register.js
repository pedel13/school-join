async function addUser() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let checkBox = document.getElementById("registerCheckbox");
    
    preventRefresh();
    
    if (name.value !== "" && password.value === passwordConfirm.value) {
        if (checkBox.checked === true) {
            window.alert("Du hast dich erfolgreich registriert!");
            await setToFirebase();
            //window.location.href = 'signup.html?msg=Du hast dich erfolgreich registriert!';
            clearRegisterForm();
            //successRegister();
        }
        else if (checkBox.checked === false) {
            window.alert("Bitte setze den Haken!");
        }
    }
    else window.alert("Passwörter stimmen nicht überein!");
}

async function setToFirebase() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let userData = {
        "name": name,
        "email": email,
        "password": password
    };
    await postUserData('users', userData);
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
        msgBox.innerHTML = msg;
    }
    else msgBox.classList.add('d-none');
}