// jose-g315
// calculator logic and DOM manipulation

// global variables
let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
// onStart onFirst onOperator onSecond onComplete
let calculatorState = "onStart";

const display = document.querySelector(".display");

function operate(numberOne, operator, numberTwo){
    if (operator === "+"){
        return numberOne + numberTwo;
    } else if (operator === "-"){
        return numberOne - numberTwo;
    } else if (operator === "x"){
        return numberOne * numberTwo;
    } else if (operator === "/"){
        if (numberTwo === 0){
            return "Nope!";
        } else {
            return numberOne / numberTwo;
        }
    }
};
function clearCalculator(){
    numberOne = "";
    numberTwo = "";
    operator = "";
    result = "";
    calculatorState = "onStart";
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
function calculateAndDisplay(){
    result = formattingNumber(operate(+numberOne,operator,+numberTwo));
    updateDisplay(result);
    numberOne = result;
};
function formattingNumber(number) {
    if (typeof number === "string") {
        if (number.includes(".")) {
            return number;
        }
        return Number(number).toString();
    } else {
        return Number(number.toFixed(10));
        }
};

function deleteLastDigit(number){
    return number.slice(0,-1);
}
function negateNumber(number){
    if (number === ".") {
        return number;
    }
    if(number > 0) {
        return (-Math.abs(Number(number))).toString();
    } else {
        return (Math.abs(Number(number))).toString();
    }
}

function appendToCorrectOperand(button) {
    displayLock = false; 
    if((calculatorState === "onOperator" || calculatorState === "onSecond") && numberTwo.length < 16) {
        disablingDecimal(numberTwo += button.value);
        numberTwo = formattingNumber(numberTwo);
        updateDisplay(numberTwo);
        calculatorState = "onSecond";
    } else if ((calculatorState === "onStart" || calculatorState === "onFirst") && numberOne.length < 16) {
        disablingDecimal(numberOne += button.value);
        numberOne = formattingNumber(numberOne);
        updateDisplay(numberOne); 
        calculatorState = "onFirst";    
    }
};

const buttons = document.querySelectorAll("button");
for (const btn of buttons) {
    btn.addEventListener("click", (e) => {
        switch (e.target.className) {
            case "number": 
                if (calculatorState === "onComplete") {
                    clearCalculator();
                    calculatorState = "onStart";
                }       
                appendToCorrectOperand(btn);
                break;
            case "operator":
                // prevents early usage of the operator buttons
                if (numberOne === "" && numberTwo === ""){
                    break;
                }
                // allowing for changing of the operator before inputting second number
                if (numberTwo === "") {
                    calculatorState = "onFirst";
                }
                if (calculatorState === "onFirst" || calculatorState === "onComplete") {
                    numberTwo = "";
                    disablingDecimal("No Decimal");
                    operator = btn.value;
                    updateDisplay(operator);
                    calculatorState = "onOperator";
                    break;
                }
                if (calculatorState === "onOperator" || calculatorState === "onSecond") {
                    calculateAndDisplay();
                    numberTwo = "";
                    operator = btn.value;
                    break;
                }
                break;
            case "equals":
                if(calculatorState === "onSecond" || calculatorState === "onComplete") {
                    calculateAndDisplay();
                    calculatorState = "onComplete";
                    break;
                }
                break;
            case "clear":
                clearCalculator();
                disablingDecimal("No Decimal");
                break;
            case "backspace":
                if(calculatorState === "onSecond"){
                    numberTwo = deleteLastDigit(numberTwo);
                    numberTwo.length === 0 ? updateDisplay("0") : updateDisplay(numberTwo);
                    break;
                } else if (calculatorState === "onFirst") {
                    numberOne = deleteLastDigit(numberOne);
                    numberOne.length === 0 ? updateDisplay("0") : updateDisplay(numberOne);
                    break;
                }
                break;
            case "sign":
                if(calculatorState === "onSecond"){
                    numberTwo = negateNumber(numberTwo);
                    updateDisplay(numberTwo);
                    break;
                } else if (calculatorState === "onFirst") {
                    numberOne = negateNumber(numberOne);
                    updateDisplay(numberOne);
                    break;
                }
        };
        
    })
};
