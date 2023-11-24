function App({ navItems, tableItems, image, cardItems }) {
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
                    {generateCards(cardItems)}
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
