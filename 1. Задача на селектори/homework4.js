let navigationText = document.getElementById('headerTwo');                  // для елементу з текстом 'Навігація по DOM дереву'
let firstSection = document.querySelector('section:first-of-type');         // для першого елементу <section>
let listItem = document.querySelector('li:nth-child(5)');                   // для елементу списку з текстом 'Пункт 5'
let elementWithClass = document.getElementsByClassName('hatredLevelBlock')[0]; // для елементу з класом 'hatredLevelBlock'

// Запуск та використання цих селекторів 
console.log(navigationText.textContent);
console.log(firstSection);
console.log(listItem.textContent);    
console.log(elementWithClass); 
