import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { About } from './about.jsx';
import HomePage from './homepage.jsx';
import LoginPage from './loginPage.jsx'
import RegisterPage from './register.jsx'
export const Pages = () => {
    return (
        <Router>
            <header className="header">
                <h1>Perico</h1>
            </header>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <footer className="footer">
                Made by Joseph Perez
            </footer>
        </Router>

    );
}
