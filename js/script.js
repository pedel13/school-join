//Firebase Realtime-Database URL
const BASE_URL = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";
async function init(i) {
    let abelToUse = JSON.parse(localStorage.getItem("abelToUse"));
    if (abelToUse === false){
        await includeHTMLNoUser();
    }else {
        await includeHTML();}
    let sidebarlinkCofferd = document.getElementById(`sidebarlink-${i}`);
    sidebarlinkCofferd.classList.add(`bgActiveMenu`);
    if (i<=4){
        let futter = document.getElementById(`sidebarlinkMobail-${i}`);
        futter.classList.add(`bgActiveMenu`);
    }
}

function testingUser() {
    let abelToUse = JSON.parse(localStorage.getItem("abelToUse"));
    if (abelToUse === false){
        var link = document.getElementById("backLink");
        link.setAttribute('href', "../login.html");
    }
}

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
            closeContactOverlay();
        }
    }
});

document.addEventListener('click', function(event) {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    let tibeOnAddTaskOverlay = document.getElementById('outerTaskOverlayWrapper');
    if (addTaskOverlay && !addTaskOverlay.classList.contains('d-none')) {
        if (!tibeOnAddTaskOverlay.contains(event.target) && !isAddTaskOverlayJustOpened) {
            closeAddTaskOverlay();
        }
    }
    let taskOverlay = document.getElementById('taskOverlay');
    let tibeOnTaskOverlay = document.getElementById('taskOverlayWrapper');
    if (taskOverlay && !taskOverlay.classList.contains('d-none')) {
        if (!tibeOnTaskOverlay.contains(event.target) && !isTaskOverlayJustOpened) {
            closeTaskOverlay();
        }
    }
    let closeOpenContactOverlay = document.getElementById('contactOverlay');
    let tibeOnContactOverlay = document.getElementById('contactOverlayWrapper');
    if (closeOpenContactOverlay && !closeOpenContactOverlay.classList.contains("d-none")) {
        if (!tibeOnContactOverlay.contains(event.target)&& !isContactOverlayJustOpened) {
            closeContactOverlay();
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