import { taskOperations } from "./task_operations.js";
// import Task from "./task.js";
import { fireBaseOperations } from "./firebase-crud.js";


window.addEventListener("load", init);


function init() {
  bindEvents();
}




function bindEvents() {
  document.querySelector('#add').addEventListener('click', addTask);

  document.querySelector("#save").addEventListener("click", save);
  // document.querySelector('#loaddb').addEventListener('click',loadFromDBRealTime);

  document.querySelector("#myInput").addEventListener("keyup", searchFun);

  document.querySelector("#imgfile").addEventListener("change", loadFile);
}


function loadFile(event) {

  console.log(event.target)
  let img = event.target.files[0].name
  console.log(img)
  // var i=img
  // return img
  addTask(img)
}




function loadFromDBRealTime() {
  var collection = fireBaseOperations.readRealTime();
  console.log('Colleciton is ', collection);
  collection.onSnapshot((snapShot) => {
    var tasks = snapShot.docs.map(d => {
      console.log('Doc is ', d);
      let doc = d.data();

      return new Task(doc.name, doc.age, doc.phone, doc.desc);
    });
    printTasks(tasks);
  });

}

function printTasks(tasks) {
  const tbody = document.querySelector("#tasks");
  tbody.innerHTML = "";
  //tasks.forEach((task) => printTask(task));
  tasks.forEach(printTask);
}


function addTask(img) {
  let name = document.querySelector("#name").value;
  let age = document.querySelector("#age").value;
  let phone = document.querySelector("#phone").value;
  let desc = document.querySelector("#desc").value;
  let image = img
  console.log(image)

  const task = taskOperations.add(name, age, phone, desc, image);
  printTask(task);
  clearAll();
}






function printTask(task) {
  const tbody = document.querySelector("#tasks");
  const tr = tbody.insertRow();
  console.log(tr)
  tr.id = "row"
  let cellIndex = 0;
  for (let key in task) {
    let value = task[key];
    let td = tr.insertCell(cellIndex);
    console.log(td)


    td.style.height = "50px";
    // td.style.width = "50px";


    if (cellIndex == 4) {
      var img = document.createElement('img');
      img.src = value

      document.getElementsByTagName('td')[4].appendChild(img);


    }
    else{
      td.innerHTML = value;
    }
    

    cellIndex++;


  }

}




const clearAll = () =>
  document
    .querySelectorAll(".form-control")
    .forEach((txtBox) => (txtBox.value = ""));


const searchFun = () => {

  let filter = document.getElementById("myInput").value.toUpperCase();
  console.log(filter)
  let myTable = document.getElementById("myTable");

  let tr = myTable.getElementsByTagName("tr");
  console.log(tr)

  for (var i = 0; i < tr.length; i++) {

    let td = tr[i].getElementsByTagName("td")[0];
    console.log(td)
    if (td) {
      let textvalue = td.textContent || td.innerHTML;
      console.log(textvalue)
      if (textvalue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";

      }
      else {
        tr[i].style.display = "none";

      }
    }
  }
}


