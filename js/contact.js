function renderAddContactOverlay() {
    document.getElementById('addTaskOverlay').innerHTML = ''
    document.getElementById('addTaskOverlay').innerHTML = `
        <div class="outerTaskOverlayWrapper slide-top">
            <div class="addTaskOverlayHeadline">
                <h1>Add Task</h1>
                <img src="./img/icons/cancel-logo.png" alt="cancel" onclick="closeAddTaskOverlay()" title="Klick or press ESC to close">
            </div>
            <div id="innerTaskOverlayWrapper" class="innerTaskOverlayWrapper">

                <form class="main" onsubmit="addTask('${position}')">
                    <div id="addTaskWrapper" class="addTaskWrapper">
                        <div class="addTaskWrapperLeft">
                            <div>
                                <p class="fSize-16">Title<span class="redStar">*</span></p>
                                <input type="text" id="title" placeholder="Enter Title" required/>
                            </div>
    
                            <div class="spacer">&nbsp;</div>
    
                            <div>
                                <p class="fSize-16">Description</p>
                                <textarea rows="5" id="description" placeholder="Enter a Description"></textarea>
                            </div>
    
                            <div class="spacer">&nbsp;</div>
    
                            <div>
                                <p class="fSize-16">Assigned to</p>
                                <select name="choose" id="selectInputAssignee">
                                    <option value="Assigned to...">Assigned to...</option>
                                    <option value="Test 1">Test 1</option>
                                    <option value="Test 2">Test 2</option>
                                </select>
                            </div>
                        </div>
    
                        <div class="addTaskWrapperMid divider">&nbsp;</div>
    
                        <div class="addTaskWrapperRight">
                            <div>
                                <p class="fSize-16">Due Date<span class="redStar">*</span></p>
                                <input type="date" id="datePicker" required>
                            </div>
    
                            <div>
                                <p class="fSize-16">Prio</p>
                                <div id="priority" class="priority d-flex">
                                    <button id="urgentButton" type="button" onclick="prioButtonSelect('urgent')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                        Urgent
                                        <div id="addTaskPrioUrgent" class="priorityImg addTaskPrioUrgent"></div>
                                    </button>
                                    <button id="mediumButton" type="button" onclick="prioButtonSelect('medium')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                        Medium
                                        <div id="addTaskPrioMedium" class="priorityImg addTaskPrioMedium"></div>
                                    </button>
                                    <button id="lowButton" type="button" onclick="prioButtonSelect('low')" class="priorityButton d-flex align-items-center justify-content-evenly">
                                        Low
                                        <div id="addTaskPrioLow" class="priorityImg addTaskPrioLow"></div>
                                    </button>
                                </div>
                            </div>
    
                            <div>
                                <p class="fSize-16">Category<span class="redStar">*</span></p>
                                <select name="choose" id="categorySelect" required>
                                    <option value="" disabled selected>Select Category</option>
                                    <option value="technical-task">Technical-Task</option>
                                    <option value="user-story">User-Story</option>
                                </select>
                            </div>
    
                            <div>
                                <p class="fSize-16">Subtasks</p>
                                <div class="addTaskEnterSubtask d-flex align-items-center justify-content-between">
                                <input type="text" id="subtasks" placeholder="Enter Subtasks"/>
                                    <button class="d-flex" id="addTaskAddSubtaskButton" type="button" onclick="addSubtaskAddArray()">
                                            <div class="addTaskAdd"></div>
                                    </button>
                                </div>
                                <lu id="subtaskStorage"></lu>
                            </div>
                        </div>
                    </div>
    
                    <div id="addTaskBottom" class="addTaskBottom">
                        <p class="fSize-16">This field is required<span class="redStar">*</span></p>
    
                        <div id="createTaskButton">
                            <button type="button" onclick="clearAddTask()" id="clear">Clear <img src="./img/icons/cancel-logo.png" alt="" class="createTaskButtonImg"></button>
                            <button id="create">Create Task <img src="./img/icons/check-icon.png" alt="" class="createTaskButtonImg"></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `
}

function openAddContactOverlay(position='') {
    document.getElementById('addTaskOverlay').classList.remove('d-none');
    renderAddOverlay(position);
}

function createContact() {

}