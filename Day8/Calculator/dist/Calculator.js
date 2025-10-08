"use strict";
const input = document.getElementById("userinput");
function display(message) {
    if (input.value === '0') {
        input.value = message;
    }
    else {
        input.value += message;
    }
}
function reset() {
    input.value = "0";
}
function calculate() {
    try {
        input.value = eval(input.value);
        if (input.value == 'Infinity') {
            throw new Error("Failed");
        }
    }
    catch (e) {
        input.value = "Math Error";
        setTimeout(() => input.value = "", 1000);
    }
}
