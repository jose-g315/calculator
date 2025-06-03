

// global variables
let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let operatorPressed = false;
let equalsButtonPressed = false;

const display = document.querySelector(".display");

function add(a,b) {
    return a + b
};
function subtract(a,b) {
    return a - b;
};
function multiply(a,b) {
    return a * b;
};
function divide(a,b) {
    return a / b;
};
function operate(numberOne, operator, numberTwo){
    if (operator === "+"){
        return add(numberOne,numberTwo);
    } else if (operator === "-"){
        return subtract(numberOne,numberTwo);
    } else if (operator === "x"){
        return multiply(numberOne,numberTwo);
    } else if (operator === "/"){
        if (numberTwo === 0){
            return "Nope!";
        } else {
            return divide(numberOne,numberTwo);
        }
    }
};
function clearCalculator(){
    numberOne = "";
    numberTwo = "";
    operator = "";
    result = "";
    operatorPressed = false;
    equalsButtonPressed = false;
    updateDisplay(0);
};

function disablingDecimal(number){
    const decimalButton = document.querySelector("#decimal");
    if (number.includes(".")){
        decimalButton.disabled = true;
    }else {
        decimalButton.disabled = false;
    } 
};

function updateDisplay(input){
    display.textContent = input;
};
function appendToCorrectOperand(operatorWasPressed,button) {
    if(operatorWasPressed && numberTwo.length < 16) {
        disablingDecimal(numberTwo += button.value);
        numberTwo = formattingNumber(numberTwo);
        console.log (numberOne, operator, numberTwo);
        updateDisplay(numberTwo);
    } else if (numberOne.length < 16) {
        disablingDecimal(numberOne += button.value);
        numberOne = formattingNumber(numberOne);
        console.log (numberOne, operator, numberTwo);
        updateDisplay(numberOne);     
    }
};
function checkingIfComputationIsComplete() {
    if(numberOne !== "" && numberTwo !== "") {
        return true;
    } else {
        return false;
    }
};
function calculateAndDisplay(){
    result = formattingNumber(operate(+numberOne,operator,+numberTwo));
    console.log(numberOne, operator, numberTwo, result);
    updateDisplay(result);
    numberOne = result;
};
function formattingNumber(number) {
    if (!isNaN(number)) {
        return Number(number).toString();
    } else {
        return number.toFixed(10);
        }
};

const buttons = document.querySelectorAll("button");
for (const btn of buttons) {
    btn.addEventListener("click", (e) => {
        switch (e.target.className) {
            case "number":             
                appendToCorrectOperand(operatorPressed,btn);
                break;
            case "operator":
                // prevents early usage of the operator buttons
                if (numberOne === "" && numberTwo === ""){
                    break;
                }
                if (!checkingIfComputationIsComplete() || equalsButtonPressed) {
                    numberTwo = "";
                    disablingDecimal("No Decimal");
                    operator = btn.value;
                    operatorPressed = true;
                    updateDisplay(operator);
                    equalsButtonPressed = false;
                    break;
                }
                if (checkingIfComputationIsComplete()) {
                    calculateAndDisplay();
                    numberTwo = "";
                    operator = btn.value;
                    break;
                }
                break;
            case "equals":
                if(checkingIfComputationIsComplete()) {
                    calculateAndDisplay();
                    equalsButtonPressed = true;
                    break;
                }
                break;
            case "clear":
                clearCalculator();
                disablingDecimal("No Decimal");
                break;

        };
        
    })
};