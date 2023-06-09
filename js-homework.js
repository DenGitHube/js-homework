/* --⭐Задача на повернення ініціалів для кожного імені з масиву, посортованих в алфавітному порядку:⭐ -- */

/*const userNames = ["Петрик Ольга Іванівна", "Гнатюк Петро Антонович", "Рудко Андрій Опанасович"];
let initials = [];

for (let i = 0; i < userNames.length; i++) {
  const name = userNames[i];
  const parts = name.split(" "); // Розділити рядок імені на окремі частини за допомогою пробілів
  let initialsForName = "";

  for (let j = 0; j < parts.length; j++) {
    const part = parts[j];
    initialsForName += part.charAt(0) + "."; // Додати першу літеру кожної частини до рядку ініціалів
  }

  initials.push(initialsForName); // Додати рядок ініціалів до масиву ініціалів
}

console.log(initials); // ["П.О.І."", "Г.П.А."", "Р.А.О."] 

/* --⭐Задача на розворот числа:⭐-- /*

/* const currentMaxValue = 4589;
let reverseMaxValue; 

var num = 4589;

function getReversedNum(num) {
  let result = 0;
  while (num) {
    result = result * 10 + num % 10;
    num = Math.floor(num / 10);
  }
  return result;
}

console.log(getReversedNum(num));

console.log(reverseMaxValue); // 9854
console.log(typeof reverseMaxValue); // 'number' */ 

/* --⭐Задача на знаходження добутку масиву чисел з невідомою глибиною вкладеності:⭐-- */

/*const resultsArray = [1, 2, [3, [4]]];
let productOfArray;

let mult = 1;

for (let i=1; i<=4; i++) {
  mult = mult * i;
}

console.log(mult);
console.log(productOfArray); // 24      */