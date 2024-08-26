//Firebase Realtime-Database URL
const BASE_URL = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";
async function init() {
    await includeHTML();
}

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closeAddTaskOverlay();
        closeTaskOverlay();
        closeContactOverlay();
    }
    else if (evt.key === 'ArrowRight') {
        //Function
    }
    else if (evt.key === 'ArrowLeft') {
        //Function
    }
});