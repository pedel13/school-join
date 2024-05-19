async function addTask() {

    await let inputs = getInputs();
    console.log(inputs);

}

function getInputs() {
    
    let title = document.getElementById('title');
    let description = document.getElementById('Description');
    let assignedTo = document.getElementById('selectInput');
    let date = document.getElementById('datePicker');
    let prio = document.getElementById('');
    let category = document.getElementById('assigneeInput');
    let subtasks = document.getElementById('subtasks');
    return title, description, assignedTo, date, prio, category, subtasks;

}