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
        throw new Error(`Error: ${response.statusText}`);
      }
  
      document.getElementById("error-message").textContent = "";
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Failed to fetch:", error);
      document.getElementById("error-message").textContent = `Failed to fetch: ${error.message}`;
    }
  });
  