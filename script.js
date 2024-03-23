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
    input.value = firstNum;

    if(input.value == "Infinity" || input.value == "NaN") {
        input.readOnly = true;
        inputPaused = true;
        setTimeout(undoLastInput , 1000 );
    } else {
        historyArr.push(input.value);
    }
}

function undoLastInput() {
    if (historyArr.length > 1) {
        input.value = historyArr[historyArr.length - 2];
        historyArr.pop();
    }
    input.readOnly = false;
    inputPaused = false;
    console.log(historyArr.pop(), historyArr);
}

function getInput(event) {
    if (event.target.tagName === "BUTTON" && inputPaused === false) {
        switch (event.target.id) {
            case "btn0":
                input.value += "0";
                break;
            case "btn1":
                input.value += "1";
                break;
            case "btn2":
                input.value += "2";
                break;
            case "btn3":
                input.value += "3";
                break;
            case "btn4":
                input.value += "4";
                break;
            case "btn5":
                input.value += "5";
                break;
            case "btn6":
                input.value += "6";
                break;
            case "btn7":
                input.value += "7";
                break;
            case "btn8":
                input.value += "8";
                break;
            case "btn9":
                input.value += "9";
                break;
            case "btnAdd":
                input.value += " + ";
                break;
            case "btnSustract":
                input.value += " - ";
                break;
            case "btnMultiply":
                input.value += " x ";
                break;
            case "btnDivide":
                input.value += " / ";
                break;
            case "btnFloat":
                input.value += ".";
                break;
            case "btnUndo":
                undoLastInput();
                break;
            case "btnClear":
                input.value = "";
                break;
            case "btnOperate":
                processInput();
                break;
        }
        input.scrollLeft = input.scrollWidth - input.clientWidth;
        historyArr.push(input.value);
    }
}