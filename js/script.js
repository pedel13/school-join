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
            closeAddTaskOverlay();
        }

        let closeOpenTaskOverlay = document.getElementById('taskOverlay');
        if (closeOpenTaskOverlay && !closeOpenTaskOverlay.classList.contains("d-none")) {
            closeTaskOverlay();
        }

        let closeOpenContactOverlay = document.getElementById('contactOverlayWrapper');
        if (closeOpenContactOverlay && !closeOpenContactOverlay.classList.contains("d-none")) {
            closeContactOverlay(evt);
        }
    }
});

document.addEventListener('click', function(event) {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    let typeOnAddTaskOverlay = document.getElementById('outerTaskOverlayWrapper');
    if (addTaskOverlay && !addTaskOverlay.classList.contains('d-none')) {
        if (!typeOnAddTaskOverlay.contains(event.target) && !isAddTaskOverlayJustOpened) {
            closeAddTaskOverlay();
        }
    }
    let taskOverlay = document.getElementById('taskOverlay');
    let typeOnTaskOverlay = document.getElementById('taskOverlayWrapper');
    if (taskOverlay && !taskOverlay.classList.contains('d-none')) {
        if (!typeOnTaskOverlay.contains(event.target) && !isTaskOverlayJustOpened) {
            closeTaskOverlay();
        }
    }
    let closeOpenContactOverlay = document.getElementById('contactOverlay');
    let typeOnContactOverlay = document.getElementById('contactOverlayWrapper');
    let typeOnContactOverlayMobile = document.getElementById('contactOverlayWrapperMobile');
    if (closeOpenContactOverlay && !closeOpenContactOverlay.classList.contains("d-none")) {
        if (document.documentElement.clientWidth > 1200) {
            console.log('Greater!');
                if (!typeOnContactOverlay.contains(event.target)&& !isContactOverlayJustOpened) {
                    closeContactOverlay(event);
          }
        }else{
            if (!typeOnContactOverlayMobile.contains(event.target)&& !isContactOverlayJustOpened) {
                closeContactOverlay(event);
            }
        }
    }
    let navbarOpenOrClose = document.getElementById("header-Navbar");
    if (navbarOpenOrClose && !navbarOpenOrClose.classList.contains("d-none")) {
        if (!navbarOpenOrClose.contains(event.target)&& !isContactOverlayJustOpened) {
            navbarOpenOrClose.classList.add("d-none");
        }
    }
    let contactNavbarOpenOrClose = document.getElementById("contact-Navbar");
    if (contactNavbarOpenOrClose && !contactNavbarOpenOrClose.classList.contains("d-none")) {
        if (!contactNavbarOpenOrClose.contains(event.target)&& !isContactOverlayJustOpened) {
            contactNavbarOpenOrClose.classList.add("d-none");
        }
    }
});