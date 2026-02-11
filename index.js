document.addEventListener('DOMContentLoaded', () => {

    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const todoscontainer = document.querySelector('.todos-container');

    function updateContainerWidth() {
        todoscontainer.style.width =
            taskList.children.length > 0 ? "100%" : "50%";
    }

    const addTask = (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
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
        const taskSpan=li.querySelector('span')
        checkbox.addEventListener('change', () => {

            taskSpan.classList.toggle('completed', checkbox.checked);
        });


        editBtn.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                updateContainerWidth();
            }
        });

        li.querySelector(".delete-btn").addEventListener('click', () => {
            li.remove();
            updateContainerWidth();
        });

        taskList.appendChild(li);
        taskInput.value = "";
        updateContainerWidth();
    };

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTask(e);
        }
    });

});
