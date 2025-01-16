const API_URL = "https://script.google.com/macros/s/AKfycbzgK8LikI5nOX-2K1OE0MNl-tm_UEZHR7p-MM7OhGA0rWvS4SAuLV78hjWHwU62Hvro4Q/exec";

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();

  document.getElementById("add-product-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const sku = document.getElementById("sku").value;
    const quantity = document.getElementById("quantity").value;
    const price = document.getElementById("price").value;
    const amountNeeded = document.getElementById("amountNeeded").value;

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          name,
          sku,
          quantity,
          price,
          amountNeeded
        })
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Product created successfully!");
        fetchProducts();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product.");
    }
  });
});

async function fetchProducts() {
  const tableBody = document.querySelector("#product-table tbody");
  tableBody.innerHTML = "";

  try {
    const response = await fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQOxStUqCiSSNaRTMY-aUwSurYdXoLiW01CFxztMH1sOMm9UpmTUuNQtOOygw6cr5-jUUGRTgnwoiDk/pub?output=csv");
    const text = await response.text();

    const rows = text.split("\n").slice(1); // Skip header row
    rows.forEach(row => {
      const [name, sku, quantity, price, amountNeeded] = row.split(",");

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${name}</td>
        <td>${sku}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>${amountNeeded}</td>
        <td><button onclick="editProduct('${sku}')">Edit</button></td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function editProduct(sku) {
  const newQuantity = prompt("Enter new quantity:");
  const newPrice = prompt("Enter new price:");
  const newAmountNeeded = prompt("Enter new amount needed:");

  if (newQuantity && newPrice && newAmountNeeded) {
    fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        sku,
        quantity: newQuantity,
        price: newPrice,
        amountNeeded: newAmountNeeded
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result.status === "success") {
          alert("Product updated successfully!");
          fetchProducts();
        } else {
          alert(result.message);
        }
      })
      .catch(error => {
        console.error("Error updating product:", error);
      });
  }
}
