import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ fetchInventory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price: parseFloat(price), quantity: parseInt(quantity) };
    
    try {
      const response = await axios.post('http://localhost:5000/api/inventory', newProduct);
      console.log('Product added:', response.data);
      // After adding the product, refresh the inventory list
      fetchInventory();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
