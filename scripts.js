function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return +x - +y;
}

function multiply(x, y) {
    return +x * +y;
}

function divide(x, y) {
    return +x / +y;
}

function operate(operator, x, y) {
    if (operator == '+') {
        return add(x, y);
    } else if (operator == '-') {
        return subtract(x, y);
    } else if (operator == '*') {
        return multiply(x, y);
    } else if (operator == '/') {
        return divide(x, y);
    }
}

function clear() {
    displayValue.textContent = '';
    operatorValue.textContent = '0';
    firstDigit = '';
    currentDigit = '';
    currentOperator = '';
}
const operatorValue = document.getElementById('current-operation');

function populateOperator(operator) {
    operatorValue.textContent = operator;
}

const displayValue = document.getElementById('display-value');

function populateDisplay(value) {
    displayValue.textContent = value;
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', e => buttonClick(button));
});

let firstDigit = '';
let currentDigit = '';
let currentOperator = '';

function prepareOperation(operation) {
    if (!currentDigit) {
        return
    } else if (currentOperator) {
        firstDigit = operate(currentOperator, firstDigit, currentDigit);
    } else {
        firstDigit = currentDigit;
    }
    currentDigit = '';
    currentOperator = operation;
    populateDisplay(currentDigit);
    let currentOperation = firstDigit + operation;
    populateOperator(currentOperation);
}

function equate() {
    if (!firstDigit || !currentDigit || !currentOperator) {
        return
    }
    let finalDigit = operate(currentOperator, firstDigit, currentDigit);
    populateDisplay(finalDigit);
    populateOperator('=');

}

function buttonClick(button) {
    if (button.className.includes('digit')) {
        currentDigit += button.textContent;
        populateDisplay(currentDigit);
    }
    if (button.className.includes('operator')) {
        prepareOperation(button.textContent);
    }
    if (button.textContent == '.') {
        if (!currentDigit.includes('.')) {
            currentDigit += '.';
            populateDisplay(currentDigit);
        }
    }
    if (button.textContent == '=') {
        equate();
    }
    if (button.textContent == 'clear') {
        clear();
    }
    if (button.textContent == 'del') {
        currentDigit = currentDigit.slice(0, -1);
        populateDisplay(currentDigit);
    }
    if (button.textContent == '+/-') {
        currentDigit = -currentDigit;
        populateDisplay(currentDigit);
    }
}