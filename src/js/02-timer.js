import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const infieldRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysOutRef = document.querySelector('[data-days]');
const hoursOutRef = document.querySelector('[data-hours]');
const minOutRef = document.querySelector('[data-minutes]');
const secOutRef = document.querySelector('[data-seconds]');

btnStartRef.disabled = true;
let periodic = null;

function renewTimer({ days, hours, minutes, seconds }) {
  daysOutRef.textContent = addLeadingZero(days);
  hoursOutRef.textContent = addLeadingZero(hours);
  minOutRef.textContent = addLeadingZero(minutes);
  secOutRef.textContent = addLeadingZero(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() >= selectedDates[0]) {
      btnStartRef.disabled = true;
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStartRef.disabled = false;
    }
  },
};
function togglesBtn() {
  btnStartRef.disabled = true;
  infieldRef.disabled = true;
}
function setTimer() {
  let difTime = new Date(infieldRef.value) - Date.now();
  let currentTime = convertMs(difTime);
  renewTimer(currentTime);
}

btnStartRef.addEventListener('click', () => {
  togglesBtn();
  setTimer();
  periodic = setInterval(updateTimer, 1000);
});

function updateTimer() {
  let difTime = new Date(infieldRef.value) - Date.now();
  let currentTime = convertMs(difTime);
  renewTimer(currentTime);
  if (difTime < 1000) {
    clearInterval(periodic);
  }
}

const flat = flatpickr(infieldRef, options);

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
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
