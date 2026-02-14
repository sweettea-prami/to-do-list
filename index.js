document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const todoscontainer = document.querySelector('.todos-container');

    function updateContainerWidth() {
        todoscontainer.style.width =
            taskList.children.length > 0 ? "100%" : "50%";
    }

    const saveTaskToLocalStorage = () => {
        const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.querySelector('.checkbox').checked
        }));

        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (taskText, completed = false) => {
        if (!taskText) return;

        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" class="checkbox">
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="edit-btn">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const taskSpan = li.querySelector('span');

        checkbox.checked = completed;
        if (completed) {
            taskSpan.classList.add('completed');
        }

        checkbox.addEventListener('change', () => {
            taskSpan.classList.toggle('completed', checkbox.checked);
            saveTaskToLocalStorage();
        });

        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = taskSpan.textContent;
                li.remove();
                updateContainerWidth();
                saveTaskToLocalStorage();
            }
        });

        li.querySelector(".delete-btn").addEventListener('click', () => {
            li.remove();
            updateContainerWidth();
            saveTaskToLocalStorage();
        });

        taskList.appendChild(li);
        updateContainerWidth();
        saveTaskToLocalStorage();
    };

    const loadTasksFromLocalStorage = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        savedTasks.forEach(({ text, completed }) => {
            addTask(text, completed);
        });
    };

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        addTask(taskText);
        taskInput.value = "";
    });

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const taskText = taskInput.value.trim();
            addTask(taskText);
            taskInput.value = "";
        }
    });

    loadTasksFromLocalStorage(); 
});
