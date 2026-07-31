// --- DOM Element References (Cached) ---
const input1 = document.getElementById('num1');
const input2 = document.getElementById('num2');
const operatorButtons = document.querySelectorAll('button[data-op]');
const resultDisplay = document.getElementById('result');

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