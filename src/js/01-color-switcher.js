const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const documentBody = document.body;


let colorChange = null;



startBtn.addEventListener("click", onClickStart);
stopBtn.addEventListener("click", onClickStop);


stopBtn.setAttribute("disabled", "true");

function onClickStart() { 
   
    colorChange = setInterval(bgColorChange, 1000);
    startBtn.setAttribute("disabled", "true");
    stopBtn.removeAttribute("disabled");
}


function onClickStop() { 
    startBtn.removeAttribute("disabled");
    clearInterval(colorChange);
    stopBtn.setAttribute("disabled", "true");
}


function bgColorChange() {
    documentBody.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}