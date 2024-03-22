let historyArr = [""];
const buttons = document.querySelector("#calculatorBtnsContainer");
const input = document.querySelector("#calculatorBtnsContainer input");
buttons.addEventListener("click", getInput, false);

function add(firstNum, SecondNum) {
    return firstNum + SecondNum;
}

function sustract(firstNum, SecondNum) {
    return firstNum - SecondNum;
}

function multiply(firstNum, SecondNum) {
    return firstNum * SecondNum;
}

function divide(firstNum, SecondNum) {
    return firstNum / SecondNum;
}

function undoLastInput() {
    if (historyArr.length > 1) {
        input.value = historyArr[historyArr.length - 2];
        historyArr.pop();
    }
    console.log(historyArr.pop(), historyArr);
}

function operate() {
    console.log(input.value);
}

function getInput(event) {
    if (event.target.tagName === "BUTTON") {
        console.log(event.target.id);
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
                operate();
                break;
        }
        input.scrollLeft = input.scrollWidth - input.clientWidth;
        historyArr.push(input.value);
    }
}