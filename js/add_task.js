let inputs = [];

async function addTask() {

    await getInputs();
    console.log(inputs);

}

function getInputs(inputs) {

    inputs[0] = document.getElementById('title').value;
    inputs[1] = document.getElementById('description').value;
    inputs[2] = document.getElementById('selectInputAssignee').value;
    inputs[3] = document.getElementById('datePicker').value;
    inputs[4] = document.getElementById('priority').value;
    inputs[4] = document.getElementById('categorySelect').value;
    inputs[6] = document.getElementById('subtasks').value;
    console.log(inputs);
    return inputs;

}