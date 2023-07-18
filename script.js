'use strict';

// Функція для збереження результату в локальне сховище
function saveResult(startDate, endDate, result) {
  if (typeof Storage === 'undefined') {
    alert('Вибачте, але ваш браузер не підтримує локальне сховище.');
    return;
  }

  // Отримання результатів з локального сховища або створення нового масиву
  const results = JSON.parse(localStorage.getItem('results')) || [];
  // Додавання нового результату до масиву результатів
  results.push({ startDate, endDate, result });
  // Збереження оновленого масиву результатів у локальному сховищі
  localStorage.setItem('results', JSON.stringify(results));
}

// Функція для завантаження результатів з локального сховища і відображення їх у таблиці
function loadResults() {
  // Перевірка підтримки локального сховища в браузері
  if (typeof Storage === 'undefined') {
    alert('Вибачте, але ваш браузер не підтримує локальне сховище.');
    return;
  }

  // Отримання результатів з локального сховища або створення порожнього масиву
  const results = JSON.parse(localStorage.getItem('results')) || [];
  // Отримання посилання на таблицю результатів за допомогою її ідентифікатора
  const table = document.getElementById('results-table');
  // Очищення вмісту таблиці
  table.innerHTML = '';

  // Перевірка, чи є результати для відображення
  if (results.length === 0) {
    return;
  }

  // Прохід по масиву результатів та додавання їх у таблицю
  for (let i = 0; i < results.length; i++) {
    // Створення нового рядка у таблиці
    const newRow = table.insertRow(-1);
    // Створення комірок для початкової дати, кінцевої дати, результату та кнопки видалення
    const startDateCell = newRow.insertCell(0);
    const endDateCell = newRow.insertCell(1);
    const resultCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    // Заповнення комірок значеннями з масиву результатів
    startDateCell.innerHTML = results[i].startDate;
    endDateCell.innerHTML = results[i].endDate;
    resultCell.innerHTML = results[i].result;

    // Створення кнопки видалення
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete 🗑️';
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-index', i);
    deleteButton.addEventListener('click', deleteResult);

    // Додавання кнопки видалення до комірки видалення
    deleteCell.appendChild(deleteButton);
  }
}

// Функція для видалення результату
function deleteResult(event) {
  // Отримання індексу результату, який потрібно видалити
  const index = event.target.getAttribute('data-index');
  // Отримання масиву результатів з локального сховища або створення порожнього масиву
  const results = JSON.parse(localStorage.getItem('results')) || [];
  // Видалення результату з масиву за допомогою індексу
  results.splice(index, 1);
  // Збереження оновленого масиву результатів у локальному сховищі
  localStorage.setItem('results', JSON.stringify(results));

  // Поновлення відображення результатів у таблиці
  loadResults();
}

// Функція для обчислення різниці між двома датами
function calculateTime() {
  // Отримання значень початкової дати, кінцевої дати, одиниці виміру та опцій з відповідних елементів форми
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const measure = document.getElementById('measure').value;
  const options = document.getElementById('options').value;

  // Перевірка, чи початкова та кінцева дати не є однаковими
  if (endDate === startDate) {
    alert('Початкова і кінцева дати не можуть бути однаковими.');
    return;
  }

  // Перетворення початкової та кінцевої дат у мілісекунди
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  // Обчислення різниці часу між датами
  const timeDiff = endTime - startTime;

  let result;
  let unit;

  // Вирахування результату та одиниці виміру в залежності від обраної одиниці виміру
  switch (measure) {
    case 'days':
      result = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      unit = 'днів';
      break;
    case 'hours':
      result = Math.floor(timeDiff / (1000 * 60 * 60));
      unit = 'годин';
      break;
    case 'minutes':
      result = Math.floor(timeDiff / (1000 * 60));
      unit = 'хвилин';
      break;
    case 'seconds':
      result = Math.floor(timeDiff / 1000);
      unit = 'секунд';
      break;
  }

  // Перевірка обраної опції та модифікація результату та одиниці виміру, якщо потрібно
  if (options === 'weekdays') {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const weekdays = getWeekdaysBetweenDates(startDateObj, endDateObj);
    result = weekdays.length;

    // Модифікація результату та одиниці виміру для вибраної опції "Budnі dnі"
    if (measure === 'hours') {
      result *= 24;
      unit = 'годин';
    } else if (measure === 'minutes') {
      result *= 24 * 60;
      unit = 'хвилин';
    } else if (measure === 'seconds') {
      result *= 24 * 60 * 60;
      unit = 'секунд';
    }
  } else if (options === 'weekends') {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const weekends = getWeekendsBetweenDates(startDateObj, endDateObj);
    result = weekends.length;

    // Модифікація результату та одиниці виміру для вибраної опції "Vikhіdnі dnі"
    if (measure === 'hours') {
      result *= 24;
      unit = 'годин';
    } else if (measure === 'minutes') {
      result *= 24 * 60;
      unit = 'хвилин';
    } else if (measure === 'seconds') {
      result *= 24 * 60 * 60;
      unit = 'секунд';
    }
  }

  // Отримання посилання на таблицю результатів за допомогою її ідентифікатора
  const table = document.getElementById('results-table');
  // Створення нового рядка у таблиці
  const newRow = table.insertRow(-1);

  // Створення комірок для початкової дати, кінцевої дати, результату та кнопки видалення
  const startDateCell = newRow.insertCell(0);
  const endDateCell = newRow.insertCell(1);
  const resultCell = newRow.insertCell(2);
  const deleteCell = newRow.insertCell(3);

  // Заповнення комірок значеннями результату
  startDateCell.innerHTML = startDate;
  endDateCell.innerHTML = endDate;
  resultCell.innerHTML = result + ' ' + unit;

  // Створення кнопки видаленн
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete 🗑️';
  deleteButton.classList.add('delete-button');
  deleteButton.setAttribute('data-index', table.rows.length - 2);
  deleteButton.addEventListener('click', deleteResult);

  // Додавання кнопки видалення до комірки видалення
  deleteCell.appendChild(deleteButton);

  // Збереження результату в локальному сховищі
  saveResult(startDate, endDate, result + ' ' + unit);
}

// Функція для оновлення мінімального значення кінцевої дати
function updateEndDateMin() {
  // Отримання посилань на елементи вводу початкової та кінцевої дат
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  // Перевірка, чи співпадають значення початкової та кінцевої дат
  if (endDateInput.value === startDateInput.value) {
    endDateInput.value = '';
  }

  // Встановлення мінімального значення для кінцевої дати
  endDateInput.min = startDateInput.value;
}

// Обробник події завантаження сторінки
document.addEventListener('DOMContentLoaded', function () {
  // Отримання посилань на елементи вводу початкової та кінцевої дат
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  // Додавання обробників подій для валідації дат
  startDateInput.addEventListener('input', updateEndDateMin);
  endDateInput.addEventListener('input', function () {
    if (endDateInput.value < endDateInput.min) {
      endDateInput.value = '';
    }
  });

  // Отримання посилання на елемент вибору пресету
  const presetSelect = document.getElementById('preset');
  // Додавання обробника події для зміни вибраного пресету
  presetSelect.addEventListener('change', handlePresetChange);

  // Завантаження результатів з локального сховища та відображення їх у таблиці
  loadResults();
});

// Функція для обробки зміни вибраного пресету
function handlePresetChange() {
  // Отримання значення вибраного пресету
  const presetValue = document.getElementById('preset').value;
  // Отримання посилань на елементи вводу початкової та кінцевої дат
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');
  // Створення об'єкта з поточною датою
  const currentDate = new Date();
  // Встановлення значення початкової дати як поточної дати
  startDateInput.valueAsDate = currentDate;

  let endDate;

  // Вибір кінцевої дати в залежності від вибраного пресету
  switch (presetValue) {
    case 'week':
      endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
      break;
    default:
      endDate = currentDate;
      break;
  }

  // Встановлення значення кінцевої дати
  endDateInput.valueAsDate = endDate;
}

// Функція для отримання робочих днів між двома датами
function getWeekdaysBetweenDates(startDate, endDate) {
  const weekdays = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
      weekdays.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdays;
}

// Функція для отримання вихідних днів між двома датами
function getWeekendsBetweenDates(startDate, endDate) {
  const weekends = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      weekends.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekends;
}
