import React, { useState, useEffect } from 'react';
import AddParrotForm from './form.jsx';
function App({ navItems, tableItems, image}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
const handleFormSubmit = async (formData) => {
  const data = new FormData();
  data.append('name', formData.name);
  data.append('specie', formData.specie);
  data.append('age', formData.age);
  data.append('image', formData.image);

  try {
    const response = await fetch('/insertparrot', {
      method: 'POST',
      body: data, // Do not set Content-Type header manually
    });

    const result = await response.json();
    if (response.ok) {
      alert('Parrot added successfully!');
      // Additional logic after successful submission
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    alert('An error occurred while adding the parrot.');
    console.error('Error:', error);
  }
};

useEffect(() => {
  fetch("/queryparrots")
    .then(res => {
      if (!res.ok && res.status === 404) {
        setData('Error: Resource not found');
        throw new Error('404 Not Found');
      }
      return res.json();
    })
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, [])

    const openModal = () => {
    setIsModalOpen(true);
    };
    
    const closeModal = () => {
    setIsModalOpen(false);
    };
    return (
        <div className="container"> 
            <header className="header">
                <h1>Beautiful parrots</h1>
            </header>
            <nav className="navbar">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}><button>{item}</button></li>
                    ))}
                </ul>
            </nav>
            <main className="main-content">
                <div className="Cards">
                  {
                    Array.isArray(data) ? 
                     generateCards(data) : 
                    <p>{data}</p>
                     }
                </div>
            <div>
                <div className="button-container">
                <button className="open-modal-button" onClick={openModal}>Add New Parrot</button>
                </div>
                {isModalOpen && (
                    <>
                        <div className="modal-backdrop" onClick={closeModal}></div>
                        <dialog id="modal" className="modal">
                            <button id="close" onClick={closeModal}>X</button>
                            <AddParrotForm onSubmit={handleFormSubmit} />
                        </dialog>
                    </>
                )}
            </div> 
            </main>
            <footer className="footer">
                Made by Joseph Perez
            </footer>
        </div>
    );
}

function generateCards (cardItems) {
    return (
        <div className="card-items-container">
        {cardItems.map((item, index) => (
        <div key={index} className="card-container">
            <div className="image-container">
            <img style={{"height": "300px"}} src={process.env.PUBLIC_URL + `${item.image}`} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <p>{item.specie}</p>
            <p>{item.age} Years</p>
            <button>Send Treats</button>
        </div>
        ))}
        </div>
        );
    
}
export default App;
