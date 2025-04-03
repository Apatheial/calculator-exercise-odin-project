let firstNum;
let secondNum;
let operator;

const add = ( firstNum, secondNum ) => {
    return firstNum + secondNum;
};

const subtract = ( firstNum, secondNum ) => {
    return firstNum - secondNum;
};

const multiply = ( firstNum, secondNum ) => {
    return firstNum * secondNum;
};

const divide = ( firstNum, secondNum ) => {
    return firstNum / secondNum;
};

const operate = (firstNum, secondNum, operator) => {
    if (operator === "+") return add(firstNum, secondNum);
    if (operator === "-") return subtract(firstNum, secondNum);
    if (operator === "*") return multiply(firstNum, secondNum);
    if (operator === "*") return divide(firstNum, secondNum);
};