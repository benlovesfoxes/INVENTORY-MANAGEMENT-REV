import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch the inventory from the backend
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the inventory when the component mounts
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      <h2>Inventory List</h2>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <ul>
          {inventory.map((product) => (
            <li key={product.id}>
              {product.name} - {product.description} - ${product.price} - Quantity: {product.quantity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inventory;
