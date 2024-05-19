
//let = card-dragged-id;

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(id) {
    //card-dragged-id = id;
    
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
