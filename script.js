const btnClear = document.querySelector("#btn-clear");
const calculatorKeyBoard = document.querySelector("#calculator-keyboard");
const display = document.querySelector(".display");

let firstNum = null;
let secondNum = null;
let operator = null;
let resetDisplay = false;

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
    if (firstNum === 0 && secondNum === 0) {
        return "Undefined result";
    }

    if (secondNum === 0) {
        return "It is not possible to divide by zero";
    }

    return firstNum / secondNum;
};

const operate = () => {
    let result = 0;

    if (operator === "+") {
        result = add(firstNum, secondNum);
    } 
    if (operator === "-") {
        result = subtract(firstNum, secondNum);
    }
    if (operator === "*") {
        result = multiply(firstNum, secondNum);
    }
    if (operator === "/") {
        result = divide(firstNum, secondNum);
    }

    clearStorage();
    return roundResult(result);
}

const handleInput = (atualDisplay, input) => {
    if (atualDisplay.length < 10 || resetDisplay) {
        if (resetDisplay) {
            resetDisplay = false;

            if (input === ".") {
                return `0${input}`;
            }
            return input;
        }

        if (atualDisplay === "0" && input !== ".") {
            return input;
        }
    
        if (!atualDisplay.includes(".") || Number(input) ) {
            return atualDisplay + input;
        }
    
        if (atualDisplay.includes(".") && input === ".") {
            return atualDisplay;
        }
    }
    return atualDisplay;
}

const handleOperation = (input) => {
    if (isNaN(firstNum)) {
        clearStorage();
    }
    
    if (input === "=") {
        if (firstNum !== null && operator !== null && !resetDisplay) {
            secondNum = Number(display.textContent);
            updateDisplay( operate() );
            resetDisplay = true;
        }
        return;
    }

    if (firstNum !== null && operator !== null 
        && !resetDisplay) {
        secondNum = Number(display.textContent);
        firstNum = operate();
        updateDisplay(firstNum);
    } else {
        firstNum = Number(display.textContent);
    }

    operator = input;
    resetDisplay = true;
}

const populateDisplay = (input) => {
    display.textContent = handleInput(display.textContent, input);
}

const updateDisplay = (result) => {
    display.textContent = result;
}

const roundResult = (result) => {
    const resultString = result.toString();

    if (resultString.includes(".")) {
        const decimalNumber = resultString.split(".")[1];
        if (decimalNumber.length > 6) {
            return parseFloat(result.toFixed(6));
        }
    }
    return result
}

const clearStorage = () => {
    firstNum = null;
    operator = null;
    secondNum = null;
    resetDisplay = false;
};

const deleteLast = () => {
    let newString = display.textContent.slice(0, (display.textContent.length - 1));
    if (newString.length === 0) {
        newString = 0
    }
    display.textContent = newString;
};

const negNumber = () => {
    const num = Number(display.textContent);

    if (num === 0) {
        return;
    }

    display.textContent = -num;
};

const percent = () => {
    if (display.textContent !== "0") {
        display.textContent = Number(display.textContent) / 100;
    }
}

btnClear.addEventListener("click", () => {
    updateDisplay("0");
    clearStorage();
});

calculatorKeyBoard.addEventListener("click", (event) => {
    const target = event.target;
    
    if (target.id === "calculator-keyboard" 
        || target.id === "number-buttons" 
        || target.id === "operator-buttons") 
        {
        return; 
    }
    
    switch (true) {
        case target.classList.contains("number"):
        case target.id === "btn-decimal":
            populateDisplay(target.textContent);
            break;
        case target.classList.contains("operator"):
        case target.id === "btn-equal":
            handleOperation(target.textContent);
            break;
        case target.id === "btn-del":
            deleteLast();
            break;
        case target.id === "btn-neg":
            negNumber();
            break;
        case target.id === "btn-percent":
            percent();
            break;
        default:
            return;
    }
});