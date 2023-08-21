// ⭐Задача 1 - ‘FizzBuzz’ через ітератор та генератор⭐
// ⭐за допомогою ітератора⭐


// Ітератор, що генерує послідовні числа від 1 до 100
function* numberIterator() {
	let num = 1;
	while (num <= 100) {
	  yield num; // Повертає поточне число з послідовності
	  num++;
	}
  }
  
  // Функція для перевірки кратності числа
  function checkDivisibility(number, divisor) {
	return number % divisor === 0; // Перевіряє, чи число кратне заданому дільнику
  }
  
  // Головна функція для виведення Fizz, Buzz, FizzBuzz або числа
  function fizzBuzzWithIterator() {
	const iterator = numberIterator(); // Створюємо ітератор
	for (const num of iterator) {
	  if (checkDivisibility(num, 15)) {
		console.log('FizzBuzz'); // Виводимо 'FizzBuzz', якщо число кратне 15
	  } else if (checkDivisibility(num, 3)) {
		console.log('Fizz'); // Виводимо 'Fizz', якщо число кратне 3
	  } else if (checkDivisibility(num, 5)) {
		console.log('Buzz'); // Виводимо 'Buzz', якщо число кратне 5
	  } else {
		console.log(num); // Виводимо саме число, якщо не виконується жодна умова
	  }
	}
  }
  
  // Виклик функції для виведення результатів
  fizzBuzzWithIterator();


// ⭐за допомогою генератора⭐


// Генератор для чисел від 1 до 100
function* numberGenerator() {
	let num = 1;
	while (num <= 100) {
	  yield num; // Повертає поточне число з послідовності
	  num++;
	}
  }
  
  // Функція для перевірки кратності числа
  function checkDivisibility(number, divisor) {
	return number % divisor === 0; // Перевіряє, чи число кратне заданому дільнику
  }
  
  // Генератор для Fizz, Buzz, FizzBuzz або числа
  function* fizzBuzzGenerator() {
	for (const num of numberGenerator()) {
	  if (checkDivisibility(num, 15)) {
		yield 'FizzBuzz'; // Повертає 'FizzBuzz', якщо число кратне 15
	  } else if (checkDivisibility(num, 3)) {
		yield 'Fizz'; // Повертає 'Fizz', якщо число кратне 3
	  } else if (checkDivisibility(num, 5)) {
		yield 'Buzz'; // Повертає 'Buzz', якщо число кратне 5
	  } else {
		yield num; // Повертає саме число, якщо не виконується жодна умова
	  }
	}
  }
  
  // Виклик генератора та виведення результатів
  const generator = fizzBuzzGenerator(); // Створюємо генератор
  for (const result of generator) {
	console.log(result); // Виводимо результати генерації на консоль
  }
  

// ⭐Задача 2 - генератор випадкових чисел⭐


// Оголошення функції-генератора
function* generateRandomNumbers(max, quantity) {
    // Цикл, який повторюється стільки разів, скільки чисел треба згенерувати
    for (let i = 0; i < quantity; i++) {
        // Генерація випадкового числа від 0 до `max`, включно
        yield Math.floor(Math.random() * (max + 1));
    }
}

const maxNumber = 100; // Максимальне значення рандомного числа
const numberOfRandomNumbers = 5; // Кількість рандомних чисел

// Створення генератора випадкових чисел з використанням функції-генератора
const randomNumbersGenerator = generateRandomNumbers(maxNumber, numberOfRandomNumbers);

// Ітерація через генератор та виведення отриманих випадкових чисел
for (const randomNum of randomNumbersGenerator) {
    console.log(randomNum);
}
