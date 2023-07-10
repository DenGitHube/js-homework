'use strict';

// Отримання посилань 
const toggleButton = document.getElementById('toggleButton');   // Кнопка 
const statusMessage = document.getElementById('statusMessage'); // Повідомлення про час 
let isDarkMode = localStorage.getItem('isDarkMode') === 'true'; // Отримання значення змінної "isDarkMode" з локального сховища
let lastToggleTime = localStorage.getItem('lastToggleTime');    // Час останньої зміни

// Встановлення початкового стану
if (isDarkMode) {
  // Якщо "виключено"
  toggleButton.textContent = 'Turn off';      // Зміна тексту кнопки
  document.body.classList.add('dark-mode');   // Додавання темної теми
  showLastToggleTime();                       // Відображення часу останньої операції
} else {
  // Якщо "включено"
  toggleButton.textContent = 'Turn on';           // Зміна тексту кнопки
  document.body.classList.remove('dark-mode');    // Видалення темної теми
  showLastToggleTime();                           // Відображення часу останньої операції
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
  lastToggleTime = currentTime;
  localStorage.setItem('lastToggleTime', lastToggleTime);
  statusMessage.textContent = `Last toggle: ${lastToggleTime}`;
  localStorage.setItem('isDarkMode', isDarkMode);  // Збереження стану в локальне сховище
}

// Функція для відображення часу останньої операції
function showLastToggleTime() { 
  if (lastToggleTime) {
    // Якщо час існує
    statusMessage.textContent = `Last toggle: ${lastToggleTime}`; // Відображення повідомлення про час останньої операції
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
