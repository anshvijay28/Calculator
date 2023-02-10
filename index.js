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
function endsWithNum(incomingExpression) {
    return !isNaN(incomingExpression[incomingExpression.length - 1]);
}
function containsOperator(incomingExpression) {
    let doesContainOperator = false; 
    const expressions = ['+', '-', '÷', '×'];
    for (const expression of expressions) {
        doesContainOperator = incomingExpression.includes(expression);
        if (doesContainOperator) {
            return doesContainOperator;
        }
    }
}
function containsAns(incomingExpression) {
    return incomingExpression.slice(0,3) === "Ans";
}

inputs.forEach(input => input.addEventListener('click', e => {
    if (input.classList.contains("operator")) {
        if (!operationPressed) {
            if (output.textContent === "") {
                incoming.textContent += input.textContent;
                lastOperation = input;
                operationPressed = true; 
            } else {
                if (endsWithNum(incoming.textContent)) {
                    if (containsOperator(incoming.textContent)) { 
                        output.textContent = evaluate(output.textContent + incoming.textContent.slice(3), lastOperation);
                        incoming.textContent = "Ans" + input.textContent;
                        lastOperation = input;
                        operationPressed = false;
                    } else {
                        incoming.textContent += input.textContent;
                        lastOperation = input;
                        operationPressed = true;
                    }
                } else if (incoming.textContent === "") {
                    incoming.textContent = "Ans" + input.textContent;
                    lastOperation = input;
                    operationPressed = true;
                }
            }
        } else {
            if (containsAns(incoming.textContent)) {
                output.textContent = evaluate(output.textContent + incoming.textContent.slice(3), lastOperation);
            } else {
                output.textContent = evaluate(incoming.textContent, lastOperation);
            }
            incoming.textContent = "Ans" + input.textContent;
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
    lastOperation = null;
});
equalsButton.addEventListener('click', e => {
    if (endsWithNum(incoming.textContent)) {
        if (containsAns(incoming.textContent)) {
            output.textContent = evaluate(output.textContent + incoming.textContent.slice(3), lastOperation);
        } else {
            output.textContent = evaluate(incoming.textContent, lastOperation);
        }
        incoming.textContent = "";
        operationPressed = false;
        lastOperation = null;
    }
});




