async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        console.log(includeElements);
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        if (element.id === 'sideBarContainer' || element.id === 'header' || element.id ==='mobileNavBar') {
            console.log("element    : ", element);
            let resp = await fetch(file);
            if (resp.ok) {
                element.innerHTML = await resp.text();
            } else {
                element.innerHTML = 'Page not found';
            }
        }
    }
    document.getElementById("sideBarContainer").classList.remove("d-none");
}

async function includeHTMLNoUser() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        console.log(includeElements);
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        if (element.id === 'sidebarNoUserContainer' || element.id === 'header') {
            console.log("element    : ", element);
            let resp = await fetch(file);
            if (resp.ok) {
                element.innerHTML = await resp.text();
            } else {
                element.innerHTML = 'Page not found';
            }
        }
    }
    document.getElementById("sidebarNoUserContainer").classList.remove("d-none");
}

function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function templateNavbarOpenClose() {
    let navbarOpenOrClose = document.getElementById("header-Navbar");
    if (hasClass(navbarOpenOrClose,'d-none')) {
        navbarOpenOrClose.classList.remove("d-none");
        isContactOverlayJustOpened = true;
    setTimeout(() => { isContactOverlayJustOpened = false; }, 100);
    } else {
        navbarOpenOrClose.classList.add("d-none");
    }
}