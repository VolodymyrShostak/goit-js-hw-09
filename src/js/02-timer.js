import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const infieldRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysOutRef = document.querySelector('[data-days]');
const hoursOutRef = document.querySelector('[data-hours]');
const minOutRef = document.querySelector('[data-minutes]');
const secOutRef = document.querySelector('[data-seconds]');

btnStartRef.disabled = true;

// let d = new Date();
// let hours = d.getHours();
// let minutes = d.getMinutes();
// let seconds = d.getSeconds();

// function dn(n) {
//   if (minutes <= 9) minutes = '0' + minutes;
//   if (seconds <= 9) seconds = '0' + seconds;
// }

let setDate = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return window.alert('Please choose a date in the future');
    }
    btnStartRef.disabled = false;
    setDate = selectedDates[0];
  },
};
flatpickr(infieldRef, options);

const setTimer = e => {
  const deltaTime = setDate - new Date();
  let currentTime = convertMs(deltaTime);
  daysOutRef.textContent = currentTime.days;
  hoursOutRef.textContent = currentTime.hours;
  minOutRef.textContent = currentTime.minutes;
  secOutRef.textContent = currentTime.seconds;
  function updateClock() {
    currentTime = convertMs(deltaTime);
    if (currentTime <= 0) {
      clearInterval(timeInterval);
    }
  }
  updateClock();
  const timeInterval = setInterval(setTimer, 1000);
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const addLeadingZero = value => {
  return value.padStart(2, '0');
};
btnStartRef.addEventListener('click', setTimer);
// const timeInterval = setInterval(setTimer, 1000);
