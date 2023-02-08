inputs = document.querySelectorAll('.input');
screen = document.querySelector('.screen');
equalsButton = document.querySelector('#equals');
clearButton = document.querySelector('#AC');
inputted = document.querySelector('.incoming-operation');

inputs.forEach(input => input.addEventListener('click', e => {
    inputted.textContent += input.textContent;
}));
clearButton.addEventListener('click', e => {
    inputted.textContent = "";
});



