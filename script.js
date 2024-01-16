const addNew = document.getElementById("new-input");
const newButton = document.getElementById("new-btn");
const addTask = document.getElementById("add-btn");

let tasks = [];

newButton.addEventListener("click", () => {
    addNew.style.display = 'block';
    newButton.style.display = 'none';
});

addTask.addEventListener("click", () => {
    const taskInput = document.getElementById("task-input").value;
    const timeInput = document.getElementById("time-input").value;
    
    addNew.style.display = 'none';
    newButton.style.display = 'block';
    add(taskInput, timeInput);
});

function add(taskInput, timeInput) {
    let obj = {
        task: taskInput,
        time: timeInput,
    };

    tasks.push(obj);
    
    saveData();
    showTasks();
}

function showTasks() {
    let taskList = document.getElementById("list-task");
    let timeList = document.getElementById("list-time");
    let buttonList = document.getElementById("list-button");
    let message = document.getElementById("complete-message");

    taskList.innerHTML = '';
    timeList.innerHTML = '';
    buttonList.innerHTML = '';

    if (tasks.length === 0) {
        message.style.display = 'block';

    } else {
      message.style.display = 'none';
      tasks.forEach((task, index) => {
      if (task.task !== undefined && task.time !== undefined) {
        let taskElement = document.createElement("div");
        let timeElement = document.createElement("div");
        let completeButton = document.createElement("button")

        completeButton.textContent = 'Mark Complete';
        timeElement.textContent = `${task.time}`;
        taskElement.textContent = `${task.task}`;

        completeButton.classList.add("complete-button");
        timeElement.classList.add("time-element");
        taskElement.classList.add("task-element");

        completeButton.addEventListener("click", () => {
            completeButton.style.display = 'none';
            taskElement.style.display = 'none';
            tasks.splice(index, 1);
            
            saveData();
            showTasks();
        });

        timeList.appendChild(timeElement);
        buttonList.appendChild(completeButton);
        taskList.appendChild(taskElement);
        
      } else {
        tasks.splice(index, 1);
        saveData();
        showTasks();
      }
    });  
    }
  }

  function saveData() {
    localStorage.setItem("data", JSON.stringify(tasks));
  }

  function showData() {
    const storedData = localStorage.getItem("data");
    tasks = storedData ? JSON.parse(storedData) : [];
  }

  showData();
  showTasks();