const onBtn = document.querySelector("button[data-start]");
const offBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");
let interval = null;

onBtn.addEventListener("click", () => {
    interval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    onBtn.disabled = true;
    offBtn.disabled = false;
});

offBtn.addEventListener("click", () => {
    clearInterval(interval);
    onBtn.disabled = false;
    offBtn.disabled = true;
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}