function App({ navItems, tableItems, image }) {
    return (
        <div className="container"> 
            <header className="header">
                <h1>Congrats! You can Apply for a Driver License!</h1>
            </header>
            <nav className="navbar">
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}><button>{item}</button></li>
                    ))}
                </ul>
            </nav>
            <main className="main-content">
                <div className="image-grid">
                <img className="image-block" src={image} />        
                </div>
                <div className="table">
                    {generateTable(tableItems)}
                </div>
            </main>
            <footer className="footer">
                Made by Joseph Perez
            </footer>
        </div>
    );
}
function generateTable(TableItems) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>DMV Staff</th>
                </tr>
            </thead>
            <tbody>
                {TableItems.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Month}</td>
                        <td>{item.Day}</td>
                        <td>{item.Time}</td>
                        <td>{item.DMV}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}


export default App;
