document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const completedTasksHeading = document.getElementById('comletedTasks');

    const tasks = [];

    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.classList.add('task-item');

        const textSpan = document.createElement('span');
        textSpan.classList.add('task-text');
        textSpan.textContent = taskText;

        const doneButton = document.createElement('img');
        doneButton.setAttribute("src", "./images/correct.png");
        doneButton.classList.add('task-done-button');
        doneButton.title = 'Mark as Done';

        const editButton = document.createElement('img');
        editButton.setAttribute("src", "./images/edit.png");
        editButton.classList.add('task-edit-button');
        editButton.title = 'Edit';

        const deleteButton = document.createElement('img');
        deleteButton.setAttribute("src", "./images/bin.png");
        deleteButton.classList.add('task-delete-button');
        deleteButton.title = 'Delete';

        const notDoneButton = document.createElement('img');
        notDoneButton.setAttribute("src", "./images/multiply.png");
        notDoneButton.classList.add('task-not-done-button');
        notDoneButton.title = 'Mark as Not Done';

        li.dataset.taskText = taskText;

        function markAsDone() {
            li.classList.add('done');
            li.classList.remove('not-done');
            doneButton.style.display = 'none';
            editButton.style.display = 'none';
            notDoneButton.style.display = 'inline';
            deleteButton.style.display = 'inline';
            completedTaskList.appendChild(li);
            tasks.find(task => task.text === taskText).completed = true;
            updateCompletedTasksHeading();
        }

        function markAsNotDone() {
            li.classList.remove('done');
            li.classList.add('not-done');
            doneButton.style.display = 'inline';
            editButton.style.display = 'inline';
            deleteButton.style.display = 'inline';
            notDoneButton.style.display = 'none';
            taskList.appendChild(li);
            tasks.find(task => task.text === taskText).completed = false;
            updateCompletedTasksHeading();
        }

        doneButton.addEventListener('click', markAsDone);

        editButton.addEventListener('click', () => {
            const newTaskText = prompt('Edit task:', textSpan.textContent);
            if (newTaskText) {
                textSpan.textContent = newTaskText;
                tasks.find(task => task.text === taskText).text = newTaskText;
                taskText = newTaskText;
            }
        });

        deleteButton.addEventListener('click', () => {
            li.remove();
            tasks.splice(tasks.findIndex(task => task.text === taskText), 1);
            updateCompletedTasksHeading();
        });

        notDoneButton.addEventListener('click', markAsNotDone);

        notDoneButton.style.display = 'none';
        li.classList.add('not-done');

        li.appendChild(textSpan);
        li.appendChild(doneButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        li.appendChild(notDoneButton);

        return li;
    }

    function updateCompletedTasksHeading() {
        const hasCompletedTasks = tasks.some(task => task.completed);
        completedTasksHeading.style.display = hasCompletedTasks ? 'block' : 'none';
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            taskList.appendChild(taskElement);
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            updateCompletedTasksHeading();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    updateCompletedTasksHeading();
});
