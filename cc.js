// var convertButton = document.querySelector('.cvt');
// convertButton.addEventListener('click', function () {
//     var amount = parseFloat(document.getElementById('amount').value);
//     var fromCurrency = document.getElementById('selector').value;
//     var toCurrency = document.getElementById('selector1').value;

//     if (isNaN(amount)) {
//         alert('Please enter a valid amount.');
//         return;
//     }

//     var convertedAmount = convertCurrency(amount, fromCurrency, toCurrency);
//     displayResult(convertedAmount);
// });

// function convertCurrency(amount, fromCurrency, toCurrency) {
//     var exchangeRates = {
//         USD: {
//             EUR: 0.88,
//             GBP: 0.76,
//             JPY: 109.50,
//             // Add other currency exchange rates here
//         },
//         EUR: {
//             USD: 1.14,
//             GBP: 0.88,
//             JPY: 125.45,
//             // Add other currency exchange rates here
//         },
//         GBP: {
//             USD: 1.31,
//             EUR: 1.14,
//             JPY: 142.86,
//             // Add other currency exchange rates here
//         },
//         JPY: {
//             USD: 0.0091,
//             EUR: 0.00798,
//             GBP: 0.007,
//             // Add other currency exchange rates here
//         },
//         // Add exchange rates for other currencies here
//     };

//     if (!exchangeRates[fromCurrency] || !exchangeRates[fromCurrency][toCurrency]) {
//         return 'Invalid currency or conversion not supported';
//     }

//     var rate = exchangeRates[fromCurrency][toCurrency];
//     var convertedAmount = amount * rate;
//     return convertedAmount.toFixed(2);
// }

// function displayResult(convertedAmount) {
//     var resultElement = document.querySelector('.finalValue');
//     resultElement.textContent = convertedAmount;

//     var resultContainer = document.getElementById('finalAmount');
//     resultContainer.style.display = 'block';
// }

// Replace 'YOUR_API_KEY' with your actual API key from Open Exchange Rates
    // When the DOM content is fully loaded, add a submit event listener to the form
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

    // Make a GET request to fetch the latest exchange rates using the API
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}?app_id=${appId}`)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            if (data.error) {
                // Check for errors in the API response
                alert('Failed to fetch exchange rates. Please try again.');
                return;
            }

            var exchangeRates = data.rates; // Extract exchange rates from API response

            // Check if the target currency is valid
            if (!exchangeRates[toCurrency]) {
                alert('Invalid currency selection.');
                return;
            }

            // Perform the currency conversion
            var convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
            displayResult(convertedAmount.toFixed(2)); // Limit result to 2 decimal places
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch exchange rates. Please try again.');
        });
}

function displayResult(convertedAmount) {
    // Update the result displayed on the webpage
    var resultElement = document.querySelector('.finalValue');
    resultElement.textContent = convertedAmount;

    // Show the result container
    var resultContainer = document.getElementById('finalAmount');
    resultContainer.style.display = 'block';
}
