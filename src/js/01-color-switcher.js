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
  bodyRef.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStopRef.addEventListener('click', () => {
  clearInterval(timerId);
});
