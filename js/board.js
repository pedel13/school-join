
//let = card-dragged-id;

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


  async function testdata() {
    let response = await fetch(baseUrl + "tasks" + ".json");
    return responseAsJson = await response.json();
}
