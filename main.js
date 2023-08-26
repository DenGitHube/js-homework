import { getRandomEmoji } from './emoji.js';

const emojiInput = document.getElementById('emojiInput');
const addButton = document.getElementById('addButton');
const emojiDisplay = document.getElementById('emojiDisplay');
const arrayDisplay = document.getElementById('arrayDisplay');
const setDisplay = document.getElementById('setDisplay');

const emojiSet = new Set();
const emojiArray = [];

emojiInput.value = getRandomEmoji();

emojiInput.addEventListener('input', () => {
  const emoji = emojiInput.value;
  if (!emojiSet.has(emoji)) {
    emojiArray.push(emoji);
    emojiSet.add(emoji);
  }
});

addButton.addEventListener('click', () => {
  const emoji = emojiInput.value;
  if (!emojiSet.has(emoji)) {
    emojiArray.push(emoji);
    emojiSet.add(emoji);
    renderEmojis();
    renderArrayAndSet();
  }
});

function renderEmojis() {
  emojiDisplay.innerHTML = '';
  emojiArray.forEach((emoji) => {
    const emojiSpan = document.createElement('span');
    emojiSpan.textContent = emoji;
    emojiDisplay.appendChild(emojiSpan);
  });
}

function renderArrayAndSet() {
  arrayDisplay.textContent = `Типовий Array: [ ${emojiArray.join(',')} ]`;
  setDisplay.textContent = `Типовий Set: [ ${Array.from(emojiSet).join(',')} ]`;
}
