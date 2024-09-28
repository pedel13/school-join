let emailCheck = 0;
let nameCheck = 0;

function checkName(name) {
    nameCheck = 0;
    for (const user in localUser) {
        if (Object.hasOwnProperty.call(localUser, user)) {
            const userCheck = localUser[user];
            if (userCheck.name == name.value) {
                nameCheck = 1;
            }
        }
    }
    if (nameCheck == 1) {
        document.getElementById('massageBoxName').classList.remove("d-none");
        name.classList.add("alert-filled");
        name.classList.add("m-0");
    } 
}

function checkEmail(email) {
    emailCheck = 0;
    for (const user in localUser) {
        if (Object.hasOwnProperty.call(localUser, user)) {
            const userCheck = localUser[user];
            if (userCheck.email === email.value) {
                emailCheck = 1;
            }
        }
    }
    if (emailCheck == 1) {
        document.getElementById('massageBoxEmail').classList.remove("d-none");
        email.classList.add("alert-filled");
        email.classList.add("m-0");
    }
}

function alertClassRemove(element, massageBox) {
    element.classList.remove("alert-filled");
    element.classList.remove("m-0");
    document.getElementById(`${massageBox}`).classList.add("d-none");
}

async function addUser(event) {
    event.preventDefault();
    let password = document.getElementById("password");
    let passwordConfirm = document.getElementById("passwordConfirm");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    checkName(name);
    checkEmail(email);
    if (nameCheck == 1) {
    } else {
        if (emailCheck == 1) {
        } else {
            if (password.value === passwordConfirm.value) {
                localStorage.setItem("activeUserName", `${name.value}`);
                localStorage.setItem("ableToUse", true);
                await setToFirebase(name.value,email.value,password.value);  
            } else {   
                document.getElementById('massageBox').classList.remove("d-none");
                passwordConfirm.classList.add("alert-filled");
                passwordConfirm.classList.add("m-0");
            }   
        }       
    }
}

async function setToFirebase(name,email,password) {
    let userData = {
        "name": name,
        "email": email,
        "password": password
    };
    await postUserData('users', userData);
}

function clearRegisterForm() {
    document.getElementById("password").value = '';
    document.getElementById("passwordConfirm").value = '';
    document.getElementById("email").value = '';
    document.getElementById("name").value = '';
}

async function postUserData(path = "", data) {
    try {
        let response = await fetch(BASE_URL + path + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        window.location.href = '../index.html';
    } catch (error) {
        console.error('Es gab einen Fehler beim Posten der Benutzerdaten:', error);
    }
}

function buttonEnabler() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("passwordConfirm");
    const signUpBtn = document.getElementById("signUp");
    const checkBox = document.getElementById("registerCheckbox");
    
    addEventListener("submit", event => {
        if (name.value.length <= 0 && email.value.length <= 0 && password.value.length <= 0 && confirmPassword.value.length <= 0 && checkBox.checked === false) {
            signUpBtn.disabled = true;
        }
        else {
            confirmPassword.addEventListener("keyup", ()=> {
                signUpBtn.classList.remove("disabledButton");
                signUpBtn.disabled = false;
            })
        }
    })
}


