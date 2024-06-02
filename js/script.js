async function init() {
    includeHTML();
    await loadTasks();
    await loadUsers();
}

//Function show and hide belong together and are for the Join Logo
function showLogoAnimation() {
    document.getElementById('big-logo').style.display = 'flex';
    document.getElementById('header').style.display = 'none';
    document.getElementById('loginWrapper').style.display = 'none';
    setTimeout("hideLogoAnimation()", 1300);
}
function hideLogoAnimation() {
    document.getElementById('big-logo').style.display = 'none';
    document.getElementById('header').style.display = 'flex';
    document.getElementById('loginWrapper').style.display = 'flex';
}

document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        closeAddTaskOverlay();
        closeTaskOverlay();
    }
    else if (evt.key === 'ArrowRight') {
        //Function
    }
    else if (evt.key === 'ArrowLeft') {
        //Function
    }
});