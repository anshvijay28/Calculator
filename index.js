const inputs = document.querySelectorAll('.input');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#AC');

const screen = document.querySelector('.screen');
const incoming = document.querySelector('.incoming-operation');
const output = document.querySelector('.result');

let operationPressed = false;

inputs.forEach(input => input.addEventListener('click', e => {  
    if (input.classList.contains("operator")) {
        if (operationPressed == false) {
            incoming.textContent += input.textContent; 
        }
    } else /*if number*/ {
        incoming.textContent += input.textContent;
    }    
}));
operators.forEach(operator => operator.addEventListener('click', e => {
    if (!operationPressed) {
        operationPressed = true;
    } else {
        //evaluate expression
        //clear incoming screen
        //put result onto output screen
        //make operationPressed = false 
    }
}));
clearButton.addEventListener('click', e => {
    incoming.textContent = "";
    output.textContent = "";
    operationPressed = false;
});
equalsButton.addEventListener('click', e => {
    incoming.textContent = "";
    operationPressed = false;
});




