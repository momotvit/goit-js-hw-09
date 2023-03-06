
 import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;
  let delayValue = Number(delay.value);
  let stepValue = Number(step.value);
  let amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue + (i - 1) * stepValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
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
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,{
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
      });
   
  }
  
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
