const mortgageAmnt = document.getElementById("mrtg-amnt");
const numOfYears = document.getElementById("mrtg-trm");
const interestRate = document.getElementById("int-rt");
const repayment = document.getElementById("rpymnt");
const interestOnly = document.getElementById("intrstonly");
const calculator = document.getElementById("calc-btn");
const clearBtn = document.getElementById("clr-btn");
const resultsEmpty = document.getElementById("results-empty");
const resultsFilled = document.getElementById("results-filled");
const form = document.getElementById("form");
const popup = document.getElementById("error-popup");
const popupMessage = document.getElementById("error-message");
const closePopup = document.getElementById("close-popup");

function handleClick(event) {
    event.preventDefault();
    let P = parseFloat(mortgageAmnt.value);
    let annualRate = parseFloat(interestRate.value);
    let years = parseFloat(numOfYears.value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years)) {
        showError("Please complete all fields before calculating.");
        return;
    }

    const i = annualRate / 100 / 12; // monthly interest rate
    const n = years * 12;            // number of monthly payments

    let M;

    if (interestOnly.checked) {
        // Interest-only mortgage: just the interest per month
        M = P * i;
        console.log(`Monthly Interest Only: £${M.toFixed(2)}`);
        resultsEmpty.style.display = "none";
        resultsFilled.style.display = "block";
    }
    else if (repayment.checked) {
        // Repayment mortgage
        if (i === 0) {
            M = P / n; // special case: no interest
        } else {
            M = P * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
        }
        console.log(`Monthly Repayment: £${M.toFixed(2)}`);
        resultsEmpty.style.display = "none";
        resultsFilled.style.display = "block";
    }
    else {
        console.log(`Please select a mortgage type`);
        return; // don't continue if nothing selected
    }

    const monthlyText = resultsFilled.querySelector(".monthly");
    const totalText = resultsFilled.querySelector(".total");

    if (monthlyText && totalText) {
        monthlyText.textContent = "£" + Number(M.toFixed(2)).toLocaleString();

        if (interestOnly.checked) {
            totalText.textContent = "£" + Number((M * n + P).toFixed(2)).toLocaleString(); // interest + principal
        } else {
            totalText.textContent = "£" + Number((M * n).toFixed(2)).toLocaleString(); // total for repayment
        }
    }
}


calculator.addEventListener('click', handleClick);
clearBtn.addEventListener("click", () => {
    resultsEmpty.style.display = "flex";
    resultsFilled.style.display = "none";
    form.style.display = "block";
    repayment.checked = false;
    interestOnly.checked = false;
    document.getElementById('inputForm').reset();
});

//displaying error message pop when an input is missing
function showError(msg) {
    popupMessage.textContent = msg;
    popup.style.display = "flex";
}

// pop is closed when OK is clicked
closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});