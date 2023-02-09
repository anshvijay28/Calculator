const inputs = document.querySelectorAll('.input');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#AC');

const screen = document.querySelector('.screen');
const incoming = document.querySelector('.incoming-operation');
const output = document.querySelector('.result');

let operationPressed = false;
let lastOperation = null;

function evaluate(expression, operator) {
    const key = operator.id;
    const delimiter = {
        plus: '+',
        minus: '-',
        multiply: '×',
        divide: '÷'
    }
    const expressions = {
        plus: function (a, b) {return a + b},
        minus: function (a, b) {return a - b},
        multiply: function (a, b) {return a * b},
        divide: function (a, b) {return a / b}
    }
    const arguments = expression.split(delimiter[key]);
    return expressions[key](Number(arguments[0]), Number(arguments[1]));
}

inputs.forEach(input => input.addEventListener('click', e => {
    if (input.classList.contains("operator")) {
        if (!operationPressed) {
            incoming.textContent += input.textContent;
            lastOperation = input;
            operationPressed = true; 
        } else {
            output.textContent = evaluate(incoming.textContent, lastOperation);
            incoming.textContent = ""
            lastOperation = input; 
            operationPressed = false;
        }
    } else /*if number*/ {
        incoming.textContent += input.textContent;
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




