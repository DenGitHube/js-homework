// 1. Напишіть функцію "addThemAll" яка буде знаходити суму усіх своїх аргументів незалежно від їх кількості (але без використання вбудованого об'єкту Math). Використайте оператор розширення:

/*

function addThemAll (...args) {  // приймає довільну кількість аргументів
    let sum = 0; // змінна sum зі значенням нуль
    for (let i = 0; i < args.length; i++) { // створюю змінну-лічильник і 
                                            // "i < args.length" перевіряє, чи i є меншим за кількість аргументів у "args"
        sum += args[i]; // sum збільшується на значення поточного аргументу (args[i])
    }
    return sum; // повернення значення sum
}

console.log(addThemAll(2,4)); // 6
console.log(addThemAll(1,2,3,4)); // 10
console.log(addThemAll(5,5,10)); // 20

*/

// 2. Задача на використання замикання. Напишіть функцію яка працює таким чином: multiply(a)(b)// a * b

/*

console.log(multiply(5)(5))     // 25
console.log(multiply(2)(-2))    // -4
console.log(multiply(4)(3))	    // 12

function multiply(a) {
    return function(b) {
        return a * b;
    };
}

*/

// 3. Напишіть функцію яка буде використовуватись для сортування масиву фільмів.
//Функція буде приймати два аргументи:
    //Властивість за якою треба посортувати
    //Опцію напрямку сортування, зростання чи спадання

/*

const movies = [
    {
        movieName: 'The Thing',
        releaseYear: 1982,
        directedBy: 'Carpenter',
        runningTimeInMinutes: 109,
    },
    {
        movieName: 'Aliens',
        releaseYear: 1986,
        directedBy: 'Cameron',
        runningTimeInMinutes: 137,
    },
    {
        movieName: 'Men in Black',
        releaseYear: 1997,
        directedBy: 'Sonnenfeld',
        runningTimeInMinutes: 98,
    },
    {
        movieName: 'Predator',
        releaseYear: 1987,
        directedBy: 'McTiernan',
        runningTimeInMinutes: 107,
    }
];

function byProperty(property, direction) {
    return function(a, b) {
        if (direction === '>') {
            return a[property] - b[property];
        } else if (direction === '<') {
            return b[property] - a[property];
        } else {
            return 0;
        }
    };
}

console.log(movies.sort(byProperty('releaseYear', '>'))); // виведе масив фільмів посортованих по року випуску, від старішого до новішого
console.log(movies.sort(byProperty('runningTimeInMinutes', '<'))); // виведе масив фільмів посортованих по їх тривалості, від найдовшого до найкоротшого
console.log(movies.sort(byProperty('movieName', '>'))); // виведе масив фільмів посортованих по назві, в алфавітному порядку

*/

// 4. Напишіть функцію detonatorTimer(delay)
//Вона виводить в консоль число кожну секунду, починаючи з delay (ціле число) і в кінці замість 0 виведе 'BOOM!'. Напишіть її двома варіантами:
//Використовуючи setInterval
//Використовуючи вкладений setTimeout

/*

function detonatorTimer(delay) {
    let count = delay;
  
    const intervalId = setInterval(() => {  // setInterval створює затримку в 1 секунду або 1000 мілісекунд
      console.log(count); // виводиться поточне значення count у консоль
      count--; // зменшується на 1.
  
      if (count === 0) { // Перевіряється, чи count досягло значення 0. Якщо так - то відлік завершено
        clearInterval(intervalId); // setInterval очищається, щоб зупинити виконання функції
        setTimeout(() => { // функція яка виводить 'BOOM!'
          console.log('BOOM!'); // виводить 'BOOM!'
        }, 1000); // затримка 1 секунда
      }
    }, 1000); // затримка 1 секунда
  }
  
detonatorTimer(3);
// 3
// 2
// 1
// BOOM!

*/

// 5. Напишіть об'єкт в якому опишіть свої довільні властивості та довільні методи (2-3 штуки) що ці властивості виводять.

/*

let me = {
    name: 'Denis',
    residency: 'Dnipro',
    gender: 'male',
    age: 17,
    hobby: 'playing video games',
    defaultMood: 'focused',
    currentMood: 'sleepy',
    defaultMAXTemperature: '28°C',
    currentMINTemperature: '16°C',
    introduce() {
        console.log(`My name is ${this.name} and I live in ${this.residency}`);
    },
    prognose() {
        console.log(`I hope that next year I'm gonna be ${this.age+1}`);
    },
    describeMyMood() {
        console.log(`Mostly I'm ${this.defaultMood}, but now I'm ${this.currentMood}`);
    },
    describeAboutTemperature() {
        console.log(`Today it was a maximum of ${this.defaultMAXTemperature}, and the minimum temperature was ${this.currentMINTemperature}`);
    }
}

me.introduce();
me.prognose();
me.describeMyMood();
me.describeAboutTemperature();

*/

// 6. А тепер зробіть всі свої методи з задачі 5 прив'язаними до контексту свого об'єкту
// Аби вони були захищені від перезапису об'єкту і їх можна було викликати в таймері:

/*

let securedSelfIntroduce = me.introduce.bind(me);
let securedSelfPrognose = me.prognose.bind(me);
let securedSelfDescribeMyMood = me.describeMyMood.bind(me);
let securedSelfDescribeAboutTemperature = me.describeAboutTemperature.bind(me);

setTimeout(securedSelfIntroduce, 1000); // виведе коректний результат
setTimeout(securedSelfPrognose, 2000); // виведе коректний результат
setTimeout(securedSelfDescribeMyMood, 3000); // виведе коректний результат
setTimeout(securedSelfDescribeAboutTemperature, 4000); // виведе коректний результат

*/

// 7. Напишіть функцію-декоратор яка вповільнює виконання довільної функції на вказану кількість секунд.

/*

function someFunction(arg1, arg2) {
    console.log(arg1 + arg2);    // довільна функція яка виводить суму аргументів у консоль
}

function slower(func, seconds) {  // func (функція, яку треба вповільнити) і seconds (кількість секунд вповільнення)
    return function (...args) { // створює та повертає нову функцію
        console.log(`Chill out, you will get your result in ${seconds} seconds.`); // виводить текст
        setTimeout(() => { // затримка коду
            func.apply(this, args); // використовується для виклику функції
        }, seconds * 1000); // затримка
    };
}

let slowedSomeFunction = slower(someFunction, 5); // отримує результат виклику функції slower з аргументами someFunction і 5

slowedSomeFunction(2, 3); // виклик slowedSomeFunction з аргументами 2 і 3

// виведе в консоль "Chill out, you will get you result in 5 seconds"
//...через 5 секунд виведе результат роботи 'someFunction'

*/ 