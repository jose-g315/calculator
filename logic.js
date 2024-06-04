// jose-g315
// calculator logic and DOM manipulation

//basic math functions
function add (a,b){
    //return (a + b).toFixed(0);
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return +parseFloat(a * b).toFixed(5);
}
function divide(a,b){
    return +parseFloat(a / b).toFixed(5);
}

// global variables 
let numberOne = "0";
let operator = "";
let numberTwo = "";

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
// disabling/enabling the decimal
function disablingDecimal(number){
    if (number.includes(".")){
        decimalButton.disabled = true;
    }else {
        decimalButton.disabled = false;
    } 
}

const display = document.querySelector(".display");
display.textContent = numberOne;
const decimalButton = document.querySelector(".decimal");

const buttons = document.querySelectorAll("button")
    .forEach(button => button.addEventListener("click",() => {
        
         // evaluating if user presses another operator before pressing equals & resetting numberTwo
        if (numberTwo.length != 0 && button.classList.contains("operator")){
            numberOne = operate(Number(numberOne),operator,Number(numberTwo)).toString();
            numberTwo = "";
            display.textContent = numberOne;
        }
        if (numberOne.length !== 0 && button.classList.contains("number") && operator.length !== 0){
            // preventing leading zeros before the decimal
            if (numberTwo === "0") {
                numberTwo = "";
            }
            // limiting display to 12 characters
            if (numberTwo.length < 12) {
                numberTwo += button.value;
            }
            display.textContent = numberTwo;
            disablingDecimal(numberTwo);
        } else if (button.classList.contains("operator")){
            if (numberTwo.length === 0) {
                operator = button.value;
                decimalButton.disabled = false;
            }
           
        } else if (button.classList.contains("number")){
            // preventing leading zeros before the decimal
            if (numberOne === "0") {
                numberOne = "";
            }
            // limiting display to 12 characters
            if (numberOne.length < 12) {
                numberOne += button.value;
            }
            display.textContent = numberOne;
            disablingDecimal(numberOne);
        }
        console.log(numberOne + " " + operator + " " + numberTwo);

}));

const equalsButton = document.querySelector(".equals")
    .addEventListener("click", () => {
        console.log(operate(Number(numberOne),operator,Number(numberTwo)));
        // stopping an early press of the equal button to do anything
        if (numberOne.length > 0 && operator.length > 0 && numberTwo.length > 0) {
            if (numberOne.length > 12){
                numberOne = operate(Number(numberOne),operator,Number(numberTwo));
                numberOne = numberOne.toExponential();
                decimalButton.disabled = false;
                display.textContent = numberOne;
            }
            // assigning numberOne to the result of the operation allows for chaining the result example: 2+2=4=6=8
            numberOne = operate(Number(numberOne),operator,Number(numberTwo)).toString();
            decimalButton.disabled = false;
            display.textContent = numberOne;
        }
});

const clearButton = document.querySelector(".clear")
    .addEventListener("click", () => {
        numberOne = "";
        numberTwo = "";
        operator = "";
        display.textContent = "";
        decimalButton.disabled = false;
});

const backspaceButton = document.querySelector(".backspace")
    .addEventListener("click", () => {
        if (numberTwo.length === 0){
            numberOne = numberOne.slice(0,-1);
            display.textContent = numberOne;
            disablingDecimal(numberOne);
        } else {
            numberTwo = numberTwo.slice(0,-1);
            display.textContent = numberTwo;
            disablingDecimal(numberTwo);
        }
    });

