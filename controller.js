import { taskOperations } from "./task_operations.js";
import Task from "./task.js";
import { fireBaseOperations } from "./firebase-crud.js";


window.addEventListener("load", init);


function init() {
  bindEvents();
}




function bindEvents() {
  // document.querySelector('#add').addEventListener('click', addTask);

  document.querySelector("#save").addEventListener("click", saveToDBRealTime);
  document.querySelector('#loaddb').addEventListener('click', loadFromDBRealTime);

  document.querySelector("#myInput").addEventListener("keyup", searchFun);

  document.querySelector("#imgfile").addEventListener("change", loadFile);
}


function loadFile(event) {

  console.log(event.target)
  // let img = event.target.files[0].name
  // img = URL.createObjectURL(event.target.files[0]);
  let img = URL.createObjectURL(event.target.files[0]);


  console.log(img)
  // var i=img
  // return img
  addTask(img)
}

function saveToDBRealTime() {

  let tasks = taskOperations.getAllTask();
  console.log(tasks)
  tasks.forEach(task => {

    fireBaseOperations.add({ name: task.name, age: task.age, phone: task.phone, desc: task.desc, image: task.image });
  });
}




function loadFromDBRealTime() {
  var collection = fireBaseOperations.readRealTime();
  console.log('Collection is ', collection);
  collection.onSnapshot((snapShot) => {
    var tasks = snapShot.docs.map(d => {
      console.log(snapShot.docs[0].data())
      console.log('Doc is ', d);
      let doc = d.data();
      console.log(doc)
      return new Task(doc.name, doc.age, doc.phone, doc.desc, doc.image);
    });
    printTasks(tasks);
  });

}

function printTasks(tasks) {
  const tbody = document.querySelector("#tasks");
  tbody.innerHTML = "";
  console.log(tasks)
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

  tr.id = "row"
  // console.log(tr)

  let cellIndex = 0;

  // var x = 0;
  for (let key in task) {
    let value = task[key];
    let td = tr.insertCell(cellIndex);
    console.log(td)
    td.style.height = "70px";

    if (cellIndex == 4) {
      var imj = document.createElement('img');
      imj.src = value
      imj.style.height = "50px";
      imj.style.width = "50px";
      console.log(imj)
      let x = document.getElementById("myTable").rows.length
      console.log(x)

      let tableRow = document.getElementsByTagName("tr")[x - 1]
      console.log(tableRow)

      tableRow.getElementsByTagName('td')[4].appendChild(imj);
    }
    else {
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

