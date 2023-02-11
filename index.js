const inputs = document.querySelectorAll('.input');
const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');

const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#AC');
const deleteButton = document.querySelector('#delete');

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
    if (arguments.length === 3) {
        let toBeRemoved = null;
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] === "" || arguments[i] === " ") {
                toBeRemoved = i;
                arguments[i + 1] = "-" + arguments[i + 1];
                break;
            }
        }
        arguments.splice(toBeRemoved, 1);
    }
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
function endsWithAns(incomingExpression) {
    return incomingExpression.slice(incomingExpression.length - 3) === "Ans";
}
function canAddDecimal(incomingExpression) {
    if (!endsWithNum(incomingExpression)) {
        return false;
    }
    if (!containsOperator(incomingExpression) && !incomingExpression.includes(".")) {
        return true;
    }
    if (containsOperator(incomingExpression)) {
        let currentOperator = null; 
        const operators = ['+', '-', '÷', '×'];
        for (const operator of operators) {
            if (incomingExpression.includes(operator)) {
                currentOperator = operator;
                break;
            }
        }
        const numInQuestion = incomingExpression.split(currentOperator)[1];
        if (!numInQuestion.includes(".")) {
            return true;
        }
    }
    return false;
}
function canAddNegativeSymbol(incomingExpression) {
    if (containsOperator(incomingExpression.slice(incomingExpression.length - 1))) {
        return true;
    }
    if (incoming.textContent === "") {
        return true;
    }
    return false;
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
                } else if (endsWithAns(incoming.textContent)) {
                    incoming.textContent += input.textContent;
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
    } else if (input.classList.contains("number")) {
        if (!endsWithAns(incoming.textContent)) {
            incoming.textContent += input.textContent;
        }
    } else if (input.id === "decimal") {
        if (canAddDecimal(incoming.textContent)) {
            incoming.textContent += input.textContent;
        }
    } else if (input.id === "negate") {
        if (canAddNegativeSymbol(incoming.textContent)) {
            if (incoming.textContent === "") {
                incoming.textContent += "-";
            } else {
                incoming.textContent += " -";
            }
        }
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
deleteButton.addEventListener('click', e => {
    if (incoming.textContent !== "") {
        let deleted = incoming.textContent.slice(incoming.textContent.length - 1);
        incoming.textContent = incoming.textContent.slice(0, incoming.textContent.length - 1);
        if (containsOperator(deleted)) {
            operationPressed = false;
        } else if (!endsWithNum(deleted)) {
            incoming.textContent = incoming.textContent.slice(0, incoming.textContent.length - 4);
        }
    }
    if (incoming.textContent.slice(incoming.textContent.length - 1) === " ") {
        incoming.textContent = incoming.textContent.slice(0, incoming.textContent.length - 1);
    }
});




