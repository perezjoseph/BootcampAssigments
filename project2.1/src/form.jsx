import React, { useState, useEffect } from 'react';

export default function AddParrotForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    specie: '',
    age: '',
    image: null,
  });

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name === 'age') {
    if (!Number.isInteger(Number(value)) && value !== '') {
      return;
    }
  }
  // Update form data state
  setFormData({ ...formData, [name]: value });
};

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
<div className="form-container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Parrot's name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="specie"
        placeholder="Species"
        value={formData.specie}
        onChange={handleInputChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleInputChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        accept=".png, .jpg, .jpeg, .gif"
        required
      />
      <button type="submit">Add Parrot</button>
    </form>
    </div>
  );
}
