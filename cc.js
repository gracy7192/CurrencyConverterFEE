document.addEventListener( function () {
    var convertButton = document.querySelector('.cvt');
    convertButton.addEventListener('click', function () {
        var amount = parseFloat(document.getElementById('amount').value);
        var fromCurrency = document.getElementById('selector').value;
        var toCurrency = document.getElementById('selector1').value;

        if (isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        var convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        console.log(amount);
        console.log(fromCurrency);
        console.log(toCurrency);
        console.log(convertedAmount);
        displayResult(convertedAmount);
    });
});

console.log("It Worked");

function convertCurrency(amount, fromCurrency, toCurrency) {
    var exchangeRates = {
        USD: {
            EUR: 0.88,
            GBP: 0.76,
            JPY: 109.50,
            // Add other currency exchange rates here
        },
        EUR: {
            USD: 1.14,
            GBP: 0.88,
            JPY: 125.45,
            // Add other currency exchange rates here
        },
        GBP: {
            USD: 1.31,
            EUR: 1.14,
            JPY: 142.86,
            // Add other currency exchange rates here
        },
        JPY: {
            USD: 0.0091,
            EUR: 0.00798,
            GBP: 0.007,
            // Add other currency exchange rates here
        },
        // Add exchange rates for other currencies here
    };

    if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
        return 'Invalid currency or conversion not supported';
    }

    var rate = exchangeRates[fromCurrency][toCurrency];
    var convertedAmount = amount * rate;
    return convertedAmount.toFixed(2);
}

function displayResult(convertedAmount) {
    var resultElement = document.querySelector('.finalValue');
    resultElement.textContent = convertedAmount;

    var resultContainer = document.getElementById('finalAmount');
    resultContainer.style.display = 'block';
}
