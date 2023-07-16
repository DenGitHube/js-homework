'use strict';

// Функція для збереження результату в локальне сховище
function saveResult(startDate, endDate, result) {
  // Отримуємо попередні результати з локального сховища або створюємо новий пустий масив
  const results = JSON.parse(localStorage.getItem('results')) || []; 
  // Додаємо новий результат до масиву
  results.push({ startDate, endDate, result });
  // Зберігаємо оновлений масив результатів у локальне сховище, перетворивши його на рядок JSON
  localStorage.setItem('results', JSON.stringify(results));
}

// Функція для завантаження результатів з локального сховища і відображення їх у таблиці
function loadResults() {
  // Отримуємо результати з локального сховища або створюємо новий пустий масив
  const results = JSON.parse(localStorage.getItem('results')) || [];
  // Отримуємо посилання на HTML-таблицю за допомогою ідентифікатора
  const table = document.getElementById('results-table');

  // Проходимося по кожному результату і додаємо його до таблиці
  for (let i = 0; i < results.length; i++) {
    const newRow = table.insertRow(-1); // Створюємо новий рядок в таблиці

    // Створюємо комірки для початкової дати, кінцевої дати, результату і кнопки видалення
    const startDateCell = newRow.insertCell(0); // Створюємо комірку для початкової дати
    const endDateCell = newRow.insertCell(1);   // Створюємо комірку для кінцевої дати
    const resultCell = newRow.insertCell(2);    // Створюємо комірку для результату
    const deleteCell = newRow.insertCell(3);    // Створюємо комірку для кнопки видалення

    // Заповнюємо комірки значеннями з результатів
    startDateCell.innerHTML = results[i].startDate; // Заповнюємо комірку початкової дати значенням з результатів
    endDateCell.innerHTML = results[i].endDate;     // Заповнюємо комірку кінцевої дати значенням з результатів
    resultCell.innerHTML = results[i].result;       // Заповнюємо комірку результату значенням з результатів;

    // Створюємо кнопку видалення
    const deleteButton = document.createElement('button'); // Створюємо кнопку видалення
    deleteButton.innerHTML = 'Delete 🗑️';
    deleteButton.classList.add('delete-button'); // Додаємо клас до кнопки видалення
    deleteButton.setAttribute('data-index', i); // Встановлюємо атрибут "data-index" кнопки видалення з індексом результату
    deleteButton.addEventListener('click', deleteResult); // Додаємо обробник події на кнопку видалення

    // Додаємо кнопку видалення до комірки видалення
    deleteCell.appendChild(deleteButton);
  }
}

// ⚠️⚠️ Функція для видалення результату ⚠️⚠️
function deleteResult(event) {
  // Отримуємо індекс результату, який потрібно видалити
  const index = event.target.getAttribute('data-index');
  // Отримуємо результати з локального сховища
  const results = JSON.parse(localStorage.getItem('results')) || [];
  // Видаляємо результат з масиву за його індексом
  results.splice(index, 1);
  // Оновлюємо локальне сховище, зберігаючи оновлений масив результатів
  localStorage.setItem('results', JSON.stringify(results));

  // Отримуємо посилання на таблицю
  const table = document.getElementById('results-table');
  // Видаляємо рядок таблиці, на якому була натиснута кнопка видалення
  table.deleteRow(event.target.parentNode.parentNode.rowIndex);
}

// ⚠️⚠️ Функція для обчислення різниці в часі ⚠️⚠️
function calculateTime() {
  const startDate = document.getElementById('start-date').value; // Отримуємо значення початкової дати з HTML-форми
  const endDate = document.getElementById('end-date').value; // Отримуємо значення кінцевої дати з HTML-форми
  //const preset = document.getElementById('preset').value;
  //const options = document.getElementById('options').value;
  //const measure = document.getElementById('measure').value; // Отримуємо значення "measure" з HTML-форми

  // ⚠️⚠️ Перевірка на правильність дат ⚠️⚠️
  if (startDate > endDate) {
    alert('Початкова дата повинна бути раніше або рівною кінцевій даті');
    return;
  }

  const measure = document.getElementById('measure').value;

  // Конвертуємо початкову та кінцеву дати в об'єкти JavaScript Date і отримуємо їх час в мілісекундах
  const startTime = new Date(startDate).getTime(); 
  const endTime = new Date(endDate).getTime(); 

  // Обчислюємо різницю в часі
  const timeDiff = endTime - startTime;

  // Ініціалізуємо змінні для результату та одиниці виміру
  let result;
  let unit;

  // Вибираємо правильний розрахунок та одиницю виміру залежно від значення "measure"
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

  // Отримуємо посилання на таблицю
  const table = document.getElementById('results-table');
  // Створюємо новий рядок в таблиці
  const newRow = table.insertRow(-1);

  // Створюємо комірки для початкової дати, кінцевої дати, результату і кнопки видалення
  const startDateCell = newRow.insertCell(0); // Створюємо комірку для початкової дати
  const endDateCell = newRow.insertCell(1);   // Створюємо комірку для кінцевої дати
  const resultCell = newRow.insertCell(2);    // Створюємо комірку для результату
  const deleteCell = newRow.insertCell(3);    // Створюємо комірку для кнопки видалення

  // Заповнюємо комірки значеннями з результатів
  startDateCell.innerHTML = startDate;        // Заповнюємо комірку початкової дати значенням з форми
  endDateCell.innerHTML = endDate;            // Заповнюємо комірку кінцевої дати значенням з форми
  resultCell.innerHTML = result + ' ' + unit; // Заповнюємо комірку результату

  // Створюємо кнопку видалення
  const deleteButton = document.createElement('button');  // Створюємо кнопку видалення
  deleteButton.innerHTML = 'Delete 🗑️'; 
  deleteButton.classList.add('delete-button');            // Додаємо клас до кнопки видалення
  deleteButton.setAttribute('data-index', table.rows.length - 2); // Встановлюємо атрибут "data-index" кнопки видалення з індексом останнього рядка таблиці
  deleteButton.addEventListener('click', deleteResult);   // Додаємо обробник події на кнопку видалення

  // Додаємо кнопку видалення до комірки видалення
  deleteCell.appendChild(deleteButton);

  // Зберігаємо результат в локальне сховище
  saveResult(startDate, endDate, result + ' ' + unit);
}

// Функція, яка виконується при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
  loadResults(); // Завантажуємо результати з локального сховища і відображаємо їх у таблиці
});
