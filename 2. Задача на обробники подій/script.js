// Очікую завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
  // Отримання посилань 
  const toggleButton = document.getElementById('toggleButton');   // Кнопка 
  const statusMessage = document.getElementById('statusMessage'); // Повідомлення про час 
  let isOn = localStorage.getItem('isOn') === 'true';           // Отримання значення змінної "isOn" з локального сховища
  const timeElement = document.getElementById('time');            // Елемент для відображення поточного часу
  let lastTurnOnTime = localStorage.getItem('lastTurnOnTime');
  let lastTurnOffTime = localStorage.getItem('lastTurnOffTime');

  // Додав обробника події на кнопку 
  toggleButton.addEventListener('click', toggleState);

  // Встановлення початкового стану
  setInitialState();

  // Функція для встановлення початкового стану
  function setInitialState() {
    if (isOn) {
      // Якщо "включено"
      toggleButton.textContent = 'Turn off';                // Зміна тексту кнопки
      document.body.classList.add('dark-mode');             // Додавання темної теми
      showLastTurnTime('lastTurnOffTime', 'Last turn off'); // Відображення часу останнього вимкнення
    } else {
      // Якщо "вимкнено"
      toggleButton.textContent = 'Turn on';               // Зміна тексту кнопки
      document.body.classList.remove('dark-mode');        //Видалення темної теми
      showLastTurnTime('lastTurnOnTime', 'Last turn on'); // Відображення часу останнього ввімкнення
    }
  }

  // Функція для перемикання режиму
  function toggleState() {
    isOn = !isOn; // Зміна значення змінної "isOn"
    const currentTime = getCurrentTime();
    if (isOn) {
      // Якщо стан після зміни "включено"
      toggleButton.textContent = 'Turn off';            // Зміна тексту кнопки
      document.body.classList.add('dark-mode');         // Видалення темної теми
      lastTurnOnTime = currentTime;
      localStorage.setItem('lastTurnOnTime', lastTurnOnTime);
      statusMessage.textContent = `Last turn on: ${lastTurnOnTime}`;
    } else {
      //Якщо стан після зміни "вимкнено"
      toggleButton.textContent = 'Turn on';               // Зміна тексту кнопки
      document.body.classList.remove('dark-mode');
      lastTurnOffTime = currentTime;
      localStorage.setItem('lastTurnOffTime', lastTurnOffTime);
      statusMessage.textContent = `Last turn off: ${lastTurnOffTime}`;
    }
    localStorage.setItem('isOn', isOn.toString());      // Збереження стану в локальне сховище
    timeElement.style.color = isOn ? 'gray' : 'white';  // Зміна кольору тексту елементу timeElement залежно від стану
  }

  // Функція для відображення часу останнього перемикання
  function showLastTurnTime(storageKey, message) {
    const lastTurnTime = localStorage.getItem(storageKey); // Отримання часу з локального сховища за заданим ключем
    if (lastTurnTime) {
      // Якщо час існує
      statusMessage.textContent = `${message}: ${lastTurnTime}`; // Відображення повідомлення про час останнього перемикання
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
});