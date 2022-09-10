import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';
import 'flatpickr/dist/flatpickr.min.css';

const timePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');

const dateRefs = {
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMinutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
}

let selectedDate = null;
let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() <= 0) {
      return Notify.failure('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};

flatpickr(timePicker, options);

btnStart.disabled = true;
btnStart.addEventListener('click', startTime);

function startTime() {
  if (selectedDate - Date.now() <= 0) {
    return Notify.failure('Please choose a date in the future');
  }
  interval = setInterval(updateTimer, 1000);
  btnStart.disabled = true;
  timePicker.disabled = true;
}

function updateTimer() {
  const timeLeft = selectedDate - Date.now();
  const timeConverted = convertMs(timeLeft);
  if (timeLeft < 1000) {
    clearInterval(interval);
    Notify.success('Time is up!');
    btnStart.disabled = true;
    timePicker.disabled = true;
  }
  showTimer(timeConverted, dateRefs);
}

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

function showTimer(
  { days, hours, minutes, seconds },
  { outputDays, outputHours, outputMinutes, outputSeconds }
) {
  outputDays.textContent = addLeadingZero(days);
  outputHours.textContent = addLeadingZero(hours);
  outputMinutes.textContent = addLeadingZero(minutes);
  outputSeconds.textContent = addLeadingZero(seconds);
}