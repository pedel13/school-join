function addUser() {
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let checkBox = document.getElementById("registerCheckbox");
    
    if (password.value === passwordConfirm.value) {
        if (checkBox.checked) {
            users.push({email: email.value, password: password.value});
        }
        else if (checkBox === !checkBox.checked) {
            window.alert("Bitte den haken Privacy akzeptieren!");
        }
        window.alert("Du hast dich erfolgreich registriert!");
    }
    else window.alert("Passwörter stimmen nicht überein!");
    
    name.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
}