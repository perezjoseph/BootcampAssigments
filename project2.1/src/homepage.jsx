import React, { useState, useEffect } from 'react';
import AddParrotForm from './form.jsx';
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const search = (src) => {
    return src.filter(
      (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.specie.toLowerCase().includes(query.toLowerCase()) || 
      item.age.toLowerCase().includes(query.toLowerCase())
      );
  };

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
    console.log(search)
    return (
        <div className="container"> 
            <main className="main-content">
            <div className="searchBar">
            <input class="inputsearch" type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
            </div>
                <div className="Cards">
                  {
                    Array.isArray(data) ? 
                     generateCards(search(data)) : 
                    <p>{data}</p>
                     }
                </div>
            <div>
                <div className="button-container">
                <button className="open-modal-button" onClick={openModal}>Add</button>
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
        </div>
    ); 
}
function generateCards (cardItems) {
    return (
        <div className="card-items-container">
        {cardItems.map((item, index) => (
        <div key={index} className="card-container">
            <div className="image-container">
            <img style={{"height": "100%"}} src={'/image/' + `${item.image}`} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
            <p>{item.specie}</p>
            <p>{item.age} Years</p>
            <button>Adopt</button>
        </div>
        ))}
        </div>
        );
}
