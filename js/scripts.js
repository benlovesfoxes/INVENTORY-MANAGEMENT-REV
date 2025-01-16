const API_URL = "https://script.google.com/macros/s/AKfycbzgK8LikI5nOX-2K1OE0MNl-tm_UEZHR7p-MM7OhGA0rWvS4SAuLV78hjWHwU62Hvro4Q/exec"; // Replace with your Vercel API URL

// Fetch and display products
async function fetchProducts() {
  const response = await fetch(`${API_URL}?action=read`);
  const products = await response.json();
  const productList = document.getElementById("products");
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${product.name} - $${product.price} (Amount: ${product.amount}, Needed: ${product.amountNeeded})</span>
      <button class="edit-button" data-index="${index}">✏️ Edit</button>
    `;
    productList.appendChild(listItem);
  });

  // Attach edit handlers
  document.querySelectorAll(".edit-button").forEach(button => {
    button.addEventListener("click", handleEdit);
  });
}

// Add a product
document.getElementById("add-product").addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const amount = document.getElementById("amount").value;
  const amountNeeded = document.getElementById("amountNeeded").value;

  try {
    const response = await fetch(`${API_URL}?action=create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, amount, amountNeeded })
    });

    if (!response.ok) {
      throw new Error("Error creating product.");
    }

    document.getElementById("error-message").textContent = "";
    fetchProducts();
  } catch (error) {
    document.getElementById("error-message").textContent = error.message;
  }
});

// Edit a product
async function handleEdit(event) {
  const index = event.target.getAttribute("data-index");
  const product = (await fetch(`${API_URL}?action=read`).then(res => res.json()))[index];

  const newName = prompt("Edit Name", product.name);
  const newPrice = prompt("Edit Price", product.price);
  const newAmount = prompt("Edit Amount", product.amount);
  const newAmountNeeded = prompt("Edit Amount Needed", product.amountNeeded);

  try {
    await fetch(`${API_URL}?action=update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: product.id,
        name: newName || product.name,
        price: newPrice || product.price,
        amount: newAmount || product.amount,
        amountNeeded: newAmountNeeded || product.amountNeeded
      })
    });

    fetchProducts();
  } catch (error) {
    alert("Error updating product.");
  }
}

// Initial fetch
fetchProducts();
