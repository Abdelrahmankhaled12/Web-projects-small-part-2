// Get Elements
let result = document.getElementById("result"),
    resultIncome = document.getElementById("result-income"),
    resultExpense = document.getElementById("result-expense"),
    addText = document.getElementById("add-text"),
    addPrice = document.getElementById("add-price"),
    submit = document.getElementById("submit");



// Store Transaction data
let dataTransaction = getDataLS();


// Get Transactions from local storage
function getDataLS() {
    const transactions = JSON.parse(localStorage.getItem('transactions'));
    return transactions === null ? [] : transactions;
}

// Add Transaction to local storage
function setDataLS(data) {
    localStorage.setItem("transactions", JSON.stringify(data));
    window.location.reload();
}

// Create all Transactions
function addTransactions() {
    dataTransaction.forEach((element, index) => addTransaction(element))
}

// Create a single Transaction in DOM
function addTransaction(element) {
    // Create variables Storage Values
    let text = element.text;
    let price = element.value;
    // Check Price Positive or Negative 
    if (price >= 0) {
        // Add price in Element result Income
        resultIncome.innerHTML = `$${(parseInt((resultIncome.innerHTML).slice(1)) + parseInt(price)).toFixed(2)}`;
    } else {
        // Add price in Element result Income
        resultExpense.innerHTML = `$${Math.abs((parseInt(-(resultExpense.innerHTML).slice(1)) + parseInt(price))).toFixed(2)}`;
    }
    // Add collection the positive and negative values in Element Result
    result.innerHTML = `$${(parseInt((resultIncome.innerHTML).slice(1)) - parseInt((resultExpense.innerHTML).slice(1))).toFixed(2)}`;
    // Get Element History
    let history = document.getElementById("history");
    // Add data in Element History
    history.innerHTML += `
        <div id="${element.id}" class="product ${price >= 0 ? "plus" : "minus"}">
        <p>${text}</p>
        <p>${price >= 0 ? "+" + price : price}</p>
        <button class="btn" id="btn">x</button>
        </div>
        `;
}

// Call Function Add Transactions 
addTransactions();


// Event Listener
// Add Transaction
submit.addEventListener('submit', (event) => {
    event.preventDefault();
    // Storage Values
    let text = addText.value;
    let value = addPrice.value;
    // check Input Text and Input Number (price) Empty or Not
    if (text.trim() && value.trim()) {
        let id = dataTransaction.length + 1;
        let newObject = { id, text, value };
        // Add Value in Dom
        addTransaction(newObject);
        // clear input
        addText.value = "";
        addPrice.value = "";
        dataTransaction.push(newObject);
        // Set Data in Local Storage
        setDataLS(dataTransaction);
    } else {
        alert("Please add a text and amount");
    }
});

// Remove Transaction
document.addEventListener('click', function (e) {
    // Check Class Btn 
    if (e.target.className === "btn") {
        if (e.target.parentElement.classList.contains("plus")) {
            resultIncome.innerHTML = `$${(parseInt((resultIncome.innerHTML).slice(1)) - parseInt((e.target.previousElementSibling.innerHTML).slice(1))).toFixed(2)}`
            result.innerHTML = `$${(parseInt((result.innerHTML).slice(1)) - parseInt((e.target.previousElementSibling.innerHTML).slice(1))).toFixed(2)}`;
        } else {
            resultExpense.innerHTML = `$${(parseInt((resultExpense.innerHTML).slice(1)) - parseInt((e.target.previousElementSibling.innerHTML).slice(1))).toFixed(2)}`;
            result.innerHTML = `$${(parseInt((result.innerHTML).slice(1)) + parseInt((e.target.previousElementSibling.innerHTML).slice(1))).toFixed(2)}`;
        }
        // Get Attribute Id 
        let id = e.target.parentElement.getAttribute("id");
        // Delete Transaction From Array
        dataTransaction = dataTransaction.filter((e, i) => e.id != id);
        // Set Data After Remove
        setDataLS(dataTransaction);
    }
})