async function addTask() {

    let inputs = getInputs();
    console.log(inputs);

}

function getInputs() {
    
    let title = document.getElementById('title');
    let description = document.getElementById('Description');
    let assignedTo = document.getElementById('selectInputAssignee');
    let date = document.getElementById('datePicker');
    let prio = document.getElementById('priority');
    let category = document.getElementById('categorySelect').value;
    let subtasks = document.getElementById('subtasks');
    return title, description, assignedTo, date, prio, category, subtasks;

}