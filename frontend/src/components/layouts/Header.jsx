import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Header.css"

function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user");
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar__logo">
                    <span className="navbar__logo-icon">◆</span>
                    <span className="navbar__logo-text"><Link to={'/'}>HireSense.</Link></span>
                </div>

                <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>


                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "active-link" : "nav-link"
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "active-link" : "nav-link"
                            }
                        >
                            About Us
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/practice"
                            className={({ isActive }) =>
                                isActive ? "active-link" : "nav-link"
                            }
                        >
                            Practice
                        </NavLink>
                    </li>

                    {token && (
                        <>
                            <li>
                                <NavLink
                                    to="/progress"
                                    className={({ isActive }) =>
                                        isActive ? "active-link" : "nav-link"
                                    }
                                >
                                    Progress
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? "active-link" : "nav-link"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>

                <div className={`navbar__actions ${menuOpen ? 'navbar__actions--open' : ''}`}>
                    {
                        token ? (
                            <button className='navbar__btn navbar__btn--logout' onClick={handleLogout}>
                                Logout
                            </button>) : (
                            <>
                                <button className="navbar__btn navbar__btn--login"><Link to={'/login'}>Login</Link></button>
                                <button className="navbar__btn navbar__btn--signup"><Link to={'/signup'}>Sign Up</Link></button>
                            </>
                        )
                    }

                </div>

                <button
                    className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </>
    )
}

export default Header;