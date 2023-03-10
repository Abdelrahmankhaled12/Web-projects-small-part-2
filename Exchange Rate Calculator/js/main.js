// Get Select
let selectCurrencyOne = document.getElementById("currency-one");
let selectCurrencyTwo = document.getElementById("currency-two");

// Get input
let inputOne = document.getElementById("amount-one");
let inputTwo = document.getElementById("amount-two");

// Get Span read-result
let span = document.getElementById("read-result");

// Get Button Swap 
let swap = document.getElementById("swap");

function caclulate() {
    // GEt Value Elemnt Select
    let selectCurrencyOneValue = selectCurrencyOne.value;
    let selectCurrencyTwoValue = selectCurrencyTwo.value;
    // Api 
    fetch(`https://v6.exchangerate-api.com/v6/aa5e9f555a9ba412686e304b/latest/${selectCurrencyOneValue}`).then(
        // Return Data in Form Object
        (result) => result.json()
    ).then(
        (data) => {
            let rate = data.conversion_rates[selectCurrencyTwoValue];
            // Print Value 
            span.innerHTML = `1 ${selectCurrencyOneValue} =  ${rate} ${selectCurrencyTwoValue}`
            inputTwo.value = (inputOne.value * rate).toFixed(2);
        }
    )
}

selectCurrencyOne.addEventListener("change", caclulate);
selectCurrencyTwo.addEventListener("change", caclulate);
inputOne.addEventListener("input", caclulate);
inputTwo.addEventListener("input", caclulate);
swap.addEventListener("click",()=> {
    let temp = selectCurrencyOne.value;
    selectCurrencyOne.value = selectCurrencyTwo.value;
    selectCurrencyTwo.value = temp;
    caclulate();
});

caclulate();

