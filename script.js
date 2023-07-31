// Реалізуйте наступну систему на прототипному успадкуванні:
// 1. чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)
// 2. у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)
// 3. у кожного класу має бути своя унікальна властивість
// 4. у двох класів має бути спільний предок та спільний метод характерний тільки для них
// 5. у всіх чотирьох класів має бути один (крім проміжних) клас-предок

// Функція Класу-предка Entity
function Entity(name, type) {
  this.name = name;
  this.type = type;
}

// Метод Класу-предка Entity
Entity.prototype.sayHello = function () {
  return `Привіт! Мене звуть ${this.name} і я ${this.type}.`;
};

// Клас Тварина
function Animal(name, type, legs, sound) {
  Entity.call(this, name, type);
  this.legs = legs;
  this.sound = sound;
}

// Наслідування прототипів для Класу Тварина від Entity
Animal.prototype = Object.create(Entity.prototype);
Animal.prototype.constructor = Animal;

// Методи для Класу Тварина
Animal.prototype.makeSound = function () {
  return `${this.name} видає звук: ${this.sound} ${this.sound} ${this.sound}...`;
};

Animal.prototype.countLegs = function () {
  return `У ${this.name} ${this.legs} ноги.`;
};

// Унікальна властивість для класу Тварина
Animal.prototype.hasTail = function (tailPresent) {
  return tailPresent ? `${this.name} має хвіст.` : `${this.name} не має хвоста.`;
};

// Клас Покемон
function Pokemon(name, type, ability, level) {
  Entity.call(this, name, type);
  this.ability = ability;
  this.level = level;
}

// Наслідування прототипів для Класу Покемон від Entity
Pokemon.prototype = Object.create(Entity.prototype);
Pokemon.prototype.constructor = Pokemon;

// Методи для Класу Покемон
Pokemon.prototype.useAbility = function () {
  return `${this.name} використовує свою здатність "${this.ability}"!`;
};

Pokemon.prototype.checkLevel = function () {
  return `${this.name} на рівні ${this.level}.`;
};

// Унікальна властивість для класу Покемон
Pokemon.prototype.isLegendary = function (legendary) {
  return legendary ? `${this.name} - легендарний покемон!` : `${this.name} - звичайний покемон.`;
};

// Клас Раса
function Race(name, type, language, culture) {
  Entity.call(this, name, type);
  this.language = language;
  this.culture = culture;
}

// Наслідування прототипів для Класу Раса від Entity
Race.prototype = Object.create(Entity.prototype);
Race.prototype.constructor = Race;

// Методи для Класу Раса
Race.prototype.speakLanguage = function () {
  return `${this.name} говорить мовою ${this.language}.`;
};

Race.prototype.describeCulture = function () {
  return `Культура ${this.name} відрізняється ${this.culture}.`;
};

// Унікальна властивість для класу Раса
Race.prototype.hasMagicPowers = function (magic) {
  return magic ? `${this.name} володіє магічними здібностями!` : `${this.name} не володіє магією.`;
};

// Клас-потомок, який об'єднує Покемон та Тварина
function Hybrid(name, type, hybridProperty) {
  Entity.call(this, name, type);
  this.hybridProperty = hybridProperty;
}

// Наслідування прототипів для Класу Hybrid від Entity
Hybrid.prototype = Object.create(Entity.prototype);
Hybrid.prototype.constructor = Hybrid;

// Метод, спільний тільки для класу Hybrid
Hybrid.prototype.displayHybridProperty = function () {
  return `${this.name} має особливу властивість: ${this.hybridProperty}.`;
};

// Створюємо об'єкти для кожного класу
const dog = new Animal('Барсік', 'собака', 4, 'гав');
const cat = new Animal('Мурзик', 'кіт', 4, 'мяу');
const pikachu = new Pokemon('Пікачу', 'електричний', 'Електрошок', 15);
const bulbasaur = new Pokemon('Бульбазавр', 'травяний', 'Рослинний бій', 12);
const elf = new Race('Ельф', 'фантастична раса', 'елфійською', 'високими вушками');
const orc = new Race('Орк', 'фантастична раса', 'оркською', 'любов','ями до бою');
const hybridCreature = new Hybrid('Гібридус', 'гібрид', 'здатний змінювати форму');

// Виклики методів та вивід властивостей
console.log(dog.sayHello());
console.log(dog.makeSound());
console.log(dog.countLegs());
console.log(dog.hasTail(true));

console.log(pikachu.sayHello());
console.log(pikachu.useAbility());
console.log(pikachu.checkLevel());
console.log(pikachu.isLegendary(false));

console.log(elf.sayHello());
console.log(elf.speakLanguage());
console.log(elf.describeCulture());
console.log(elf.hasMagicPowers(true));

console.log(hybridCreature.sayHello());
console.log(hybridCreature.displayHybridProperty());
