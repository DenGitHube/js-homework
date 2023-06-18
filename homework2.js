// ⭐ 1. Задача про обчислення різниці часу ⭐ 

/*

function durationBetweenDates(start_date = new Date(), end_date = new Date(), dimension = 'seconds') {
  const startDateObj = new Date(start_date);    // представляє початкову дату
  const endDateObj = new Date(end_date);        // представляє кінцеву дату
  const timeDiff = Math.abs(endDateObj - startDateObj); // обчислюється різниця між кінцевою і початковою датами (в мілісекундах)
                                                        // Math.abs знаходить більшу дату 
  let duration;

  switch (dimension) {          // оператор для вибору розмірності
    case 'days':                // обчислюється кількість днів, які пройшли між датами
      duration = timeDiff / (1000 * 60 * 60 * 24);
      break;
    case 'hours':               // обчислюється кількість годин, які пройшли між датами
      duration = timeDiff / (1000 * 60 * 60);
      break;
    case 'minutes':             // обчислюється кількість хвилин, які пройшли між датами
      duration = timeDiff / (1000 * 60);
      break;
    case 'seconds':             // обчислюється кількість секунд, які пройшли між датами, але секунди стоять по дефолту
    default:  
      duration = timeDiff / 1000;
      break;
  }

  return `${Math.floor(duration)} ${dimension}`;
}

// Приклади використання:
console.log(durationBetweenDates('02 Aug 1985', '03 Aug 1985', 'seconds')); // виведе '86400 seconds'
console.log(durationBetweenDates('31 Jan 2022', '03 Feb 2021', 'days'));    // виведе '362 days'

*/

// ⭐ 2. Задача про перетворення об'єкту ⭐

/*

const priceData = {
Apples: '23.4',
BANANAS: '48',
oRAngGEs: '48.7584', };

function optimizer(data) {  // optimizer приймає об'єкт data як параметр
    const updatedData = {}; // updatedData бкде містити оновлені дані про ціни
  
    for (const key in data) {                           // розпочинає цикл де key є змінною, яка буде містити значення ключа на кожному повторенню циклу
      const lowerCaseKey = key.toLowerCase();           // перетворення ключа на нижній регістр
      updatedData[lowerCaseKey] = parseFloat(data[key]).toFixed(2);   // data[key] перетворюється на число за допомогою parseFloat()
                                                                      // toFixed(2) заокругює ціну до двох знаків після коми
    }
  
    return updatedData;     // повернення оновленого об'єкту updatedData 
  }
  
  let updatedPriceData = optimizer(priceData);
  console.log(updatedPriceData); // виведе {apples: '23.40', bananas: '48.00', oranges: '48.76'}
  
*/

// ⭐ 3. Задача про рекурсію та ітерацію ⭐ 

/*

function recursiveOddSumTo(number) {
    if (number <= 0) {      // перевірка number менше або дорівнює нулю
      return 0;             // якщо число менше або дорівнює нулю то повертаємо 0, бо немає непарних чисел для додавання
    }
  
    if (number % 2 === 1) {                             // перевірка чи number є непарним числом
      return number + recursiveOddSumTo(number - 2);    // Якщо число непарне, то ми повертаємо число та віднімаємо 2
    } else {                                            // Якщо number є парним числом 
      return recursiveOddSumTo(number - 1);             // то зменшуємо на 1 
    }
  }
  
console.log(recursiveOddSumTo(1));  // 1
console.log(recursiveOddSumTo(10)); // 25 

*/

/*

function iterativeOddSumTo(number) {
  let sum = 0; // створюється змінна sum та задається значення 0, ця змінна буде використовуватись для накопичення суми непарних чисел
  
  for (let i = 1; i <= number; i += 2) {    // задаю змінну 'i' зі значенням 1, яка відповідає першому непарному числу
                                            // цикл виконуватиметься, поки 'i' не перевищить задане число
                                            // перехід до наступного непарного числа, тому що потрібно пропустити парні числа
    sum += i;   // кожне непарне число 'i' додається до змінної sum, використовуючи оператор '+='
  }
  
  return sum;   // повернення значення змінної sum
}

console.log(iterativeOddSumTo(1));  // 1
console.log(iterativeOddSumTo(10)); // 25

*/