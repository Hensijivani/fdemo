import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css";

function AdminPanel() {
  const [foodList, setFoodList] = useState([]);
  const [newFood, setNewFood] = useState({ name: "", description: "", price: "", category: "", image: null });
  const [editFood, setEditFood] = useState(null); 
  const categories = ["Salad", "Rolls", "Deserts", "Sandwich", "Cake", "Pure Veg", "Pasta", "Noodles"];

  useEffect(() => {
    fetchFoodList();
  }, []);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:3000/food/list");
      if (response.data.success) {
        setFoodList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newFood.name);
    formData.append("description", newFood.description);
    formData.append("price", newFood.price);
    formData.append("category", newFood.category);
    formData.append("image", newFood.image);

    try {
      const response = await axios.post("http://localhost:3000/food/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        fetchFoodList();
        setNewFood({ name: "", description: "", price: "", category: "", image: null });
      }
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/food/delete/${id}`);
      fetchFoodList();
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  const handleEditClick = (food) => {
    setEditFood(food);
  };

  const handleUpdateFood = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editFood.name);
    formData.append("description", editFood.description);
    formData.append("price", editFood.price);
    formData.append("category", editFood.category);
    if (editFood.image instanceof File) {
      formData.append("image", editFood.image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/food/update/${editFood._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        fetchFoodList();
        setEditFood(null);
      }
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel - Manage Food Items</h2>

      {editFood ? (
        <form className="food-form" onSubmit={handleUpdateFood} encType="multipart/form-data">
          <input className="food-input" type="text" value={editFood.name} onChange={(e) => setEditFood({ ...editFood, name: e.target.value })} required />
          <input className="food-input" type="text" value={editFood.description} onChange={(e) => setEditFood({ ...editFood, description: e.target.value })} required />
          <input className="food-input" type="number" value={editFood.price} onChange={(e) => setEditFood({ ...editFood, price: e.target.value })} required />
          <select className="food-select" value={editFood.category} onChange={(e) => setEditFood({ ...editFood, category: e.target.value })} required>
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input className="food-input" type="file" accept="image/*" onChange={(e) => setEditFood({ ...editFood, image: e.target.files[0] })} />
          <button className="food-button food-edit-button" type="submit">Update Food</button>
          <button className="food-button" type="button" onClick={() => setEditFood(null)}>Cancel</button>
        </form>
      ) : (
        <form className="food-form" onSubmit={handleAddFood} encType="multipart/form-data">
          <input className="food-input" type="text" placeholder="Name" value={newFood.name} onChange={(e) => setNewFood({ ...newFood, name: e.target.value })} required />
          <input className="food-input" type="text" placeholder="Description" value={newFood.description} onChange={(e) => setNewFood({ ...newFood, description: e.target.value })} required />
          <input className="food-input" type="number" placeholder="Price" value={newFood.price} onChange={(e) => setNewFood({ ...newFood, price: e.target.value })} required />
          <select className="food-select" value={newFood.category} onChange={(e) => setNewFood({ ...newFood, category: e.target.value })} required>
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <input className="food-input" type="file" accept="image/*" onChange={(e) => setNewFood({ ...newFood, image: e.target.files[0] })} required />
          <button className="food-button food-add-button" type="submit">Add Food</button>
        </form>
      )}

      <div className="food-list-container">
        {foodList.map((item) => (
          <div key={item._id} className="food-card">
            <img className="food-image" src={`http://localhost:3000/img/${item.image}`} alt={item.name} />
            <p className="food-text"><b>{item.name}</b></p>
            <p className="food-text">{item.description}</p>
            <p className="food-text">Price: ${item.price}</p>
            <p className="food-text">Category: {item.category}</p>
            <button className="food-button food-edit-button" onClick={() => handleEditClick(item)}>Edit</button>
            <button className="food-button food-delete-button" onClick={() => handleDeleteFood(item._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
