'use strict';

/*
function customMap(array, callback) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array));
  }
  return newArray;
}

// Приклад використання
var numbers = [1, 2, 3, 4, 5];
var doubled = customMap(numbers, function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]
*/

/*
// 1) Клас-предок
class Entity {
  // Конструктор класу, приймає параметр name
  constructor(name) {
    // Присвоюємо значення параметра name до властивості name об'єкта
    this.name = name;
    // Встановлюємо значення "Private property" для приватної властивості privateProperty
    this.privateProperty = "Private property";
  }

  // Спільний метод, який виводить повідомлення
  sharedMethod() {
    console.log("This is a shared method.");
  }
}

// 2) Класи-сутності (тварини)
class Animal extends Entity {
  // Конструктор класу, приймає параметри name, age, species
  constructor(name, age, species) {
    // Виклик конструктора батьківського класу і передача параметра name
    super(name);
    // Присвоюємо значення параметра age до властивості age об'єкта
    this.age = age;
    // Присвоюємо значення параметра species до властивості species об'єкта
    this.species = species;
  }

  // Метод, який виводить повідомлення про їжу
  eat(food) {
    console.log(`${this.name} is eating ${food}.`);
  }

  // Метод, який виводить повідомлення про сон
  sleep() {
    console.log(`${this.name} is sleeping.`);
  }

  // Унікальний метод для підкласу Animal, який виводить повідомлення про унікальну властивість
  uniqueProperty() {
    console.log(`Unique property for ${this.name}`);
  }
}

// Клас-потомок Dog успадковує властивості та методи від Animal
class Dog extends Animal {
  // Конструктор класу, приймає параметри name, age, breed
  constructor(name, age, breed) {
    // Виклик конструктора батьківського класу і передача параметрів name, age, "Dog"
    super(name, age, "Dog");
    // Присвоюємо значення параметра breed до властивості breed об'єкта
    this.breed = breed;
  }

  // Метод, який виводить повідомлення про гавкання
  bark() {
    console.log("Woof! Woof!");
  }

  // Унікальний метод для підкласу Dog
  uniqueMethod() {
    console.log(`Unique method for ${this.name}`);
  }
}

// Клас-потомок Cat успадковує властивості та методи від Animal
class Cat extends Animal {
  // Конструктор класу, приймає параметри name, age, color
  constructor(name, age, color) {
    // Виклик конструктора батьківського класу і передача параметрів name, age, "Cat"
    super(name, age, "Cat");
    // Присвоюємо значення параметра color до властивості color об'єкта
    this.color = color;
  }

  // Метод, який виводить повідомлення про мяукання
  meow() {
    console.log("Meow!");
  }

  // Унікальний метод для підкласу Cat
  uniqueMethod() {
    console.log(`Unique method for ${this.name}`);
  }
}

// Клас-потомок Bird успадковує властивості та методи від Animal
class Bird extends Animal {
  // Конструктор класу, приймає параметри name, age, type
  constructor(name, age, type) {
    // Виклик конструктора батьківського класу і передача параметрів name, age, "Bird"
    super(name, age, "Bird");
    // Присвоюємо значення параметра type до властивості type об'єкта
    this.type = type;
  }

  // Метод, який виводить повідомлення про польот
  fly() {
    console.log(`${this.name} is flying.`);
  }

  // Унікальний метод для підкласу Bird
  uniqueMethod() {
    console.log(`Unique method for ${this.name}`);
  }
}

// Приклад використання створених класів і об'єктів
const dog = new Dog("Buddy", 3, "Labrador");
const cat = new Cat("Whiskers", 5, "Orange");
const bird = new Bird("Tweety", 2, "Canary");

dog.sharedMethod(); // Виклик спільного методу класу Entity
cat.sharedMethod(); // Виклик спільного методу класу Entity

dog.bark(); // Метод тільки для собаки
cat.meow(); // Метод тільки для кота
bird.fly(); // Метод тільки для птаха

dog.uniqueMethod(); // Унікальний метод для собаки
cat.uniqueMethod(); // Унікальний метод для кота
bird.uniqueMethod(); // Унікальний метод для птаха

console.log(dog.privateProperty); // Доступ до приватної властивості класу Entity
console.log(cat.privateProperty); // Доступ до приватної властивості класу Entity
console.log(bird.privateProperty); // Доступ до приватної властивості класу Entity
*/

class AnimalPokemon {
  catchBall() {
    return `${this.name} was caught with a ball!`;
  }
}

class Animal extends AnimalPokemon {
  constructor(name, age, species) {
    super();
    this.name = name;
    this.age = age;
    this.species = species;
    this.sound = "Roar"; // Унікальна властивість для Тварини
    this._isSleeping = false; // Приватна властивість для Тварини
  }

  makeSound() {
    return `${this.name} says ${this.sound}!`;
  }

  eatFood() {
    return `${this.name} is eating.`;
  }

  sleep() {
    this._isSleeping = true;
    return `${this.name} is sleeping now.`;
  }
}

class Pokemon extends AnimalPokemon {
  constructor(name, level, type) {
    super();
    this.name = name;
    this.level = level;
    this.type = type;
    this.ability = "Thunderbolt"; // Унікальна властивість для Покемона
    this._experiencePoints = 0; // Приватна властивість для Покемона
  }

  attack() {
    return `${this.name} uses Quick Attack!`;
  }

  useAbility() {
    return `${this.name} uses ${this.ability}!`;
  }

  train() {
    this._experiencePoints += 10;
    return `${this.name} gained 10 experience points!`;
  }
}

class Race extends AnimalPokemon {
  constructor(name, origin, population) {
    super();
    this.name = name;
    this.origin = origin;
    this.population = population;
    this.language = "Elvish"; // Унікальна властивість для Раси
    this._isEndangered = false; // Приватна властивість для Раси
  }

  growPopulation() {
    this.population += 100;
    return `${this.name} population increased by 100!`;
  }

  migrate() {
    return `${this.name} is migrating to a new land.`;
  }

  communicate() {
    return `${this.name} speaks in ${this.language}.`;
  }
}

// Приклад використання
const lion = new Animal("Leo", 5, "Lion");
console.log(lion.makeSound()); // Leo says Roar!
console.log(lion.eatFood()); // Leo is eating.
console.log(lion.sleep()); // Leo is sleeping now.
console.log(lion.catchBall()); // Leo was caught with a ball!

const pikachu = new Pokemon("Pikachu", 10, "Electric");
console.log(pikachu.attack()); // Pikachu uses Quick Attack!
console.log(pikachu.useAbility()); // Pikachu uses Thunderbolt!
console.log(pikachu.train()); // Pikachu gained 10 experience points!
console.log(pikachu.catchBall()); // Pikachu was caught with a ball!

const elf = new Race("Elrond", "Rivendell", 1000);
console.log(elf.growPopulation()); // Elrond population increased by 100!
console.log(elf.migrate()); // Elrond is migrating to a new land.
console.log(elf.communicate()); // Elrond speaks in Elvish.
console.log(elf.catchBall()); // Elrond was caught with a ball!

