'use strict';

function saveResult(startDate, endDate, result) {
  if (typeof Storage === 'undefined') {
    return;
  }

  const results = JSON.parse(localStorage.getItem('results')) || [];

  if (results.length >= 10) {
    results.shift(); // Видаляємо найстаріший результат, якщо кількість результатів перевищує 10
  }

  results.push({ startDate, endDate, result });
  localStorage.setItem('results', JSON.stringify(results));
}

function loadResults() {
  if (typeof Storage === 'undefined') {
    return;
  }

  const results = JSON.parse(localStorage.getItem('results')) || [];
  const table = document.getElementById('results-table');
  table.innerHTML = '';

  if (results.length === 0) {
    return;
  }

  // Виводимо не більше 10 останніх результатів
  const startIndex = Math.max(0, results.length - 10);
  for (let i = startIndex; i < results.length; i++) {
    const newRow = table.insertRow(-1);
    const startDateCell = newRow.insertCell(0);
    const endDateCell = newRow.insertCell(1);
    const resultCell = newRow.insertCell(2);
    const deleteCell = newRow.insertCell(3);

    startDateCell.innerHTML = results[i].startDate;
    endDateCell.innerHTML = results[i].endDate;
    resultCell.innerHTML = results[i].result;

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete 🗑️';
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-index', i);
    deleteButton.addEventListener('click', deleteResult);

    deleteCell.appendChild(deleteButton);
  }
}

function deleteResult(event) {
  const index = event.target.getAttribute('data-index');
  const results = JSON.parse(localStorage.getItem('results')) || [];
  results.splice(index, 1);
  localStorage.setItem('results', JSON.stringify(results));

  loadResults();
}

function calculateTime() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const measure = document.getElementById('measure').value;
  const options = document.getElementById('options').value;

  if (!startDate) {
    const today = new Date();
    document.getElementById('start-date').valueAsDate = today;
  }

  if (endDate === startDate) {
    return;
  }

  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  const timeDiff = endTime - startTime;

  let result;
  let unit;

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

  if ((options === 'weekdays' || options === 'weekends') && !startDate) {
    const today = new Date();
    const presetEndDate = new Date(today);

    if (options === 'weekdays') {
      while (presetEndDate.getDay() === 0 || presetEndDate.getDay() === 6) {
        presetEndDate.setDate(presetEndDate.getDate() + 1);
      }
    } else {
      while (presetEndDate.getDay() !== 0 && presetEndDate.getDay() !== 6) {
        presetEndDate.setDate(presetEndDate.getDate() + 1);
      }
    }

    document.getElementById('end-date').valueAsDate = presetEndDate;
    calculateTime();
    return;
  }

  if (options === 'weekdays') {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Викликаємо функцію, яка вираховує кількість будніх днів між датами
    const weekdays = getWeekdaysBetweenDates(startDateObj, endDateObj);

    result = weekdays.length - 1; // Виправлена логіка, віднімаємо 1 день

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

    // Викликаємо функцію, яка вираховує кількість вихідних днів між датами
    const weekends = getWeekendsBetweenDates(startDateObj, endDateObj);

    result = weekends.length;

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

  const table = document.getElementById('results-table');
  const newRow = table.insertRow(-1);
  const startDateCell = newRow.insertCell(0);
  const endDateCell = newRow.insertCell(1);
  const resultCell = newRow.insertCell(2);
  const deleteCell = newRow.insertCell(3);

  startDateCell.innerHTML = startDate;
  endDateCell.innerHTML = endDate;
  resultCell.innerHTML = result + ' ' + unit;

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete 🗑️';
  deleteButton.classList.add('delete-button');
  deleteButton.setAttribute('data-index', table.rows.length - 2);
  deleteButton.addEventListener('click', deleteResult);

  deleteCell.appendChild(deleteButton);

  saveResult(startDate, endDate, result + ' ' + unit);
}

function updateEndDateMin() {
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  if (endDateInput.value === startDateInput.value) {
    endDateInput.value = '';
  }

  endDateInput.min = startDateInput.value;
}

document.addEventListener('DOMContentLoaded', function () {
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  startDateInput.addEventListener('input', updateEndDateMin);
  endDateInput.addEventListener('input', function () {
    if (endDateInput.value < endDateInput.min) {
      endDateInput.value = '';
    }
  });

  const presetSelect = document.getElementById('preset');
  presetSelect.addEventListener('change', handlePresetChange);

  // Визиваємо функцію handlePresetChange для ініціалізації значення "Кінцева дата" на основі обраного пресету
  handlePresetChange();

  loadResults();
});

function handlePresetChange() {
  const presetValue = document.getElementById('preset').value;
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  let endDate;

  const startDate = new Date(startDateInput.value);

  switch (presetValue) {
    case 'week':
      endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());
      break;
    default:
      endDate = startDate;
      break;
  }

  endDateInput.valueAsDate = endDate;
}

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
