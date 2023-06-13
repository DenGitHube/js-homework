/* --⭐Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку:⭐ -- */

/*

const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];

const initials = userNames.map((name) => {      // userNames, містить три рядки з іменами, map створює новий масив з ініціалами
    return name.split(" ").map((part) => {      // split  розбиття рядка на окремі слова
      return part.charAt(0) + ".";              // charAt дає нам першу літеру слова та ми додаємо крапку 
    })
    .join(" ");                                 // Додає пробіл між ініціалами
  })
.sort();                                        // Сортуємо ініціали в алфавітному порядку

console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]  

*/

/* --⭐Задача на розворот числа:⭐-- */

/*

const currentMaxValue = 4589;

let reverseMaxValue = Number(String(currentMaxValue)  // я за допомогою string перетворив число currentMaxValue на рядок
.split("")  // розбиває рядок на окремі символи і буде містити окремі цифри числа
.reverse()  // перевертає порядок елементів у масиві
.join(""))  // об'єднує всі елементи, а саме цифри числа назад у рядок

const reverseMaxValueNumber = Number(reverseMaxValue); // перетворює рядок назад у число за допомогою Number
console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number' 

*/

/* --⭐Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:⭐-- */

/*

const resultsArray = [1, 2, [3, [4]]];

const flattenArray = resultsArray.flat(Infinity);                                                         // За допомогою flat та Infinity, ми розгортаємо resultsArray з будь-якою глибиною вкладеності, тому вийде щось як наприклад: [1, 2, 3, 4] 
const productOfArray = flattenArray.reduce((accumulator, currentValue) => accumulator * currentValue, 1); // обчислюємо добуток елементів flattenArray 

// я використав функцію з двох параметрів (accumulator і currentValue), ця функція множить поточне значення currentValue на accumulator на кожній ітерації, як я зрозумів початвове значення акумулятора задається як 1, тому-що якщо ми будемо множити на 1 то це не змінить результат

console.log(productOfArray); // 24 

*/