'use strict';

/**
 * Основи роботи з DOM (1)
 * @author Miroslav
 */

/**
 * Вступ
 */

// function sayHi() {
//   console.log("Hi!");
// }

// window.sayHi();

// document.body.style.backgroundColor = "darkblue";
// setTimeout(() => document.body.style.background = 'lightblue', 3000);

/**
 * Навігація по ДОМ дереву
 */

// console.log(document.body.childNodes);
// console.log(Array.from(document.body.childNodes).sort());

// console.log(document.body.previousSibling)

// console.log(document.body.children);
// console.log(document.body.firstElementChild);
// console.log(document.body.lastElementChild);
// console.log(document.body.previousElementSibling);
// console.log(document.head.nextElementSibling);

/**
 * Пошук в ДОМ дереві по id елементу
 */

// let element = document.getElementById('headerTwo');
// console.log(element);
// element.style.color = "yellow";

/**
 * Пошук в ДОМ дереві по назві тегу
 */

// let hTwoElements = document.body.getElementsByTagName('h2');
// console.log(hTwoElements);

// let spanElements = document.body.getElementsByTagName('span');
// console.log(spanElements);

/**
 * Пошук в ДОМ дереві по css класам
 */

// let textClassElements = document.body.getElementsByClassName('text');
// console.log(textClassElements);

/**
 * Універсальні селектори пошуку
 */

// let elements = document.querySelectorAll('h2#headerTwo');
// console.log(elements);

// let element1 = document.querySelector('ul');
// let element2 = document.querySelector('span');
// console.log(element1);
// console.log(element2);

/**
 * matches()
 */

// let element = document.querySelector('h2#headerTwo');
// console.log(element.matches('li'));

/**
 * closest()
 */

// let element = document.querySelector('li.text');
// console.log(element.closest('ul'));

/**
 * contains()
 */

// let element1 = document.querySelector('ul');
// let element2 = document.querySelector('li');
// console.log(element1.contains(element2));

/**
 * Пошук в ДОМ дереві по атрибуту name для всього документа
 */

// let searchedSection = document.getElementsByName('firstSection');
// console.log(searchedSection);

/**
 * "CRUD" операції з DOM деревом
 */

/**
 * Створення елементів
 */

// let newElement = document.createElement('div');
// newElement.className = 'newElement';
// newElement.innerHTML = '<b>New element!</b>';

/**
 * Вставка елементів в DOM дерево
 */
// const section = document.querySelector('section');
// section.prepend(newElement);

// console.log(section);

// document.querySelector('.firstSection').insertAdjacentElement('beforebegin', newElement);
// document.querySelector('.firstSection').insertAdjacentElement('afterbegin', newElement);
// document.querySelector('.firstSection').insertAdjacentElement('beforeend', newElement);
// document.querySelector('.firstSection').insertAdjacentElement('afterend', newElement);

/**
 * Клонування елементів
 */

// let clone = document.querySelector('.firstSection').cloneNode(true);
// console.log(clone);

/**
 * Видалення елементів
 */

// headerTwo.remove();

/**
 * Робота зі стилями
 */

// let element = document.querySelector('p.text');
// element.classList.add('bold');
// element.classList.toggle('text-size');
// element.classList.remove('text');
// console.log(element.classList.contains('bold'))
// console.log(element.classList);

// document.body.style.cssText = `color: blue`;

// console.log(document.body.style.cssText);

// console.log(getComputedStyle(document.body));