let tasks;
let cardDraggedId;
let countOnToDo = 0;
let countOnInProgress = 0;
let countOnAwaitFeedback = 0;
let countOnDone = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(id) {
    cardDraggedId = id;
}

async function drop(position) {
    let dropCard = tasks[cardDraggedId];
    console.log("dropCard", dropCard);
    console.log("carddragid", cardDraggedId);
    dropCard["position"] = position;
    await updateTaskPosition(cardDraggedId, dropCard);
}

async function updateTaskPosition(taskId, updatedTask) {
    let response = await fetch(baseUrl + "taskpresent/tasks/" + taskId + 'position' + ".json", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
    });
    
    if (!response.ok) {
        console.error('Failed to update task position:', response.statusText);
    }
    let element = tasks[taskId];
    remuveDragedCard()
    let subtask = subtaskexist(element);
    let categoryText = categoryFinder(element);
    countDropetElement();
    renderTask(element,taskId, subtask, categoryText);
}

function remuveDragedCard() {
    const element = document.getElementById(cardDraggedId);
    element.remove();
}

function countDropetElement() {

}

async function loadTasks(){
    let response = await fetch(baseUrl + "taskpresent/tasks" + ".json");
    return await response.json();
}

async function renderAllTasks() {
    tasks = await loadTasks();
    
    for (let taskId in tasks) {
        
        let element = tasks[taskId];
        let subtask = subtaskexist(element);
        let categoryText = categoryFinder(element);
        countForNoTask(element.position);
        renderTask(element,taskId, subtask, categoryText);
    }
}

function subtaskexist(task){
    let subtask = "";
    if (task.subtasks == ""){
        subtask = "d-none";
    }
    else {
        subtask = "";
    }
    return subtask;
}

function categoryFinder(task){
    let categoryText =""
    if (task.categorySelect == "technical-task") {
        categoryText = "Technical Task";
    } else {
        categoryText = "User Story";
    }
    return categoryText;
}

function countForNoTask(positionFromCard){
    switch(positionFromCard){
        case "board-task-on-to-do":
            countOnToDo ++;
            break;
        
        case "board-task-on-in-progress":
            countOnInProgress ++;
            break;
        
        case "board-task-on-await-feedback":
            countOnAwaitFeedback ++;
            break;
        
        case "board-task-on-done":
            countOnDone ++;
            break;
    }
}

function renderTask(task,taskId, subtask, categoryText) {
    document.getElementById(task.position).innerHTML += `
    <div id="${taskId}" onclick="openTaskOverlay()" ondragstart="drag('${taskId}')" draggable="true" class="d-flex board-task-card flex-column">
    <div class="d-flex align-items-center">
      <p class="fc-white rounded-8 board-user d-flex align-items-center ${task.categorySelect}" id="">${categoryText}</p>
    </div>
    <div>
      <p class="board-card-subtitle" id="">${task.title}</p>
    </div>
    <div>
      <p class="board-description" id="">${task.description}</p>
    </div>
    <div class="d-flex align-items-center gap-10 ${subtask}" id="board-done-progressbar">
      <div class="board-progressbar-full rounded-8">
      <div class="board-progressbar rounded-8" style="width: 50%;">
          <!-- TODO: progressbar -->
      </div>
      </div>
      <div class="d-flex board-subtasks gap-4">
          <p> <!-- TODO: zählermethode -->1/2</p>
          <p>Subtasks</p>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div class="fc-white d-flex">
          <!-- TODO: Farbklasse dynamisch gestalten -->
          <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-orange -m-8">PW</p>
          <!-- TODO: user-icons printer funktion -->
          <p class="rounded-100 board-user-icon d-flex align-items-center justify-content-center bg-red -m-8">FF</p>
      </div>
      <div class="board-icon-importance">
          <!-- TODO: priority icon funktion -->
          <img src="./img/icons/low_icon.png" alt="">
      </div>
    </div>
    </div>`;
}