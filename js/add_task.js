const baseUrl = "https://remotestorage-join189-default-rtdb.europe-west1.firebasedatabase.app/";

let inputs= [{}]

async function addTask() {
    await getInputs();
    console.log(inputs);
    setTaskData("/tasks");
}

function getInputs() {
    inputs = [{
        "title": document.getElementById('title').value,
        "description": document.getElementById('description').value,
        "selectInputAssignee": document.getElementById('selectInputAssignee').value,
        "datePicker": document.getElementById('datePicker').value,
        "priority": document.getElementById('priority').value,
        "categorySelect": document.getElementById('categorySelect').value,
        "subtasks": document.getElementById('subtasks').value,
    }];
}

 async function setTaskData(path="") {
    let response = await fetch(baseUrl + path + ".json",{
        method: "post",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    });
} 