let principal_amount;
let years;
let rate;
let ErrorInformation;
let interest;
let finalamount;

document.getElementById("btn").onclick = function () {
    principal_amount = document.getElementById("principalamount").value;
    years = document.getElementById("years").value;

    if (validate(principal_amount, years)) {
        principal_amount = Number(principal_amount);
        years = Number(years);
        rate = finalrate(principal_amount, years);
        interest = calculate(principal_amount, rate, years);
        finalamount = principal_amount + interest;

        document.getElementById("rinterest").textContent = `Interest: ${interest.toFixed(2)}`;
        document.getElementById("tamount").textContent = `Total Amount: ${finalamount.toFixed(2)}`;
        document.getElementById("message").textContent = `Applied Rate: ${rate}%`;
        document.getElementById("message").style.color = "green";
        document.getElementById("message").style.fontSize = "1em";
    } else {
        document.getElementById("rinterest").textContent = "";
        document.getElementById("tamount").textContent = "";

        const msg = document.getElementById("message");
        msg.innerHTML = ErrorInformation;
        msg.style.color = "red";
        msg.style.fontSize = "1em";
    }
};

function validate(principal_amount, years) {
    if (isNaN(principal_amount) || isNaN(years)) {
        ErrorInformation = "Please enter numeric values only.";
        return false;
    }

    principal_amount = Number(principal_amount);
    years = Number(years);

    if (principal_amount < 500 || principal_amount > 10000) {
        ErrorInformation = "Please enter a principal between $500 and $10,000.";
        return false;
    }

    return true;
}

function finalrate(principal_amount, years) {
    let r;
    if (principal_amount < 1000) {
        r = 5;
    } else if (principal_amount >= 1000 && principal_amount <= 5000) {
        r = 7;
    } else {
        r = 10;
    }

    if (years > 5) {
        r += 2;
    }

    return r;
}

function calculate(principal_amount, rate, years) {
    return (principal_amount * rate * years) / 100;
}
