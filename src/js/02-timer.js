import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const inputEl = document.querySelector("#datetime-picker");
const startTimerBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector(`[data-days]`);
const hoursEl = document.querySelector(`[data-hours]`);
const minutesEl = document.querySelector(`[data-minutes]`);
const secondsEl = document.querySelector(`[data-seconds]`);


let timerId = null;


startTimerBtn.addEventListener(`click`, setTimerOnBtnClick);

startTimerBtn.setAttribute('disabled', 'true');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < options.defaultDate) {
        Notify.failure("Please choose a date in the future", {
                className: 'notiflix-report',
                width: '320px',
                backgroundColor: '#f8f8f8',
                borderRadius: '25px',
                rtl: false,
                zindex: 4002,
                backOverlay: true,
                backOverlayColor: 'rgba(0,0,0,0.5)',
                backOverlayClickToClose: false,
                fontFamily: 'Quicksand',
                svgSize: '110px',
                plainText: true,
                titleFontSize: '16px',
                titleMaxLength: 34,
                messageFontSize: '13px',
                messageMaxLength: 400,
                buttonFontSize: '14px',
                buttonMaxLength: 34,
                cssAnimation: true,
                cssAnimationDuration: 360,
                cssAnimationStyle: 'fade' - 'zoom',
                svgColor: '#ff5549',
                titleColor: '#1e1e1e',
                messageColor: '#242424',
                buttonBackground: '#ff5549',
                buttonColor: '#fff',
                backOverlayColor: 'rgba(255,85,73,0.2)',
        });
        return;
                  
    } 
     startTimerBtn.removeAttribute('disabled');
     inputEl.setAttribute('disabled', 'true');
     options.defaultDate = selectedDates[0];
    },
};


flatpickr(inputEl, options);


function setTimerOnBtnClick () {
  startTimerBtn.setAttribute('disabled', 'true');
  
  
    timerId = setInterval(() => {
        
        const timeDifference = options.defaultDate - Date.now();
        if (timeDifference < 1000) {
        clearInterval(timerId);
        }
        const time = convertMs(timeDifference);
        timerTextContentUpdate(time);
    }, 1000);
}
  

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function timerTextContentUpdate ({days, hours, minutes, seconds}) {
    if (days.toString().length >= 2) {
      daysEl.textContent = days.toString();
    } else {
      daysEl.textContent = addLeadingZero(days);
    }
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}
  

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

