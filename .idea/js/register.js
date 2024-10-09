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

/**
 * Adds a new user after filled form and checks if everything is filled in properly
 * @function addUser
 */
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

/**
 * Adds the new user data
 * @function setToFirebase
 */
async function setToFirebase(name,email,password) {
    let userData = {
        "name": name,
        "email": email,
        "password": password
    };
    await postUserData('users', userData);
}

/**
 * Adds the new user data to the database
 * @function setToFirebase
 */
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