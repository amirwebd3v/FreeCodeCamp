let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Currency unit values in dollars
const currencyUnit = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100
};

// Initialize the display
document.getElementById('price').textContent = price.toFixed(2);
updateDrawerDisplay();

// Add event listener to purchase button
document.getElementById('purchase-btn').addEventListener('click', handlePurchase);

function handlePurchase() {
    const cashInput = parseFloat(document.getElementById('cash').value);
    
    // Check if cash input is valid
    if (isNaN(cashInput)) {
        alert("Please enter a valid cash amount");
        return;
    }

    // Check if customer has enough money
    if (cashInput < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    // If exact change, no need to calculate
    if (cashInput === price) {
        document.getElementById('change-due').textContent = 
            "No change due - customer paid with exact cash";
        return;
    }

    // Calculate change
    const changeDue = calculateChange(cashInput);
    displayChange(changeDue);
}

function calculateChange(cash) {
    let change = Math.round((cash - price) * 100) / 100;
    let totalCID = cid.reduce((acc, curr) => acc + curr[1], 0);
    totalCID = Math.round(totalCID * 100) / 100;
    
    // If change equals total cash-in-drawer
    if (change === totalCID) {
        // Return all the money in the drawer
        return {
            status: "CLOSED",
            change: cid.filter(item => item[1] > 0)
        };
    }
    
    // If we don't have enough money in the drawer
    if (change > totalCID) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    let changeArray = [];
    // Work from largest to smallest currency
    for (let i = cid.length - 1; i >= 0; i--) {
        const currencyName = cid[i][0];
        const currencyTotal = cid[i][1];
        const unitValue = currencyUnit[currencyName];
        let currencyAmount = 0;
        
        // Calculate how many of current currency we can use
        while (change >= unitValue && currencyTotal > currencyAmount) {
            change = Math.round((change - unitValue) * 100) / 100;
            currencyAmount = Math.round((currencyAmount + unitValue) * 100) / 100;
        }
        
        // Add to change array if we used any of this currency
        if (currencyAmount > 0) {
            changeArray.push([currencyName, currencyAmount]);
        }
    }
    
    // If we couldn't make exact change
    if (change > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    
    return { status: "OPEN", change: changeArray };
}

function displayChange(result) {
    let displayText = `Status: ${result.status}`;
    
    if (result.change.length > 0) {
        result.change.forEach(item => {
            displayText += ` ${item[0]}: $${item[1].toFixed(2)}`;
        });
    }
    
    document.getElementById('change-due').textContent = displayText;
}

function updateDrawerDisplay() {
    const drawerDisplay = document.getElementById('drawer-display');
    drawerDisplay.innerHTML = '';
    
    cid.forEach(([currency, amount]) => {
        const div = document.createElement('div');
        div.className = 'currency-item';
        div.textContent = `${currency}: $${amount.toFixed(2)}`;
        drawerDisplay.appendChild(div);
    });
}