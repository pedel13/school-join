//Firebase Realtime-Database URL
const BASE_URL = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";
async function init() {
    await includeHTML();
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
    /*else if (evt.key === 'ArrowRight') {
        //Function
    }
    else if (evt.key === 'ArrowLeft') {
        //Function
    }*/
});

document.addEventListener('click', function(event) {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    let tibeOnAddTaskOverlay = document.getElementById('outerTaskOverlayWrapper');
    if (addTaskOverlay && !addTaskOverlay.classList.contains('d-none')) {
        if (!tibeOnAddTaskOverlay.contains(event.target) && !isAddTaskOverlayJustOpened) {
            closeAddTaskOverlay();
        }
    }
    taskOverlayWrapper
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
});