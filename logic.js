// jose-g315
// calculator logic and DOM manipulation

//basic math functions
function add (a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    return a / b;
}

// global variables 
let numberOne = "";
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
        return divide(numberOne,numberTwo);
    }
}

const display = document.querySelector(".display");

const buttons = document.querySelectorAll("button")
    .forEach(button => button.addEventListener("click",() => {

        if (numberOne.length !== 0 && button.classList.contains("number") && operator.length !== 0){
            numberTwo += button.value;
            display.textContent = numberTwo;
        } else if (button.classList.contains("operator")){
            operator = button.value;
        } else if (button.classList.contains("number")){
            numberOne += button.value;
            display.textContent = numberOne;
        }
        console.log(numberOne + " " + operator + " " + numberTwo);

}));

const equalsButton = document.querySelector(".equals")
    .addEventListener("click", () => {
        console.log(operate(Number(numberOne),operator,Number(numberTwo)));
        display.textContent = operate(Number(numberOne),operator,Number(numberTwo));
});

const clearButton = document.querySelector(".clear")
    .addEventListener("click", () => {
        numberOne = "";
        numberTwo = "";
        operator = "";
        display.textContent = "";
});

const backspaceButton = document.querySelector(".backspace")
    .addEventListener("click", ( )=> {
        if (numberTwo.length === 0){
            numberOne = numberOne.slice(0,-1);
            display.textContent = numberOne;
        } else {
            numberTwo = numberTwo.slice(0,-1);
            display.textContent = numberTwo;
        }
        console.log("Number 1: "+numberOne);
        console.log("Number 2: "+numberTwo);
    });