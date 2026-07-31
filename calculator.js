// --- DOM Element References (Cached) ---
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const operatorButtons = document.querySelectorAll('button[data-op]');
const resultDisplay = document.getElementById('result');
const clearBtn = document.getElementById('clear-btn');
const result = document.getElementById('result');

let lastOperator = null;


// Add click listener to clear fields
clearBtn.addEventListener('click', () => {
    input1.value = '';
    input2.value = '';
    result.innerText = ''; // Or result.value = '' if the result display is an input field
});

/**
 * Pure Logic Function: Computes arithmetic operation.
 * Has no DOM interaction.
 */
function calculate(a, operator, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b === 0) return 'Error: Cannot divide by zero';
            return a / b;
        default:
            return 'Error: Unknown operator';
    }
}

/**
 * Display Helper: Updates the DOM result element.
 */
function displayResult(message, isError = false) {
    resultDisplay.textContent = message;
    resultDisplay.classList.toggle('error', isError);
}

/**
 * Event Handler: Reads inputs, validates data, calls logic, and updates display.
 */
function handleOperatorClick(event) {
    const operator = event.target.dataset.op;
    const raw1 = input1.value.trim();
    const raw2 = input2.value.trim();

    // Validate empty fields
    if (raw1 === '' || raw2 === '') {
        displayResult('Please fill in both number fields', true);
        return;
    }

    const a = Number(raw1);
    const b = Number(raw2);

    // Validate numeric conversion
    if (Number.isNaN(a) || Number.isNaN(b)) {
        displayResult('Please enter valid numbers only', true);
        return;
    }

    // Compute and render
    const result = calculate(a, operator, b);
    const isError = typeof result === 'string';

    displayResult(result, isError);
}

// --- Attach Event Listeners ---
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

// Helper functions for operations
function add() {
    const num1 = parseFloat(input1.value) || 0;
    const num2 = parseFloat(input2.value) || 0;
    result.innerText = num1 + num2;
}

function subtract() {
    const num1 = parseFloat(input1.value) || 0;
    const num2 = parseFloat(input2.value) || 0;
    result.innerText = num1 - num2;
}

function multiply() {
    const num1 = parseFloat(input1.value) || 0;
    const num2 = parseFloat(input2.value) || 0;
    result.innerText = num1 * num2;
}

function divide() {
    const num1 = parseFloat(input1.value) || 0;
    const num2 = parseFloat(input2.value) || 0;
    result.innerText = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
}

// 1. Attach click listeners to operator buttons and update `lastOperator`
document.getElementById('add-btn').addEventListener('click', () => {
    lastOperator = add;
    add();
});

document.getElementById('sub-btn').addEventListener('click', () => {
    lastOperator = subtract;
    subtract();
});

document.getElementById('mul-btn').addEventListener('click', () => {
    lastOperator = multiply;
    multiply();
});

document.getElementById('div-btn').addEventListener('click', () => {
    lastOperator = divide;
    divide();
});

// 2. Handle Enter keypress in inputs
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if inside a form
        if (lastOperator) {
            lastOperator(); // Trigger the last used operation
        }
    }
}

// Attach listener to both inputs
input1.addEventListener('keydown', handleKeyDown);
input2.addEventListener('keydown', handleKeyDown);

// Get reference to the history list container
const historyList = document.getElementById('history');

// Helper function to append calculation to the history log
function logCalculation(num1, operator, num2, resultValue) {
    const listItem = document.createElement('li');
    listItem.textContent = `${num1} ${operator} ${num2} = ${resultValue}`;
    historyList.appendChild(listItem);
}

// Example update to your calculation functions:
function add() {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    if (isNaN(num1) || isNaN(num2)) return;

    const res = num1 + num2;
    handleResult(res);
    logCalculation(num1, '+', num2, res);
}

function subtract() {
    const val1 = input1.value.trim();
    const val2 = input2.value.trim();

    if (val1 === '' || val2 === '') return;

    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);
    const resultVal = num1 - num2;

    result.innerText = resultVal;
    logCalculation(num1, '-', num2, resultVal);
}

function multiply() {
    const val1 = input1.value.trim();
    const val2 = input2.value.trim();

    if (val1 === '' || val2 === '') return;

    const num1 = parseFloat(val1);
    const num2 = parseFloat(val2);
    const resultVal = num1 * num2;

    result.innerText = resultVal;
    logCalculation(num1, 'x', num2, resultVal);
}

function divide() {
    const num1 = parseFloat(input1.value);
    const num2 = parseFloat(input2.value);
    if (isNaN(num1) || isNaN(num2)) return;

    if (num2 === 0) {
        handleResult('Cannot divide by zero');
        return;
    }

    const res = num1 / num2;
    handleResult(res);
    logCalculation(num1, '/', num2, res);
}
// Function to update the UI with the calculation result
function handleResult(calcResult) {
    // Check if result is a valid finite number
    if (typeof calcResult === 'number' && !isNaN(calcResult) && isFinite(calcResult)) {
        // 1. Display result in the result field
        result.innerText = calcResult;

        // 2. Chain result: Populate input1 with the result
        input1.value = calcResult;

        // 3. Clear input2 so the user can easily type the next number
        input2.value = '';
    } else {
        // Handle error messages (like 'Cannot divide by zero')
        result.innerText = calcResult;
    }
}