async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}
function hasClass(element, className) {
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
}

function templateNavbarOpenClose() {
    let navbarOpenOrClose = document.getElementById("header-Navbar");
    if (hasClass(navbarOpenOrClose,'d-none')) {
        navbarOpenOrClose.classList.remove("d-none");
    } else {
        navbarOpenOrClose.classList.add("d-none");
    }
}