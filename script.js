let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const prioritySelect = document.getElementById('prioritySelect');

  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;
  const priority = prioritySelect.value;

  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      deadline: deadline,
      priority: priority,
      completed: false
    };
    tasks.push(task);
    saveTasks();
    taskInput.value = '';
    deadlineInput.value = '';
    prioritySelect.value = 'low';
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const prioritySelect = document.getElementById('prioritySelect');

    taskInput.value = task.text;
    deadlineInput.value = task.deadline;
    prioritySelect.value = task.priority;

    deleteTask(id);
  }
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    if (task.deadline !== '' && new Date(task.deadline) < new Date()) {
      taskElement.classList.add('overdue');
    }

    const priorityClass = `priority-${task.priority}`;
    taskElement.classList.add(priorityClass);

    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
      <span>${task.text}</span>
      <span class="deadline">${task.deadline !== '' ? `Deadline: ${task.deadline}` : ''}</span>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(taskElement);
  });
}

function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

renderTasks();
