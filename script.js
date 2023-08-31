'use string'

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Розмір одного блоку та розміри полотна
const gridSize = 20;
const canvasWidth = 720;
const canvasHeight = 460;

let snake = [{ x: 10, y: 10 }]; // Початкова позиція змійки
let direction = "right"; // Початковий напрямок руху
let food = generateFood(); // Початкове розміщення їжі
let isGameOver = false; // Прапорець, що вказує на завершення гри
let blocksEaten = 0; // Лічильник з'їдених блоків
const speedIncrement = 5; // Значення, на яке зростає швидкість через кожні 5 поглинених блоків
let gameSpeed = 100; // Default speed
let maxBlocksEaten = 0; // Максимальний результат

// Функція для малювання частини змійки
function drawSnakePart(snakePart) {
  ctx.fillStyle = "green";
  ctx.fillRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
  ctx.strokeStyle = "black";
  ctx.strokeRect(snakePart.x * gridSize, snakePart.y * gridSize, gridSize, gridSize);
}

// Функція для малювання їжі
function drawFood() {
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

// Генерація нової позиції для їжі
function generateFood() {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * (canvasWidth / gridSize)),
      y: Math.floor(Math.random() * (canvasHeight / gridSize)),
    };
  } while (snake.some((part) => part.x === newFood.x && part.y === newFood.y) || newFood.x >= canvasWidth / gridSize || newFood.y >= canvasHeight / gridSize);
  return newFood;
}

// Перевірка на зіткнення
function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvasWidth / gridSize || head.y < 0 || head.y >= canvasHeight / gridSize) {
    return true; // Зіткнення з межами
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true; // Зіткнення з самим собою
    }
  }

  return false;
}

// Функція для оновлення гри
function update() {
  if (isGameOver) return;

  let head = { ...snake[0] };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Змійка перетинає верхню межу поля, з'являється знизу
  if (head.y < 0) {
    head.y = Math.floor(canvasHeight / gridSize) - 1;
  }
  // Змійка перетинає нижню межу поля, з'являється зверху
  else if (head.y >= canvasHeight / gridSize) {
    head.y = 0;
  }

  // Змійка перетинає ліву межу поля, з'являється справа
  if (head.x < 0) {
    head.x = Math.floor(canvasWidth / gridSize) - 1;
  }
  // Змійка перетинає праву межу поля, з'являється зліва
  else if (head.x >= canvasWidth / gridSize) {
    head.x = 0;
  }

  snake.unshift(head);

  // Логіка при з'їдені їжі
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    blocksEaten++;

    // Перевіряємо, чи досягли ми кожних 5 блоків
    if (blocksEaten % 5 === 0) {
      gameSpeed -= speedIncrement; // Зменшуємо затримку (збільшуємо швидкість)
      updateSpeedDisplay(); // Оновлюємо відображення швидкості на екрані
    }

    // Оновлюємо відображення з'їдених блоків на екрані
    updateBlocksEatenDisplay();
  } else {
    snake.pop();
  }

  // Оновлюємо поле лише у випадку, якщо гра не закінчена
  if (checkCollision()) {
    isGameOver = true;
    showGameOverModal();
    updateMaxBlocksEaten(); // Оновлюємо максимальний результат
    return;
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  drawFood();
  snake.forEach(drawSnakePart);

  setTimeout(update, gameSpeed); // Затримка виклику для заданої швидкості
}

// Обробник події натискання клавіші
document.addEventListener("keydown", (event) => {
  if (isGameOver) return;

  const key = event.key;
  switch (key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

// Функція показу модального вікна завершення гри
function showGameOverModal() {
  const gameOverModal = document.getElementById("gameOver");
  gameOverModal.classList.remove("hidden");
}

// Функція, яка обнулює лічильник з'їдених блоків та повертає швидкість до початкового значення
function resetGameValues() {
  blocksEaten = 0; // Обнулюємо лічильник з'їдених блоків
  gameSpeed = 100; // Повертаємо швидкість до початкового значення
  updateBlocksEatenDisplay(); // Оновлюємо відображення з'їдених блоків на екрані
  updateSpeedDisplay(); // Оновлюємо відображення швидкості на екрані
}

// Функція для перезапуску гри
function restartGame() {
  const gameOverModal = document.getElementById("gameOver");
  gameOverModal.classList.add("hidden");

  snake = [{ x: 10, y: 10 }];
  direction = "right";
  food = generateFood();
  isGameOver = false;

  resetGameValues(); // Викликаємо функцію для скидання значень

  update();
}

// Оновлення відображення з'їдених блоків на екрані
function updateBlocksEatenDisplay() {
  const blocksEatenDisplay = document.getElementById("blocksEatenDisplay");
  blocksEatenDisplay.textContent = `З'їдено блоків: ${blocksEaten}`;
}

// Оновлення відображення максимального результату на екрані
function updateMaxBlocksEatenDisplay() {
  const maxBlocksEatenDisplay = document.getElementById("maxBlocksEatenDisplay");
  maxBlocksEatenDisplay.textContent = `Макс. результат: ${maxBlocksEaten}`;
}

// Оновлення відображення поточної швидкості на екрані
function updateSpeedDisplay() {
  const speedDisplay = document.getElementById("speedDisplay");
  speedDisplay.textContent = `Швидкість: ${gameSpeed}`;
}

// Завантаження максимального результату з localStorage
function loadMaxBlocksEaten() {
  const savedMaxBlocksEaten = localStorage.getItem("maxBlocksEaten");
  if (savedMaxBlocksEaten !== null) {
    maxBlocksEaten = parseInt(savedMaxBlocksEaten);
    updateMaxBlocksEatenDisplay();
  }
}

// Функція оновлення максимального результату
function updateMaxBlocksEaten() {
  if (blocksEaten > maxBlocksEaten) {
    maxBlocksEaten = blocksEaten;
    localStorage.setItem("maxBlocksEaten", maxBlocksEaten.toString()); // Зберігаємо максимальний результат у localStorage
    updateMaxBlocksEatenDisplay(); // Оновлюємо відображення максимального результату на екрані
  }
}

// Додавання обробника події для старту гри при натисканні на ігрове поле
canvas.addEventListener("click", () => {
  if (!isGameOver) return; // Якщо гра вже запущена, ігноруємо клік

  restartGame();

  // Оновлюємо відображення лічильників перед початком нової гри
  updateBlocksEatenDisplay();
  loadMaxBlocksEaten(); // Завантажуємо максимальний результат
  updateSpeedDisplay();
});

// Перевірка стану гри після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  const gameOverModal = document.getElementById("gameOver");

  // Завантажуємо дані із localStorage та відновлюємо стан гри
  if (localStorage.getItem("isGameOver") === "true") {
    isGameOver = true;
    showGameOverModal();
    blocksEaten = parseInt(localStorage.getItem("blocksEaten")) || 0;
    gameSpeed = parseInt(localStorage.getItem("gameSpeed")) || 100;
    updateBlocksEatenDisplay();
    loadMaxBlocksEaten(); // Завантажуємо максимальний результат
    updateSpeedDisplay();
  } else {
    restartGame(); // Запускаємо нову гру
  }
});

// Зберігання стану гри під час перезавантаження сторінки
window.addEventListener("beforeunload", () => {
  localStorage.setItem("isGameOver", isGameOver);
  localStorage.setItem("blocksEaten", blocksEaten.toString()); // Перетворюємо в строку перед зберіганням у localStorage
  localStorage.setItem("maxBlocksEaten", maxBlocksEaten.toString()); // Перетворюємо в строку перед зберіганням у localStorage
  localStorage.setItem("gameSpeed", gameSpeed.toString()); // Перетворюємо в строку перед зберіганням у localStorage
});
