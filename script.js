// Функція для збереження результату в локальне сховище
function saveResult(startDate, endDate, result) {

  // Отримуємо попередні результати з локального сховища або створюємо новий пустий масив
  var results = JSON.parse(localStorage.getItem('results')) || [];

  // Додаємо новий результат до масиву
  results.push({ startDate: startDate, endDate: endDate, result: result });

  // Зберігаємо оновлений масив результатів у локальне сховище, перетворивши його на рядок JSON
  localStorage.setItem('results', JSON.stringify(results));
}

// Функція для завантаження результатів з локального сховища і відображення їх у таблиці
function loadResults() {

  // Отримуємо результати з локального сховища або створюємо новий пустий масив
  var results = JSON.parse(localStorage.getItem('results')) || [];

  // Отримуємо посилання на HTML-таблицю за допомогою ідентифікатора
  var table = document.getElementById('results-table');

  // Проходимося по кожному результату і додаємо його до таблиці
  for (var i = 0; i < results.length; i++) {

    // Створюємо новий рядок в таблиці
    var newRow = table.insertRow(-1);

    // Створюємо комірки для початкової дати, кінцевої дати, результату і кнопки видалення
    var startDateCell = newRow.insertCell(0);
    var endDateCell = newRow.insertCell(1);
    var resultCell = newRow.insertCell(2);
    var deleteCell = newRow.insertCell(3);

    // Заповнюємо комірки значеннями з результатів
    startDateCell.innerHTML = results[i].startDate;
    endDateCell.innerHTML = results[i].endDate;
    resultCell.innerHTML = results[i].result;

    // Створюємо кнопку видалення
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete 🗑️';
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-index', i);
    deleteButton.addEventListener('click', deleteResult);

    // Додаємо кнопку видалення до комірки видалення
    deleteCell.appendChild(deleteButton);
  }
}

// Функція для видалення результату
function deleteResult(event) {
  // Отримуємо індекс результату, який потрібно видалити
  var index = event.target.getAttribute('data-index');

  // Отримуємо результати з локального сховища
  var results = JSON.parse(localStorage.getItem('results')) || [];

  // Видаляємо результат з масиву за його індексом
  results.splice(index, 1);

  // Оновлюємо локальне сховище, зберігаючи оновлений масив результатів
  localStorage.setItem('results', JSON.stringify(results));

  // Отримуємо посилання на таблицю
  var table = document.getElementById('results-table');

  // Видаляємо рядок таблиці, на якому була натиснута кнопка видалення
  table.deleteRow(event.target.parentNode.parentNode.rowIndex);
}

// Функція для обчислення різниці в часі
function calculateTime() {
  // Отримуємо значення початкової дати, кінцевої дати, значення "preset", значення "options" і значення "measure" з HTML-форми
  var startDate = document.getElementById('start-date').value;
  var endDate = document.getElementById('end-date').value;
  var preset = document.getElementById('preset').value;
  var options = document.getElementById('options').value;
  var measure = document.getElementById('measure').value;

  // Конвертуємо початкову та кінцеву дати в об'єкти JavaScript Date і отримуємо їх час в мілісекундах
  var startTime = new Date(startDate).getTime();
  var endTime = new Date(endDate).getTime();

  // Обчислюємо різницю в часі
  var timeDiff = endTime - startTime;

  // Ініціалізуємо змінні для результату та одиниці виміру
  var result;
  var unit;

  // Вибираємо правильний розрахунок та одиницю виміру залежно від значення "measure"
  if (measure === 'days') {
    result = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    unit = 'днів';
  } else if (measure === 'hours') {
    result = Math.floor(timeDiff / (1000 * 60 * 60));
    unit = 'годин';
  } else if (measure === 'minutes') {
    result = Math.floor(timeDiff / (1000 * 60));
    unit = 'хвилин';
  } else if (measure === 'seconds') {
    result = Math.floor(timeDiff / 1000);
    unit = 'секунд';
  }

  // Отримуємо посилання на таблицю
  var table = document.getElementById('results-table');

  // Створюємо новий рядок в таблиці
  var newRow = table.insertRow(-1);

  // Створюємо комірки для початкової дати, кінцевої дати, результату і кнопки видалення
  var startDateCell = newRow.insertCell(0);
  var endDateCell = newRow.insertCell(1);
  var resultCell = newRow.insertCell(2);
  var deleteCell = newRow.insertCell(3);

  // Заповнюємо комірки значеннями з результатів
  startDateCell.innerHTML = startDate;
  endDateCell.innerHTML = endDate;
  resultCell.innerHTML = result + ' ' + unit;

  // Створюємо кнопку видалення
  var deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete 🗑️';
  deleteButton.classList.add('delete-button');
  deleteButton.setAttribute('data-index', table.rows.length - 2);
  deleteButton.addEventListener('click', deleteResult);

  // Додаємо кнопку видалення до комірки видалення
  deleteCell.appendChild(deleteButton);

  // Зберігаємо результат в локальне сховище
  saveResult(startDate, endDate, result + ' ' + unit);
}

// Функція, яка виконується при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function () {
  // Завантажуємо результати з локального сховища і відображаємо їх у таблиці
  loadResults();
});
