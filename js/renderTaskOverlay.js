function renderTaskOverlay() {

}

function openTaskOverlay(taskId = "") {
    takeElementFromTask(taskId);
    subtaskLoop(taskId);
    document.getElementById('taskOverlay').classList.remove('d-none');
}

function closeTaskOverlay() {
    document.getElementById('taskOverlay').classList.add('d-none');
}

function takeElementFromTask(taskid) {
    let element = tasks[taskid];
    let categoryText = categoryFinder(element);
    console.log(element);
    renderTaskCardBig(element, categoryText);
}

function subtaskLoop(taskId) {
    let element = tasks[taskId];
    let subtasks = element.subtasks;
    subtasks.forEach(subtask => {
        renderSubTasks(subtask);
    });
}

function renderSubTasks(subtask) {
    document.getElementById('taskOverlayCheckbox').innerHTML += `
    <div class="checkBox">
    <input type="checkbox">
    <span>${subtask}</span>
</div>`
}

function renderTaskCardBig(element, categoryText) {
    document.getElementById('taskOverlay').innerHTML =
    `<div id="taskOverlayWrapper" class="taskOverlayWrapper slide-right">
    <div id="taskOverlayType" class="taskOverlayType">
        <div id="issueType" class="issueType ${element.categorySelect}">
            ${categoryText}
        </div>
        <img src="./img/icons/cancel-logo.png" alt="" onclick="closeTaskOverlay()">
    </div>

    <div id="taskOverlayTitle" class="taskOverlayTitle">
        ${element.title}
    </div>

    <div id="taskOverlayFacts" class="taskOverlayFacts">
        <p>${element.description}</p>
        <p>Due Date: ${element.datePicker}</p>
        <p>Priority: ${element.priority}</p>
    </div>

    <div id="taskOverlayAssignee" class="taskOverlayAssignee">
        Assigned to:
        <ul>
            <li>Patrick</li>
            <li>Farid</li>
        </ul>
    </div>

    <div id="taskOverlayCheckbox" class="taskOverlayCheckbox">
        <p>Subtasks:</p>
    </div>

    <div id="taskOverlayBottomEdit" class="taskOverlayBottomEdit">
        <a href="" class="editBar">
            <img src="./img/icons/delete_icon.png">
            <p>Delete</p>
        </a>

        <a href="" class="editBar">
            <img src="./img/icons/edit_icon.png">
            <p>Edit</p>
        </a>
    </div>
</div>`
}