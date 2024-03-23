let historyArr = [""];
let inputPaused = false;
const buttons = document.querySelector("#calculatorBtnsContainer");
const input = document.querySelector("#calculatorBtnsContainer input");
buttons.addEventListener("click", getInput, false);

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
            console.log("Is Adding! (+)->", expression, firstNum, secondNum);
            return add(firstNum, secondNum);
        case "-":
            console.log("Is Subtracting! (-)->", expression, firstNum, secondNum);
            return subtract(firstNum, secondNum);
        case "x":
            console.log("Is Multiplying! (x)->", expression, firstNum, secondNum);
            return multiply(firstNum, secondNum);
        case "/":
            console.log("Is Dividing! (/)->", expression, firstNum, secondNum);
            return divide(firstNum, secondNum);
    }
}

function processInput() {
    const inputArr = input.value.split(" ");
    console.log(inputArr)
    let firstNum = "";
    let secondNum = "";
    let expression = "";

    for (let i = 0; i <= inputArr.length; i++) {
        console.log(`iS${i}: `, expression, firstNum, secondNum);
        if (!isNaN(+inputArr[i])) {
            if (expression === "") {
                firstNum = inputArr[i];
            } else {
                secondNum = inputArr[i];
            }
        } else if (expression !== "" && secondNum !== "") {
            firstNum = operate(expression, +firstNum, +secondNum);
            console.log("RESULT = " + firstNum);
            secondNum = "";
            expression = inputArr[i];
        } else if (inputArr[i] !== " "){
            expression = inputArr[i];
        }
        console.log(`iE${i}: `, expression, firstNum, secondNum);
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
    if (event.target.tagName === "BUTTON" && inputPaused === false) {
        switch (event.target.id) {
            case "btn0":
                addToInput("0");
                break;
            case "btn1":
                addToInput("1");
                break;
            case "btn2":
                addToInput("2");
                break;
            case "btn3":
                addToInput("3");
                break;
            case "btn4":
                addToInput("4");
                break;
            case "btn5":
                addToInput("5");
                break;
            case "btn6":
                addToInput("7");
                break;
            case "btn7":
                addToInput("7");
                break;
            case "btn8":
                addToInput("8");
                break;
            case "btn9":
                addToInput("9");
                break;
            case "btnAdd":
                replaceExpression (" + ");
                break;
            case "btnSubtract":
                replaceExpression (" - ");
                break;
            case "btnMultiply":
                replaceExpression (" x ");
                break;
            case "btnDivide":
                replaceExpression (" / ");
                break;
            case "btnFloat":
                addToInput(".");
                break;
            case "btnUndo":
                undoLastInput();
                break;
            case "btnClear":
                input.value = "";
                historyArr.push(input.value);
                break;
            case "btnOperate":
                processInput();
                break;
        }
        input.scrollLeft = input.scrollWidth - input.clientWidth;
        console.log(historyArr);
    }
}