const form = document.querySelector(".form");
const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#description");
const app = document.querySelector(".app");

const taskList = document.createElement("div");
taskList.className = "task-list";
app.appendChild(taskList);

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const item = document.createElement("div");
        item.className = "task-item";
        item.innerHTML = `
            <div class="task-text">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        item.querySelector(".delete").addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        item.querySelector(".edit").addEventListener("click", () => {
            titleInput.value = task.title;
            descInput.value = task.description;
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(item);
    });
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    if (!title) return;

    const newTask = { title, description };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    titleInput.value = "";
    descInput.value = "";
});

renderTasks();
