/**
 * Firebase Realtime-Database URL
 */
const BASE_URL = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";
async function init(i) {
    let ableToUse = JSON.parse(localStorage.getItem("ableToUse"));
    if (ableToUse === false){
        await includeHTMLNoUser();
    } else {
        await includeHTML();}
    let sidebarLinkCovered = document.getElementById(`sidebarlink-${i}`);
    sidebarLinkCovered.classList.add(`bgActiveMenu`);
    if (i<=4){
        let futter = document.getElementById(`sidebarLinkMobile-${i}`);
        futter.classList.add(`bgActiveMenu`);
    }
}

function testingUser() {
    let ableToUse = JSON.parse(localStorage.getItem("ableToUse"));
    if (ableToUse === false){
        var link = document.getElementById("backLink");
        link.setAttribute('href', "../login.html");
    }
}

/**
 * Allows to use button to execute functions, e.g. Close overlay with Escape button
 */
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        let closeOpenAddTaskOverlay = document.getElementById('addTaskOverlay');
        if (closeOpenAddTaskOverlay && !closeOpenAddTaskOverlay.classList.contains("d-none")) {
            closeAddTaskOverlay();}
        let closeOpenTaskOverlay = document.getElementById('taskOverlay');
        if (closeOpenTaskOverlay && !closeOpenTaskOverlay.classList.contains("d-none")) {
            closeTaskOverlay();}
        let closeOpenContactOverlay = document.getElementById('contactOverlayWrapper');
        if (closeOpenContactOverlay && !closeOpenContactOverlay.classList.contains("d-none")) {
            closeContactOverlay();}
    }
});

/**
 * Checks if the css-class d-none is contained or not
 */
document.addEventListener('click', function(event) {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    let typeOnAddTaskOverlay = document.getElementById('outerTaskOverlayWrapper');
    if (addTaskOverlay && !addTaskOverlay.classList.contains('d-none')) {
        if (typeOnAddTaskOverlay && !typeOnAddTaskOverlay.contains(event.target) && !isAddTaskOverlayJustOpened) {
            closeAddTaskOverlay();
        }
    }
    let taskOverlay = document.getElementById('taskOverlay');
    let typeOnTaskOverlay = document.getElementById('taskOverlayWrapper');
    if (taskOverlay && !taskOverlay.classList.contains('d-none')) {
        if (typeOnTaskOverlay && !typeOnTaskOverlay.contains(event.target) && !isTaskOverlayJustOpened) {
            closeTaskOverlay();
        }
    }
    let closeOpenContactOverlay = document.getElementById('contactOverlay');
    let typeOnContactOverlay = document.getElementById('contactOverlayWrapper');
    if (closeOpenContactOverlay && closeOpenContactOverlay && !closeOpenContactOverlay.classList.contains("d-none")) {
            if (!typeOnContactOverlay.contains(event.target)&& !isContactOverlayJustOpened) {
                closeContactOverlay();
            }
    }
    let navbarOpenOrClose = document.getElementById("header-Navbar");
    if (navbarOpenOrClose && !navbarOpenOrClose.classList.contains("d-none")) {
        if (navbarOpenOrClose && !navbarOpenOrClose.contains(event.target)&& !isContactOverlayJustOpened) {
            navbarOpenOrClose.classList.add("d-none");
        }
    }
    let contactNavbarOpenOrClose = document.getElementById("contact-Navbar");
    if (contactNavbarOpenOrClose && !contactNavbarOpenOrClose.classList.contains("d-none")) {
        if (contactNavbarOpenOrClose && !contactNavbarOpenOrClose.contains(event.target)&& !isContactOverlayJustOpened) {
            contactNavbarOpenOrClose.classList.add("d-none");
        }
    }
});

document.addEventListener('input', function(event) {
    if (event.target.id === 'subtasks') {
        let noSubtask = document.getElementById('messageBoxSubtask');
        if (!noSubtask.classList.contains('d-none')) {
            noSubtask.classList.add('d-none');
        }
    }
});

/*
document.addEventListener('click', function(event) {
    const overlays = [
        { overlay: 'addTaskOverlay', wrapper: 'outerTaskOverlayWrapper', close: closeAddTaskOverlay, flag: 'isAddTaskOverlayJustOpened' },
        { overlay: 'taskOverlay', wrapper: 'taskOverlayWrapper', close: closeTaskOverlay, flag: 'isTaskOverlayJustOpened' },
        { overlay: 'contactOverlay', wrapper: 'contactOverlayWrapper', close: closeContactOverlay, flag: 'isContactOverlayJustOpened' }
    ];
    
    overlays.forEach(({ overlay, wrapper, close, flag }) => {
        const overlayElem = document.getElementById(overlay);
        const wrapperElem = document.getElementById(wrapper);
        if (overlayElem && !overlayElem.classList.contains('d-none') && wrapperElem && !wrapperElem.contains(event.target) && !window[flag]) {
            close();
        }
    });
    
    const navbars = [
        { id: 'header-Navbar' },
        { id: 'contact-Navbar' }
    ];
    
    navbars.forEach(({ id }) => {
        const navbar = document.getElementById(id);
        if (navbar && !navbar.classList.contains('d-none') && !navbar.contains(event.target) && !isContactOverlayJustOpened) {
            navbar.classList.add('d-none');
        }
    });
});
* */