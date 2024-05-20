let tasks;

//let = card-dragged-id;
function loadtasks() {
  renderAllTasks();
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(id) {
    //card-dragged-id = id;
    
  }
  
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

async function loadTasks(){
  let response = await fetch(baseUrl + "tasks" + ".json");
  return await response.json();
}

async function renderAllTasks() {
  tasks = await loadTasks();

  for (let taskId in tasks) {

      let task = tasks[taskId];
      let subtask = "";
      console.log("hallo");
      if (task.subtasks == ""){
        subtask = "d-none";
      }
      else {
        subtask = "";
      }
      let category = task.categorySelect;
      let categoryclass = "";//category.ToLowerCase(category);
      let categorytext = category.replace(/-/, " ");
      renderTask(task, subtask, categoryclass, categorytext);
  }
}

function renderTask(task, subtask, categoryclass, categorytext) {
  document.getElementById(task.position).innerHTML += `
  <div id="${tasks.taskId}" ondragstart="drag('${tasks.taskId}')" draggable="true" class="d-flex board-task-card flex-column">
  <div class="d-flex align-items-center">
      <p class="fc-white rounded-8 board-user d-flex align-items-center ${categoryclass}" id="">${categorytext}</p>
  </div>
  <div>
      <p class="board-card-subtitle" id="">${tasks.title}</p>
  </div>
  <div>
      <p class="board-description" id="">d${tasks.description}</p>
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