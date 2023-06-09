/* --⭐Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку:⭐ -- */

/*

const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];

const initials = userNames.map((name) => {      // userNames, містить три рядки з іменами, map створює новий масив з ініціалами
    return name.split(" ").map((part) => {      // split  розбиття рядка на окремі слова
      return part.charAt(0) + ".";              // charAt дає нам першу літеру слова та ми додаємо крапку 
    });
});                                    

console.log(initials); // [ "Г.П.А.", "П.О.І.", "Р.А.О."]   // console.log отримуємо відсортований масив з ініціалами для кожного імені

*/

/* --⭐Задача на розворот числа:⭐-- */

/*

const currentMaxValue = 4589;

let reverseMaxValue = String(currentMaxValue)  // я за допомогою string перетворив число currentMaxValue на рядок
.split("")  // розбиває рядок на окремі символи і буде містити окремі цифри числа
.reverse()  // перевертає порядок елементів у масиві
.join("");  // об'єднує всі елементи, а саме цифри числа назад у рядок

const reverseMaxValueNumber = Number(reverseMaxValue); // перетворює рядок назад у число за допомогою Number
console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number' 

*/

/* --⭐Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:⭐-- */

/*

const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

function calculateProduct(arr) {                    // приймає масив як аргумент і повертає обчислений добуток
    let product = 1;                                // змінна зі значенням 1
    
    for (let i = 0; i < arr.length; i++) {          // перевіряється, чи є arr масивом або числом
      if (Array.isArray(arr[i])) {                  // Якщо елемент є масивом то викликається функція calculateProduct з масивом arr[i]
        product *= calculateProduct(arr[i]);        // Результат помножується на змінну product
      } else {
        product *= arr[i];                          // Якщо елемент є числом, воно множиться на змінну product
      }
    }
    
    return product;                                 // Значення змінної product повертається з функції calculateProduct
  }
  
productOfArray = calculateProduct(resultsArray);    

console.log(productOfArray); // 24 

*/ 

// Буду вдячний якщо ви надасте мені додаткову літературу за допомогою якої я б зміг виконати це завдання краще.