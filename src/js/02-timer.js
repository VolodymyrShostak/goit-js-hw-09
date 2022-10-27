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
let setDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentDate = Date.now();
    setDate = selectedDates[0];
    let difTime = setDate - currentDate;
    if (difTime < 0) {
      return window.alert('Please choose a date in the future');
    } else {
      btnStartRef.disabled = false;
    }
    function setTimer() {
      btnStartRef.disabled = true;
      infieldRef.disabled = true;
      getDate(selectedDates);
      periodic = setInterval(() => {
        getDate(selectedDates);
      }, 1000);
    }
    btnStartRef.addEventListener('click', setTimer);
  },
};

function getDate(selectedDates) {
  let currentDate = Date.now();
  let difTime = setDate - currentDate;
  if (difTime < 1000) {
    clearInterval(periodic);
  }
  updateTimer(difTime);
}

function updateTimer(difTime) {
  let currentTime = convertMs(difTime);
  daysOutRef.textContent = addLeadingZero(currentTime.days);
  hoursOutRef.textContent = addLeadingZero(currentTime.hours);
  minOutRef.textContent = addLeadingZero(currentTime.minutes);
  secOutRef.textContent = addLeadingZero(currentTime.seconds);
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
