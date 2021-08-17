const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swapButton = document.getElementById("swap");

//get exchange rate and update DOM

const calculateRate = () => {
  const currency_one = currencyElementOne.value;
  const currency_two = currencyElementTwo.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
  .then((res) => res.json())
  .then((data) => {
      console.log(data.rates);
      const rate = data.rates[currency_two];
      rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
};

const swapCurrencies = () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculateRate();
}


//Event Listeners
currencyElementOne.addEventListener("change", calculateRate);
currencyElementTwo.addEventListener("change", calculateRate);
amountElementOne.addEventListener("change", calculateRate);
amountElementTwo.addEventListener("change", calculateRate);
swapButton.addEventListener('click', swapCurrencies)

calculateRate();