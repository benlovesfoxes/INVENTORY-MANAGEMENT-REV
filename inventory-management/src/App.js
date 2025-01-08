import React from 'react';
import './App.css';
import Inventory from './Inventory';
import AddProductForm from './AddProductForm'; // Import AddProductForm component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory Management</h1>
        <AddProductForm /> {/* Render the AddProductForm component */}
        <Inventory /> {/* Render the Inventory component */}
      </header>
    </div>
  );
}

export default App;
