let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks on the page
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // Toggle completed state
        li.onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = (e) => {
            e.stopPropagation(); // Prevent toggle when deleting
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Add new task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    saveTasks();
    renderTasks();
    input.value = "";
}

// Load tasks when page opens
renderTasks();
