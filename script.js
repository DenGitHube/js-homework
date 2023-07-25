// Реалізуйте наступну систему на прототипному успадкуванні:
// 1. чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)
// 2. у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)
// 3. у кожного класу має бути своя унікальна властивість
// 4. у двох класів має бути спільний предок та спільний метод характерний тільки для них
// 5. у всіх чотирьох класів має бути один (крім проміжних) клас-предок

// Клас-предок
class Entity {
    constructor(name, type) {
      this.name = name;
      this.type = type;
    }
  
    sayHello() {
      return `Привіт! Мене звуть ${this.name} і я ${this.type}.`;
    }
  }
  
  // Клас Тварина
  class Animal extends Entity {
    constructor(name, type, legs, sound) {
      super(name, type);
      this.legs = legs;
      this.sound = sound;
    }
  
    makeSound() {
      return `${this.name} видає звук: ${this.sound} ${this.sound} ${this.sound}...`;
    }
  
    countLegs() {
      return `У ${this.name} ${this.legs} ноги.`;
    }
  
    // Унікальна властивість для класу Тварина
    hasTail(tailPresent) {
      return tailPresent ? `${this.name} має хвіст.` : `${this.name} не має хвоста.`;
    }
  }
  
  // Клас Покемон
  class Pokemon extends Entity {
    constructor(name, type, ability, level) {
      super(name, type);
      this.ability = ability;
      this.level = level;
    }
  
    useAbility() {
      return `${this.name} використовує свою здатність "${this.ability}"!`;
    }
  
    checkLevel() {
      return `${this.name} на рівні ${this.level}.`;
    }
  
    // Унікальна властивість для класу Покемон
    isLegendary(legendary) {
      return legendary ? `${this.name} - легендарний покемон!` : `${this.name} - звичайний покемон.`;
    }
  }
  
  // Клас Раса
  class Race extends Entity {
    constructor(name, type, language, culture) {
      super(name, type);
      this.language = language;
      this.culture = culture;
    }
  
    speakLanguage() {
      return `${this.name} говорить мовою ${this.language}.`;
    }
  
    describeCulture() {
      return `Культура ${this.name} відрізняється ${this.culture}.`;
    }
  
    // Унікальна властивість для класу Раса
    hasMagicPowers(magic) {
      return magic ? `${this.name} володіє магічними здібностями!` : `${this.name} не володіє магією.`;
    }
  }
  
  // Клас-потомок, який об'єднує Покемон та Тварина
  class Hybrid extends Entity {
    constructor(name, type, hybridProperty) {
      super(name, type);
      this.hybridProperty = hybridProperty;
    }
  
    // Спільний метод тільки для класу Hybrid
    displayHybridProperty() {
      return `${this.name} має особливу властивість: ${this.hybridProperty}.`;
    }
  }
  
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
  