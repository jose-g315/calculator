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

let numberOne = "";
let numberTwo = "";
let operator = "";
let result = "";
let operatorPressed = false;

const display = document.querySelector(".display");
function updateDisplay(input){
    display.textContent = input;
}
const buttons = document.querySelectorAll("button");
for (const btn of buttons) {
    btn.addEventListener("click", (e) => {
        switch (e.target.className) {
            case "number":
                if(operatorPressed) {
                    numberTwo += btn.value;
                    console.log (numberOne, operator, numberTwo)
                    updateDisplay(numberTwo);
                } else {
                    numberOne += btn.value;
                    console.log (numberOne, operator, numberTwo)
                    updateDisplay(numberOne)     
                }
;
                break;
            case "operator": 
                operator = btn.value;
                operatorPressed = true;
                console.log (numberOne, operator, numberTwo)
                updateDisplay(operator);
                break;
            case "equals":
                result = operate(+numberOne,operator,+numberTwo);
                updateDisplay(result);
        }
        
    })
}