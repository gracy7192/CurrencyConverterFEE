document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#currencyForm'); // Select the form by its ID

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var amount = parseFloat(document.querySelector('#amount').value);
        var fromCurrency = document.querySelector('#selector').value;
        var toCurrency = document.querySelector('#selector1').value;

        if (isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        convertCurrency(amount, fromCurrency, toCurrency);
    });
});

function convertCurrency(amount, fromCurrency, toCurrency) {
    var appId = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_OMcZj2aZob1sVZL9UZPhzOWcJQ3VEh7GyDTySd6A';

    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
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
