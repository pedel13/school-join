let localUser;
let counter = 0;

/**
 * Checks if the user is registered to allow the login procedere
 * @function login
 * @param {email} - The ID of the input field for e-mail address
 * @param {password} - The ID of the input field for password
 * @returns {boolean} - return a boolean and redirect to board-site
 */
async function login(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    for (const key in localUser) {
        const SINGLE_CONTACT = localUser[key];
        if (email === SINGLE_CONTACT.email) {counter ++;
            if (password === SINGLE_CONTACT.password) {
                let activeUserName = SINGLE_CONTACT.name;
                localStorage.setItem("ableToUse", true);
                localStorage.setItem("activeUserName", `${activeUserName}`);
                window.location.assign('./index.html');}
            else {
                counter = 0;}
        }
    }
    if (counter === 0) {wrongPassword();}
    counter = 0;
}

/**
 * Gives an alert for a wrong typed password
 * @function wrongPassword
 */
function wrongPassword() {
    let passwordInput = document.getElementById('password');
    document.getElementById('massageBoxEmail').classList.remove("d-none");
    passwordInput.classList.add("alert-filled");
}

/**
 * Clears the password input field after the password is typed in wrong
 * @function removeWrongPassword
 */
function removeWrongPassword(passwordInput) {
    document.getElementById('massageBoxEmail').classList.add("d-none");
    passwordInput.classList.remove("alert-filled");
}

/**
 * Allows a guest user login
 * @function guestLogin
 */
async function guestLogin() {
    localStorage.setItem("activeUserName", ``);
    localStorage.setItem("ableToUse", true);
    window.open("index.html", "_self");
}

/**
 * Fetches initially all user data from database
 * @function fetchUserData
 */
async function fetchUserData() {
    let response = await fetch(BASE_URL + '/users' + ".json");
    let responseToJson = await response.json();
    
    localUser = responseToJson;
}
/**
 * load your login page
 */
async function onloadLogin() {
    localStorage.clear();
    localStorage.setItem("ableToUse", false);
    await fetchUserData();
}
