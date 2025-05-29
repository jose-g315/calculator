

// global variables
let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let operatorPressed = false;
let equationNotComplete = true;

const display = document.querySelector(".display");
display.textContent = 0;

function add(a,b) {
    return a + b
};
function subtract(a,b) {
    return a - b;
};
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}
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
}
function clearCalculator(){
    numberOne = "";
    numberTwo = "";
    operator = "";
    result = "";
    operatorPressed = false;
    updateDisplay(0);
    console.log (numberOne, operator, numberTwo);
}

function disablingDecimal(number){
    const decimalButton = document.querySelector("#decimal");
    if (number.includes(".")){
        decimalButton.disabled = true;
    }else {
        decimalButton.disabled = false;
    } 
}
function disablingLeadingZero(number){
    const zeroButton = document.querySelector("#zero");
    if (number.includes("0")){
        zeroButton.disabled = true;
    }else {
        zeroButton.disabled = false;
    } 
}

function updateDisplay(input){
    display.textContent = input;
}
function appendToCorrectOperand(operatorWasPressed,button) {
    if(operatorWasPressed) {
        disablingDecimal(numberTwo += button.value);
        console.log (numberOne, operator, numberTwo);
        updateDisplay(numberTwo);
    } else {
        disablingDecimal(numberOne += button.value);
        console.log (numberOne, operator, numberTwo);
        updateDisplay(numberOne);     
    }
}
function checkingIfComputationIsComplete() {
    if(numberOne !== "" && numberTwo !== "") {
        return true;
    } else {
        return false;
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
                operator = btn.value;
                operatorPressed = true;
                console.log (numberOne, operator, numberTwo);
                updateDisplay(operator);
                break;
            case "equals":
                if(checkingIfComputationIsComplete()) {
                    // assigning numberOne to the result of the operation allows for chaining the result example: 2+2=4=6=8
                    numberOne = operate(+numberOne,operator,+numberTwo);
                    console.log(numberOne, operator, numberTwo,numberOne);
                    updateDisplay(numberOne);
                    break;
                }
                break;
            case "clear":
                clearCalculator();
                disablingDecimal("No Decimal");
                break;

        }
        
    })
}
let x = "";
console.log("X:" + x);