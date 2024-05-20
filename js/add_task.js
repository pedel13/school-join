const baseUrl = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";


async function addTask() {
    await getInputs();
}

function getInputs() {
    let inputs = {
        "position": "board-task-on-to-do",
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value,
        "selectInputAssignee": document.getElementById('selectInputAssignee').value,
        "datePicker": document.getElementById('datePicker').value,
        "priority": document.getElementById('priority').value,
        "categorySelect": document.getElementById('categorySelect').value,
        "subtasks": document.getElementById('subtasks').value,
    };
    setTaskData("/tasks", inputs);
}

 async function setTaskData(path="", data={}) {
    let response = await fetch(baseUrl + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
} 