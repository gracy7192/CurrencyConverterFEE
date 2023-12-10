// document.addEventListener('DOMContentLoaded', function () {
//     // When the DOM content is fully loaded, add a submit event listener to the form
//     var form = document.querySelector('#currencyForm');
//     form.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevent the default form submission behavior

//         // Get user input values
//         var amount = parseFloat(document.getElementById('amount').value);
//         var fromCurrency = document.getElementById('selector').value;
//         var toCurrency = document.getElementById('selector1').value;

//         if (isNaN(amount)) {
//             // Validate if the entered amount is a valid number
//             alert('Please enter a valid amount.');
//             return;
//         }

//         // Perform the currency conversion using Open Exchange Rates API
//         convertCurrency(amount, fromCurrency, toCurrency);
//     });
// });

// function convertCurrency(amount, fromCurrency, toCurrency) {
//     var appId = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_OMcZj2aZob1sVZL9UZPhzOWcJQ3VEh7GyDTySd6A'; // Replace with your actual App ID

//     // Make a GET request to fetch the latest exchange rates using the API
//     fetch(`https://v6.exchangerate-api.com/v6/0409320ac9c9622048575ce0/latest/${fromCurrency}`)
//         .then(response => response.json()) // Parse the response as JSON
//         .then(data => {
//             if (data.error) {
//                 // Check for errors in the API response
//                 alert('Failed to fetch exchange rates. Please try again.');
//                 return;
//             }

//             var exchangeRates = data.rates; // Extract exchange rates from API response

//             // Check if the target currency is valid
//             if (!exchangeRates[toCurrency]) {
//                 alert('Invalid currency selection.');
//                 return;
//             }

//             // Perform the currency conversion
//             var convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
//             displayResult(convertedAmount.toFixed(2)); // Limit result to 2 decimal places
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             alert('Failed to fetch exchange rates. Please try again.');
//         });
// }

function displayResult(convertedAmount) {
    // Update the result displayed on the webpage
    var resultElement = document.querySelector('.finalValue');
    resultElement.textContent = convertedAmount;
 
    // Show the result container
    var resultContainer = document.getElementById('finalAmount');
    resultContainer.style.display = 'block';
}

let api = `https://v6.exchangerate-api.com/v6/0409320ac9c9622048575ce0/latest/USD`;
const fromDropDown = document.getElementById("selector");
const toDropDown = document.getElementById("selector1");

let convertCurrency = () => {
  //Create References
  const amount = document.querySelector("#amount").value;
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  //If amount input field is not empty
  if (amount.length != 0) {
    fetch(api)
      .then((resp) => resp.json())
      .then((data) => {
        let fromExchangeRate = data.conversion_rates[fromCurrency];
        let toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
      });

      displayResult(convertedAmount)
  } 
};

document.querySelector(".cvt").addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);