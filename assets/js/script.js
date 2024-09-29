const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];

// Save tasks to localStorage
const storeTasks = () => {
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
};

// Render the tasks to the DOM
const displayTasks = () => {
  taskList.innerHTML = ""; // Clear the current list
  tasksArray.forEach((taskObj, idx) => {
    const listItem = document.createElement("li");
    listItem.className = taskObj.done ? "completed-task" : "pending-task";
    listItem.innerHTML = `
      <span class="task-content">${taskObj.text}</span>
      <div class="action-buttons">
        <button onclick="toggleStatus(${idx})" class="btn-status">${
      taskObj.done ? "Undo" : "Complete"
    }</button>
        <button onclick="removeTask(${idx})" class="btn-delete">Delete</button>
      </div>
    `;
    taskList.appendChild(listItem);
  });
};

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    tasksArray.push({ text: taskText, done: false });
    storeTasks();
    displayTasks();
    taskInput.value = ""; // Clear the input field
  }
});

const toggleStatus = (idx) => {
  tasksArray[idx].done = !tasksArray[idx].done;
  storeTasks();
  displayTasks();
};

const removeTask = (idx) => {
  tasksArray.splice(idx, 1);
  storeTasks();
  displayTasks();
};

displayTasks(); // Initial rendering of tasks
