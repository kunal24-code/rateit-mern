import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
        setMenuOpen(false)
    }

    const isActive = (path) => location.pathname === path

    return (
        <nav style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            position: "sticky", top: 0, zIndex: 100,
            padding: "0 24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
        }}>
            <div style={{
                maxWidth: "1200px", margin: "0 auto",
                display: "flex", justifyContent: "space-between",
                alignItems: "center", height: "62px"
            }}>
                <Link to="/" style={{
                    color: "#4f46e5", fontWeight: "800",
                    fontSize: "20px", letterSpacing: "-0.5px"
                }}>
                    🎬 RateIt
                </Link>

                {/* Desktop */}
                <div style={{ display: "flex", gap: "4px", alignItems: "center" }}
                    className="desktop-nav">
                    <NavLink to="/" label="Catalog" active={isActive('/')} />
                    {user && <>
                        <NavLink to="/recommendations" label="For You" active={isActive('/recommendations')} />
                        <NavLink to="/profile" label="Profile" active={isActive('/profile')} />
                    </>}
                    {user ? (
                        <button onClick={handleLogout} style={{
                            backgroundColor: "#fee2e2", color: "#ef4444",
                            border: "none", padding: "8px 16px",
                            borderRadius: "8px", cursor: "pointer",
                            fontSize: "14px", fontWeight: "600", marginLeft: "8px"
                        }}>Logout</button>
                    ) : (
                        <>
                            <NavLink to="/login" label="Login" active={isActive('/login')} />
                            <Link to="/register" style={{
                                backgroundColor: "#4f46e5", color: "white",
                                padding: "8px 18px", borderRadius: "8px",
                                fontSize: "14px", fontWeight: "600", marginLeft: "8px"
                            }}>Register</Link>
                        </>
                    )}
                </div>

                {/* Hamburger */}
                <button onClick={() => setMenuOpen(!menuOpen)}
                    className="hamburger"
                    style={{
                        background: "none", border: "none",
                        color: "#1e293b", fontSize: "22px", cursor: "pointer"
                    }}>
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    padding: "12px 0 16px",
                    borderTop: "1px solid #e2e8f0",
                    display: "flex", flexDirection: "column", gap: "4px"
                }}>
                    <MobileLink to="/" label="🎬 Catalog" onClick={() => setMenuOpen(false)} />
                    {user && <>
                        <MobileLink to="/recommendations" label="🎯 For You" onClick={() => setMenuOpen(false)} />
                        <MobileLink to="/profile" label="👤 Profile" onClick={() => setMenuOpen(false)} />
                    </>}
                    {user ? (
                        <button onClick={handleLogout} style={{
                            background: "#fee2e2", color: "#ef4444",
                            border: "none", padding: "12px 16px",
                            textAlign: "left", cursor: "pointer",
                            fontSize: "14px", borderRadius: "8px"
                        }}>Logout</button>
                    ) : (
                        <>
                            <MobileLink to="/login" label="Login" onClick={() => setMenuOpen(false)} />
                            <MobileLink to="/register" label="Register" onClick={() => setMenuOpen(false)} />
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

function NavLink({ to, label, active }) {
    return (
        <Link to={to} style={{
            color: active ? "#4f46e5" : "#64748b",
            padding: "7px 14px", borderRadius: "8px",
            fontSize: "14px", fontWeight: active ? "600" : "400",
            backgroundColor: active ? "#ede9fe" : "transparent"
        }}>{label}</Link>
    )
}

function MobileLink({ to, label, onClick }) {
    return (
        <Link to={to} onClick={onClick} style={{
            color: "#1e293b", padding: "11px 16px",
            fontSize: "14px", borderRadius: "8px", display: "block"
        }}>{label}</Link>
    )
}