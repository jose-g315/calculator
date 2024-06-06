// jose-g315
// calculator logic and DOM manipulation

// basic math functions
function add (a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return +parseFloat(a * b).toFixed(7);
}
function divide(a,b){
    return +parseFloat(a / b).toFixed(7);
}

// global variables 
let numberOne = "0";
let operator = "";
let numberTwo = "";
let equalsButtonPressed = false;
let isNegative = false;
// operate function 
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

// display element and setting it to zero at start
const display = document.querySelector(".display");
display.textContent = numberOne;

const decimalButton = document.querySelector(".decimal");

// adding an event listener to every button and filtering by class such as number and operator
const buttons = document.querySelectorAll("button")
    .forEach(button => button.addEventListener("click",() => {
         // evaluating if user presses another operator before pressing equals & resetting numberTwo
        if (numberTwo.length !== 0 && button.classList.contains("operator")){
            if (equalsButtonPressed){
                // checking to see what operator was pressed and setting numberTwo to an appropriate value
                if (operator === "x" || operator === "/"){
                    numberTwo = "1";
                } else {
                    numberTwo = "";
                }
            }
            numberOne = operate(Number(numberOne),operator,Number(numberTwo)).toString();
            if (numberOne.length >= 12){
                numberOne = Number(numberOne).toPrecision(6);
                display.textContent = numberOne;
                equalsButtonPressed = false;
            } else{
                display.textContent = numberOne;
                equalsButtonPressed = false;
            }
            numberTwo = "";
            operator = button.value;
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
                isNegative = false;
            }
           
        } else if (button.classList.contains("number")){
            // preventing leading zeros before the decimal
            if (numberOne === "0") {
                numberOne = "";
                console.log(typeof(numberOne));
            }
            // limiting display to 12 characters
            if (numberOne.length < 12) {
                numberOne += button.value;
            }
            display.textContent = numberOne;
            disablingDecimal(numberOne);
        }
        console.log("Outside:"+numberOne + " " + operator + " " + numberTwo);

}));

const equalsButton = document.querySelector(".equals")
    .addEventListener("click", () => {
        console.log(operate(Number(numberOne),operator,Number(numberTwo)));
        // if statement stops anything from happening if equals button is pressed to early
        if (numberOne.length > 0 && operator.length > 0 && numberTwo.length > 0) {
            // assigning numberOne to the result of the operation allows for chaining the result example: 2+2=4=6=8
            numberOne = operate(Number(numberOne),operator,Number(numberTwo)).toString();
            console.log(numberOne);
            if (numberOne.length >= 12){
                numberOne = Number(numberOne).toPrecision(6);
                console.log(typeof(numberOne));
                decimalButton.disabled = false;
                display.textContent = numberOne;
            } else{
                decimalButton.disabled = false;
                display.textContent = numberOne;
            }  
        }
        equalsButtonPressed = true
});

// logic for clear button
const clearButton = document.querySelector(".clear")
    .addEventListener("click", () => {
        // clearing all variables
        numberOne = "";
        numberTwo = "";
        operator = "";
        display.textContent = "0";
        decimalButton.disabled = false;
        isNegative = false;
});

// logic for back space button
const backspaceButton = document.querySelector(".backspace")
    .addEventListener("click", () => {
        if (equalsButtonPressed){

        } else if (numberTwo.length === 0){
            numberOne = numberOne.slice(0,-1);
            display.textContent = numberOne;
            disablingDecimal(numberOne);
        } else {
            numberTwo = numberTwo.slice(0,-1);
            display.textContent = numberTwo;
            disablingDecimal(numberTwo);
        }
    });

// logic for sign button
const signButton = document.querySelector(".sign")
    .addEventListener("click", () => {
        if (numberOne.length !== 0 && numberOne !== "0" && numberTwo.length === 0 && operator.length === 0) {
            if (!isNegative) {
                numberOne = (-Math.abs(Number(numberOne))).toString();
                display.textContent = numberOne;
                isNegative = true;
            } else if (isNegative) {
                numberOne = (Math.abs(Number(numberOne))).toString();
                display.textContent = numberOne;
                isNegative = false;
            }
        } else if (numberOne.length !== 0 && numberTwo.length !== 0) {
            if (!isNegative) {
                numberTwo = (-Math.abs(Number(numberTwo))).toString();
                display.textContent = numberTwo;
                isNegative = true;
            } else if (isNegative) {
                numberTwo = (Math.abs(Number(numberTwo))).toString();
                display.textContent = numberTwo;
                isNegative = false;
            }
        }
    });