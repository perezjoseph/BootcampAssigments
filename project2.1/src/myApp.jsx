import React, { useState, useEffect } from 'react';

function App({ navItems, tableItems, image}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [newParrot, setNewParrot] = useState({ name: '', specie: '', age: '', image: '' });
    const [file, setFile] = useState();
    function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
    fetch("/queryparrots").then(
      res => res.json()
      ).then(
        data => {
          setData(data)
          }
          )
    }, [])
    const openModal = () => {
    setIsModalOpen(true);
    };
    
    const closeModal = () => {
    setIsModalOpen(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewParrot(prevState => ({
            ...prevState,
            [name]: value
        }));
        };
    
const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newParrot);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newParrot) 
    };

    fetch('/insertparrot', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

    closeModal();
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
                    {generateCards(data)}
                </div>
            <div>
                <button onClick={openModal}>Open the modal</button>
                {isModalOpen && (
                    <dialog id="modal" className="modal">
                        <button onClick={closeModal}>X</button>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={newParrot.name}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="text"
                                name="specie"
                                placeholder="Species"
                                value={newParrot.specie}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="text"
                                name="age"
                                placeholder="Age"
                                value={newParrot.age}
                                onChange={handleInputChange}
                            />
                            <h2>Add Image:</h2>
                            <input type="file" onChange={handleChange} />
                            <img src={file} style={{ height:"200px" }} />
                            <button type="submit">Add Parrot</button>
                        </form>
                    </dialog>
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
            <p>{item.age}</p>
            <button>Send Treats</button>
        </div>
        ))}
        </div>
        );
    
}
export default App;
