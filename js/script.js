function init() {

}

//Function show and hide belong together and are for the Join Logo
function show() {
    document.getElementById('big-logo').style.display = 'flex';
    document.getElementById('header').style.display = 'none';
    document.getElementById('loginWrapper').style.display = 'none';
    setTimeout("hide()", 2000);
}
function hide() {
    document.getElementById('big-logo').style.display = 'none';
    document.getElementById('header').style.display = 'flex';
    document.getElementById('loginWrapper').style.display = 'flex';
}