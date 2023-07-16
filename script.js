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


// Базовий клас
class Entity {
  constructor(name) {
    this.name = name; // Властивість - ім'я сутності
    this._privateProperty = 'Це приватна властивість.'; // Приватна властивість
  }

  commonMethod() {
    console.log('Це загальний метод.'); // Загальний метод
  }
}

// Клас Тварина успадковується від Entity
class Animal extends Entity {
  constructor(name, age, type) {
    super(name);
    this.age = age; // Властивість - вік тварини
    this.type = type; // Властивість - тип тварини
  }

  sound() {
    console.log('Ця тварина видає звук.'); // Метод - звук тварини
  }

  eat(food) {
    console.log(`${this.name} їсть ${food}.`); // Метод - тварина їсть їжу
  }
}

// Клас Покемон успадковується від Entity
class Pokemon extends Entity {
  constructor(name, level, type) {
    super(name);
    this.level = level; // Властивість - рівень покемона
    this.type = type; // Властивість - тип покемона
  }

  attack(move) {
    console.log(`${this.name} атакує за допомогою ${move}.`); // Метод - покемон атакує
  }

  train() {
    console.log(`${this.name} тренується.`); // Метод - покемон тренується
  }
}

// Клас Гонка успадковується від Entity
class Race extends Entity {
  constructor(name, distance, participants) {
    super(name);
    this.distance = distance; // Властивість - дистанція гонки
    this.participants = participants; // Властивість - учасники гонки
  }

  start() {
    console.log(`Гонка ${this.name} розпочалась.`); // Метод - початок гонки
  }

  finish() {
    console.log(`Гонка ${this.name} закінчилась.`); // Метод - кінець гонки
  }
}

// Клас Собака успадковується від Animal
class Dog extends Animal {
  constructor(name, age, breed) {
    super(name, age, 'собака');
    this.breed = breed; // Властивість - порода собаки
  }

  bark() {
    console.log(`${this.name} гавкає.`); // Метод - собака гавкає
  }
}

// Клас Пікачу успадковується від Pokemon
class Pikachu extends Pokemon {
  constructor(name, level) {
    super(name, level, 'електричний');
  }

  thunderbolt() {
    console.log(`${this.name} використав Удар Громом!`); // Метод - Пікачу використовує Удар Громом
  }
}

// Використання класів
var dog = new Dog('Бадді', 3, 'Золотистий ретрівер');
dog.bark(); // Виведе: Бадді гавкає.
dog.eat('кістку'); // Виведе: Бадді їсть кістку.
dog.commonMethod(); // Виведе: Це загальний метод.

var pikachu = new Pikachu('Піка', 25);
pikachu.attack('Електричний удар'); // Виведе: Піка атакує за допомогою Електричного удару.
pikachu.thunderbolt(); // Виведе: Піка використав Удар Громом!
pikachu.commonMethod(); // Виведе: Це загальний метод.

var race = new Race('Спринт', '100 м', ['Учасник1', 'Учасник2']);
race.start(); // Виведе: Гонка Спринт розпочалась.
race.finish(); // Виведе: Гонка Спринт закінчилась.
race.commonMethod(); // Виведе: Це загальний метод.
