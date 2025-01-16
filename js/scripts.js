// Google Apps Script Web App URL
const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzgK8LikI5nOX-2K1OE0MNl-tm_UEZHR7p-MM7OhGA0rWvS4SAuLV78hjWHwU62Hvro4Q/exec';

// Updated CSV URL from your published Google Sheet
const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOxStUqCiSSNaRTMY-aUwSurYdXoLiW01CFxztMH1sOMm9UpmTUuNQtOOygw6cr5-jUUGRTgnwoiDk/pub?output=csv';

// Fetch and display the inventory data from Google Sheets
async function fetchInventory() {
    const response = await fetch(sheetCsvUrl);
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Skip header row
    const inventoryTable = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    inventoryTable.innerHTML = ''; // Clear previous rows

    rows.forEach(row => {
        const cols = row.split(',');
        if (cols.length > 1) {
            const newRow = inventoryTable.insertRow();
            cols.forEach(col => {
                const cell = newRow.insertCell();
                cell.textContent = col;
            });
        }
    });
}

// Handle form submission to add a new product
document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const sku = document.getElementById('sku').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const status = document.getElementById('status').value;
    const amountNeeded = document.getElementById('amountNeeded').value;

    // Prepare the data to send to Google Sheets
    const formData = {
        productName: productName,
        sku: sku,
        quantity: quantity,
        price: price,
        status: status,
        amountNeeded: amountNeeded
    };

    // Send the data to Google Apps Script Web App via POST request
    fetch(googleScriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        alert('Product added successfully!');
        fetchInventory(); // Reload the inventory table
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error adding product');
    });
});

// Load the inventory data when the page loads
fetchInventory();
