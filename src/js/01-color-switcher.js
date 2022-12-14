const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');
const bodyRef = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let timerId = null;

btnStartRef.addEventListener('click', () => {
  btnStopRef.disabled = false;
  btnStartRef.disabled = true;
  setColor();
  timerId = setInterval(() => {
    setColor();
  }, 1000);
});

btnStopRef.addEventListener('click', () => {
  clearInterval(timerId);
  btnStopRef.disabled = true;
  btnStartRef.disabled = false;
});

function setColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}
