// Selecting the screen, numbers, operators, and clear button of Calculator
const screen = document.querySelector('.screen');
const numberButtons = document.querySelectorAll('.num-box');
const operatorButtons = document.querySelectorAll('.sign-box');
const equalsButton = document.querySelector('.result');
const clearButton = document.querySelector('.reset');

// Store the numbers & operator clicked by user
let firstOperand = "";
let secondOperand = "";
let operator = "";

// Flag to track first and second operands
let isOperatorClicked = false;

// Functions to perform add, subtract, multiply, and divide operations
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if(num2 === 0){
        return "Division by zero is undefined";
    }
    return num1 / num2;
}


// Function that calls relevant operation based on Operator
function operate(num1, operator, num2){
    if(operator === '+'){
        return add(num1, num2);
    } else if(operator === '-'){
        return subtract(num1, num2);
    } else if(operator === '*'){
        return multiply(num1, num2);
    } else if(operator === '/'){
        return divide(num1, num2);
    }
}

// Capture the number and decide which operand it goes to.

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(operator === ""){
            firstOperand += button.getAttribute('data-value');
            screen.textContent = firstOperand;
        } else{
            secondOperand += button.getAttribute('data-value');
            screen.textContent = firstOperand + operator + secondOperand;
        }
    })
})

// Capture the operator and use it to perform operations

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (firstOperand === "") return;

        // Store the current operator
        operator = button.getAttribute('data-value');
        
        // Display the operator on screen
        screen.textContent = firstOperand + " " + operator + " ";
        
        // Perform calculation if there's already a second operand
        if (firstOperand && secondOperand) {
            firstOperand = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
            secondOperand = "";
            screen.textContent = firstOperand;
        }
    });
});


// Equal button gives result when clicked
equalsButton.addEventListener('click', () => {
    if(firstOperand && secondOperand && operator){
        const result = operate(parseFloat(firstOperand), operator, parseFloat(secondOperand));
        firstOperand = result;
        secondOperand = "";
        operator = "";
        screen.textContent = result;
    } else{
        return;
    }
})

// Clear button resets everything back to 0

clearButton.addEventListener('click', () => {
    firstOperand = "";
    secondOperand = "";
    operator = "";
    screen.textContent = "";
})