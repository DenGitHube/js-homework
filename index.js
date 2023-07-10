'use strict';

/**
 * Оголошуємо змінні з HTML елементами
 */
const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('.filter-input');
const form = document.querySelector('.create-task-form');

/**
 * Створюємо слухачі на необхідні нам події
 */
document.addEventListener('DOMContentLoaded', renderTasks);
clearBtn.addEventListener('click', clearAllTasks);
taskList.addEventListener('click', handleTaskActions);
form.addEventListener('submit', createTask);

/**
 * Отримуємо дані з localStorage
 * @return {[String]} - масив з задачами, або пустий масив, якщо localStorage пустий
 */
function getTasksFromLocalStorage() {
  return localStorage.getItem('tasks') !== null
    ? JSON.parse(localStorage.getItem('tasks'))
    : [];
}

/**
 * Записуємо дані в localStorage
 * @param {Array} tasks - масив з задачами
 */
function setTasksToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Створюємо окрему задачу
 * @param {String} task - окрема задача
 * @param {Number} taskId - унікальний ідентифікатор завдання
 */
function createSingleTaskElement(task, taskId) {
  // Створюємо HTML елемент li
  const li = document.createElement('li');
  // Додаємо елементу клас
  li.className = 'collection-item';
  // Кладемо в нього текстову ноду з задачею
  li.appendChild(document.createTextNode(task));

  // Створюємо обгортку для іконки по кліку на яку буде видалена окрема задача
  const deleteElement = document.createElement('span');
  // Додаємо елементу клас
  deleteElement.className = 'delete-item';
  // Кладемо в нього іконку
  deleteElement.innerHTML = '<i class="fa fa-remove"></i>';
  // Додаємо елемент в елемент списку
  li.appendChild(deleteElement);

  // Створюємо обгортку для іконки по кліку на яку буде редагування окремої задачі
  const editElement = document.createElement('span');
  // Додаємо елементу клас
  editElement.className = 'edit-item';
  // Кладемо в нього іконку
  editElement.innerHTML = '<i class="fa fa-edit"></i>';
  // Додаємо атрибут data-task-id з унікальним ідентифікатором завдання
  editElement.setAttribute('data-task-id', taskId);
  // Додаємо елемент в елемент списку
  li.appendChild(editElement);

  // Додаємо елемент списку в список завдань
  taskList.appendChild(li);
}

/**
 * Додаємо в DOM існуючі задачі
 */
function renderTasks() {
  // Отримуємо задачі з localStorage або пустий масив
  const tasks = getTasksFromLocalStorage();

  // Проходимо по масиву задач і додаємо кожну задачу в список, в DOM
  tasks.forEach((task) => {
    createSingleTaskElement(task.text, task.id);
  });
}

/**
 * Створюємо окрему задачу
 * @param {Event} event - The triggering event
 */
function createTask(event) {
  // Блокуємо дефолтний сабміт форми
  event.preventDefault();
  // Виходимо з функції якщо в полі немає тексту і видаляймо непотрібні пробіли до і після тексту
  if (taskInput.value.trim() === '') {
    return;
  }

  // Створюємо нову задачу і додаємо в DOM
  const newTask = {
    id: generateTaskId(),
    text: taskInput.value.trim(),
  };
  createSingleTaskElement(newTask.text, newTask.id);
  // Додаємо нову задачу в localStorage
  storeTaskInLocalStorage(newTask);
  // Очищуємо поле після додавання нової задачі в список
  taskInput.value = '';
}

/**
 * Додаємо нову створену задачу в localStorage
 * @param {Object} task - об'єкт із властивостями id та text
 */
function storeTaskInLocalStorage(task) {
  // Отримуємо поточні задачі з localStorage
  const tasks = getTasksFromLocalStorage();

  // Додаємо нову задачу в масив
  tasks.push(task);
  // Записуємо оновлений масив в localStorage
  setTasksToLocalStorage(tasks);
}

/**
 * Видаляємо всі задачі з localStorage та з DOM
 */
function clearAllTasks() {
  // Показуємо користувачу модальне вікно для підтвердження видалення всіх задач
  if (confirm('Ви впевнені що хочете видалити всі задачі?')) {
    // Якщо користувач підтверджує, то видаляємо всі задачі з localStorage та з DOM
    localStorage.clear();
    taskList.innerHTML = '';
  }
}

/**
 * Видаляє окрему задачу з localStorage та з DOM
 * @param {Element} deleteIcon - елемент із класом 'delete-item'
 */
function handleTaskActions(event) {
  const deleteIcon = event.target.closest('.delete-item');
  const editIcon = event.target.closest('.edit-item');
  if (deleteIcon) {
    handleDeleteTask(deleteIcon);
  } else if (editIcon) {
    handleEditTask(editIcon);
  }
}

/**
 * Видаляє окрему задачу з localStorage та з DOM
 * @param {Element} deleteIcon - елемент із класом 'delete-item'
 */
function handleDeleteTask(deleteIcon) {
  // Отримуємо батьківський елемент елементу на якому була подія кліку
  const taskItem = deleteIcon.parentElement;
  // Отримуємо ідентифікатор задачі
  const taskId = taskItem.querySelector('.edit-item').getAttribute('data-task-id');

  // Отримуємо поточні задачі з localStorage
  const tasks = getTasksFromLocalStorage();
  // Видаляємо задачу з масиву за ідентифікатором
  const updatedTasks = tasks.filter((task) => task.id !== parseInt(taskId));
  // Оновлюємо масив задач в localStorage
  setTasksToLocalStorage(updatedTasks);

  // Видаляємо елемент з DOM
  taskItem.remove();
}

/**
 * Редагує текст окремої задачі
 * @param {Element} editIcon - елемент із класом 'edit-item'
 */
function handleEditTask(editIcon) {
  // Отримуємо батьківський елемент елементу на якому була подія кліку
  const taskItem = editIcon.parentElement;
  // Отримуємо ідентифікатор задачі
  const taskId = editIcon.getAttribute('data-task-id');

  // Отримуємо поточні задачі з localStorage
  const tasks = getTasksFromLocalStorage();
  // Знаходимо задачу за ідентифікатором
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (task) {
    const newTaskText = prompt('Введіть новий текст завдання:', task.text);
    if (newTaskText !== null) {
      task.text = newTaskText.trim();
      // Оновлюємо задачу в localStorage
      setTasksToLocalStorage(tasks);
      // Оновлюємо текст задачі в DOM
      taskItem.firstChild.textContent = task.text;
    }
  }
}

/**
 * Генерує унікальний ідентифікатор для задачі
 * @return {Number} - унікальний ідентифікатор
 */
function generateTaskId() {
  const tasks = getTasksFromLocalStorage();
  return tasks.length > 0
    ? Math.max(...tasks.map((task) => task.id)) + 1
    : 1;
}
