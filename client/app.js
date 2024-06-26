var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List item

var createNewTaskElement = function (taskString, _id) {
  // create List Item
  var listItem = document.createElement("li");
  // input checkbox
  var checkBox = document.createElement("input");
  // label
  var label = document.createElement("label");
  // input (text)
  var editInput = document.createElement("input");
  // button.edit
  var editButton = document.createElement("button");
  // button.delete
  var deleteButton = document.createElement("button");

  //Each element needs modified

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;
  listItem.setAttribute("_id", _id);

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

// fetch tasks from api
async function fetchTasks() {
  const tasks = await fetch("http://localhost:4000/tasks");
  const data = await tasks.json();

  data.map(({ _id, task }) => {
    var listItem = createNewTaskElement(task, _id);
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  });
}
fetchTasks();

//Add a new task
var addTask = async function () {
  console.log("Add Task...");

  // create task from api
  const result = await fetch("http://localhost:4000/tasks/new", {
    method: "POST",
    body: JSON.stringify({ task: taskInput.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();

  //Create a new list item with the text from the #new-task:
  var listItem = createNewTaskElement(taskInput.value, data.task._id);
  //Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

//Edit an existing task
var editTask = async function () {
  console.log("Edit Task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  // if class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");

  const id = editInput.parentElement.getAttribute("_id");
  const result = await fetch(`http://localhost:4000/tasks/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ task: editInput.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(await result.json());
};

//Delete an existing task
var deleteTask = async function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul

  const id = this.parentNode.getAttribute("_id");
  await fetch(`http://localhost:4000/tasks/delete/${id}`, {
    method: "DELETE",
  });

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = async function () {
  console.log("Task Complete...");
  //When the Checkbox is checked
  //Append the task list item to the #completed-tasks ul

  const id = this.parentNode.getAttribute("_id");
  await fetch(`http://localhost:4000/tasks/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: true }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = async function () {
  console.log("Task Incomplete...");
  //When the checkbox is unchecked appendTo #incomplete-tasks

  const id = this.parentNode.getAttribute("_id");
  await fetch(`http://localhost:4000/tasks/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status: false }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // select listitems chidlren
  var checkBox = taskListItem.querySelector('input[type="checkbox"]');
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
