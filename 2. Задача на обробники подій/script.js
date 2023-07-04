// Очікую завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
  // Отримання посилань 
  var toggleButton = document.getElementById('toggleButton');   // Кнопка 
  var statusMessage = document.getElementById('statusMessage'); // Повідомлення про час 
  var isOn = localStorage.getItem('isOn') === 'true';           // Отримання значення змінної "isOn" з локального сховища
  var timeElement = document.getElementById('time');            // Елемент для відображення поточного часу

  // Встановлення початкового стану
  setInitialState();

  // Додав обробника події на кнопку 
  toggleButton.addEventListener('click', toggleState);

  // Функція для встановлення початкового стану
  function setInitialState() {
    if (isOn) {
      // Якщо "включено"
      toggleButton.textContent = 'Turn off';                // Зміна тексту кнопки
      setBackgroundColor('white');                          // Зміна фону сторінки
      showLastTurnTime('lastTurnOffTime', 'Last turn off'); // Відображення часу останнього вимкнення
    } else {
      // Якщо "вимкнено"
      toggleButton.textContent = 'Turn on';               // Зміна тексту кнопки
      setBackgroundColor('gray');                         // Зміна фону сторінки
      showLastTurnTime('lastTurnOnTime', 'Last turn on'); // Відображення часу останнього ввімкнення
    }
  }

  // Функція для перемикання режиму
  function toggleState() {
    isOn = !isOn; // Зміна значення змінної "isOn"
    if (isOn) {
      // Якщо стан після зміни "включено"
      toggleButton.textContent = 'Turn off';            // Зміна тексту кнопки
      setBackgroundColor('white');                      // Зміна фону сторінки
      setCurrentTime('lastTurnOnTime', 'Last turn on'); // Збереження поточного часу в локальне сховище та відображення часу ввімкнення
    } else {
      // Якщо стан після зміни "вимкнено"
      toggleButton.textContent = 'Turn on';               // Зміна тексту кнопки
      setBackgroundColor('gray');                         // Встановлення фону сторінки
      setCurrentTime('lastTurnOffTime', 'Last turn off'); // Збереження поточного часу в локальне сховище та відображення часу вимкнення
    }
    localStorage.setItem('isOn', isOn.toString());      // Збереження стану в локальне сховище
    timeElement.style.color = isOn ? 'gray' : 'white';  // Зміна кольору тексту елементу timeElement залежно від стану
  }

  // Функція для встановлення кольору фону сторінки
  function setBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  // Функція для відображення часу останнього перемикання
  function showLastTurnTime(storageKey, message) {
    var lastTurnTime = localStorage.getItem(storageKey); // Отримання часу з локального сховища за заданим ключем
    if (lastTurnTime) {
      // Якщо час існує
      statusMessage.textContent = message + ': ' + lastTurnTime; // Відображення повідомлення про час останнього перемикання
    }
  }

  // Функція для збереження поточного часу в локальне сховище та відображення часу останнього перемикання
  function setCurrentTime(storageKey, message) {
    var currentTime = getCurrentTime();                       // Отримання поточного часу
    localStorage.setItem(storageKey, currentTime);            // Збереження поточного часу в локальне сховище за заданим ключем
    statusMessage.textContent = message + ': ' + currentTime; // Відображення повідомлення про час останнього перемикання
  }

  // Функція для отримання поточного часу у форматі "день-місяць-рік година:хвилина:секунда"
  function getCurrentTime() {
    var now = new Date();
    var day = ('0' + now.getDate()).slice(-2);
    var month = ('0' + (now.getMonth() + 1)).slice(-2);
    var year = now.getFullYear();
    var hours = ('0' + now.getHours()).slice(-2);
    var minutes = ('0' + now.getMinutes()).slice(-2);
    var seconds = ('0' + now.getSeconds()).slice(-2);
    return day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
  }
});
