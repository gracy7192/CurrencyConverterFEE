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
    displayResult(convertedAmount);
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    var appId = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_OMcZj2aZob1sVZL9UZPhzOWcJQ3VEh7GyDTySd6A'; // Replace with your actual App ID

    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}?app_id=${appId}`)
        .then(response => response.json()) 
        .then(data => {
            if (data.error) {
                alert('Failed to fetch exchange rates. Please try again.');
                return;
            }

            var exchangeRates = data.rates; 

            if (!exchangeRates[toCurrency]) {
                alert('Invalid currency selection.');
                return;
            }

            var convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
            displayResult(convertedAmount.toFixed(2)); 
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch exchange rates. Please try again.');
        });
}

function displayResult(convertedAmount) {
    var resultElement = document.querySelector('.finalValue');
    resultElement.textContent = convertedAmount;

    var resultContainer = document.getElementById('finalAmount');
    resultContainer.style.display = 'block';
}
