'use strict';

// Отримання посилань
const toggleButton = document.getElementById('toggleButton');   // Кнопка
const statusMessage = document.getElementById('statusMessage'); // Повідомлення про час
let isDarkMode = localStorage.getItem('isDarkMode') === 'true'; // Отримання значення змінної "isDarkMode" з локального сховища
let lastTurnOffTime = localStorage.getItem('lastTurnOffTime'); // Час останнього вимкнення

// Встановлення початкового стану
if (isDarkMode) {
  // Якщо "виключено"
  toggleButton.textContent = 'Turn off';      // Зміна тексту кнопки
  document.body.classList.add('dark-mode');   // Додавання темної теми
  showLastTurnOffTime();                       // Відображення часу останнього вимкнення
} else {
  // Якщо "включено"
  toggleButton.textContent = 'Turn on';           // Зміна тексту кнопки
  document.body.classList.remove('dark-mode');    // Видалення темної теми
  showLastTurnOffTime();                           // Відображення часу останнього вимкнення
}

// Додав обробника події на кнопку
toggleButton.addEventListener('click', toggleState);

// Функція для перемикання режиму
function toggleState() {
  isDarkMode = !isDarkMode;   // Зміна значення змінної "isDarkMode"
  const currentTime = getCurrentTime();
  if (isDarkMode) {
    // Якщо стан після зміни "вимкнуто"
    toggleButton.textContent = 'Turn off';            // Зміна тексту кнопки
    document.body.classList.add('dark-mode');         // Додавання темної теми
  } else {
    //Якщо стан після зміни "увімкнено"
    toggleButton.textContent = 'Turn on';               // Зміна тексту кнопки
    document.body.classList.remove('dark-mode');        // Видалення темної теми
  }
  lastTurnOffTime = currentTime;
  localStorage.setItem('lastTurnOffTime', lastTurnOffTime);
  statusMessage.textContent = `Last toggle: ${lastTurnOffTime}`;
  localStorage.setItem('isDarkMode', isDarkMode);  // Збереження стану в локальне сховище
}

// Функція для відображення часу останнього вимкнення
function showLastTurnOffTime() {
  if (lastTurnOffTime) {
    // Якщо час існує
    statusMessage.textContent = `Last toggle: ${lastTurnOffTime}`; // Відображення повідомлення про час останнього вимкнення
  }
}

// Функція для отримання поточного часу у форматі "день-місяць-рік година:хвилина:секунда"
function getCurrentTime() {
  const now = new Date();
  const day = ('0' + now.getDate()).slice(-2);
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const year = now.getFullYear();
  const hours = ('0' + now.getHours()).slice(-2);
  const minutes = ('0' + now.getMinutes()).slice(-2);
  const seconds = ('0' + now.getSeconds()).slice(-2);
  return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
}
