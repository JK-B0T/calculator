let historyArr = [""];
let inputPaused = false;
const buttons = document.querySelector("#calculatorBtnsContainer");
const input = document.querySelector("#calculatorBtnsContainer input");

buttons.addEventListener("click", getInput, false);
document.addEventListener('keydown', getInput, false);

function add(firstNum, SecondNum) {
    return firstNum + SecondNum;
}

function subtract(firstNum, SecondNum) {
    return firstNum - SecondNum;
}

function multiply(firstNum, SecondNum) {
    return firstNum * SecondNum;
}

function divide(firstNum, SecondNum) {
    return firstNum / SecondNum;
}

function operate(expression, firstNum, secondNum) {
    switch (expression) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "x":
            return multiply(firstNum, secondNum);
        case "/":
            return divide(firstNum, secondNum);
    }
}

function processInput() {
    const inputArr = input.value.split(" ");
    let firstNum = "";
    let secondNum = "";
    let expression = "";

    for (let i = 0; i <= inputArr.length; i++) {
        if (!isNaN(+inputArr[i])) {
            if (expression === "") {
                firstNum = inputArr[i];
            } else {
                secondNum = inputArr[i];
            }
        } else if (expression !== "" && secondNum !== "") {
            firstNum = operate(expression, +firstNum, +secondNum);
            secondNum = "";
            expression = inputArr[i];
        } else if (inputArr[i] !== " "){
            expression = inputArr[i];
        }
    }

    if(firstNum == "Infinity" || firstNum == "NaN") {
        input.value = firstNum;
        input.readOnly = true;
        inputPaused = true;
        setTimeout(undoLastInput , 1000 );
    } else {
        input.value = +firstNum.toFixed(3);
        historyArr.push(input.value);
    }
}

function addToInput(addedInput) {
    input.value += addedInput;
    historyArr.push(input.value);
}

function addDecimal() {
    const inputArr = input.value.trim().split(" ");
    const lastInput = (inputArr[inputArr.length - 1]);

    console.log(lastInput, inputArr, inputArr[inputArr.length - 1], +lastInput % 1);
    if (!isNaN(+lastInput) && +lastInput % 1 === 0) {
        addToInput(".");
    }
}

function undoLastInput() {
    if (historyArr.length > 1) {
        input.value = historyArr[historyArr.length - 2];
        historyArr.pop();
    }
    input.readOnly = false;
    inputPaused = false;
}

function replaceExpression (newExpression) {
    const inputArr = input.value.trim().split(" ");
    const lastInput = (inputArr[inputArr.length - 1]);
    if (isNaN(+lastInput)) {
        undoLastInput();
        addToInput(newExpression);
    } else {
        addToInput(newExpression);
    }
}

function getInput(event) {
    let inputValue;
    if (event.type === "click") {
        inputValue = event.target.id;
        console.log("click", inputValue);
    } else {
        inputValue = event.code;
        console.log("keydown", inputValue);
        event.stopPropagation();
        event.preventDefault();
    }

    if ((event.target.tagName === "BUTTON" || event.type === "keydown") && inputPaused === false) {
        switch (inputValue) {
            case "btn0": 
            case "Digit0":
            case "Numpad0":
                addToInput("0");
                break;
            case "btn1": 
            case "Digit1":
            case "Numpad1":
                addToInput("1");
                break;
            case "btn2": 
            case "Digit2":
            case "Numpad2":
                addToInput("2");
                break;
            case "btn3": 
            case "Digit3":
            case "Numpad3":
                addToInput("3");
                break;
            case "btn4": 
            case "Digit4":
            case "Numpad4":
                addToInput("4");
                break;
            case "btn5": 
            case "Digit5":
            case "Numpad5":
                addToInput("5");
                break;
            case "btn6": 
            case "Digit6":
            case "Numpad6":
                addToInput("6");
                break;
            case "btn7": 
            case "Digit7":
            case "Numpad7":
                addToInput("7");
                break;
            case "btn8": 
            case "Digit8":
            case "Numpad8":
                addToInput("8");
                break;
            case "btn9": 
            case "Digit9":
            case "Numpad9":
                addToInput("9");
                break;
            case "btnAdd":
            case "NumpadAdd":
                replaceExpression (" + ");
                break;
            case "btnSubtract":
            case "NumpadSubtract":
                replaceExpression (" - ");
                break;
            case "btnMultiply":
            case "KeyX":
                replaceExpression (" x ");
                break;
            case "btnDivide":
            case "NumpadDivide":
                replaceExpression (" / ");
                break;
            case "btnFloat":
            case "NumpadDecimal":
            case "Period":
                addDecimal();
                break;
            case "btnUndo":
            case "Backspace":
                undoLastInput();
                break;
            case "btnClear":
            case "Escape":
                input.value = "";
                historyArr.push(input.value);
                break;
            case "Enter":
            case "btnOperate":
                processInput();
                break;
        }
        input.scrollLeft = input.scrollWidth - input.clientWidth;
    }
}