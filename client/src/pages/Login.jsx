import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) { setError("Please fill all fields!"); return }
        try {
            setLoading(true); setError('')
            const res = await API.post('/auth/login', { email, password })
            login(res.data.user, res.data.token)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!")
        } finally { setLoading(false) }
    }

    return (
        <div style={{
            minHeight: "90vh", display: "flex",
            alignItems: "center", justifyContent: "center", padding: "20px"
        }}>
            <div style={{ width: "100%", maxWidth: "400px" }}>
                <div style={{ textAlign: "center", marginBottom: "28px" }}>
                    <h1 style={{ fontSize: "28px", color: "#4f46e5", fontWeight: "800" }}>🎬 RateIt</h1>
                    <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>Welcome back!</p>
                </div>

                <div style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "16px", padding: "28px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
                }}>
                    <h2 style={{ color: "#1e293b", marginBottom: "20px", fontSize: "18px", fontWeight: "700" }}>
                        Sign In
                    </h2>

                    {error && (
                        <div style={{
                            background: "#fef2f2", border: "1px solid #fecaca",
                            color: "#ef4444", padding: "10px 14px",
                            borderRadius: "8px", marginBottom: "16px", fontSize: "13px"
                        }}>{error}</div>
                    )}

                    <label style={{ color: "#64748b", fontSize: "13px", display: "block", marginBottom: "5px" }}>Email</label>
                    <input className="input" type="email" placeholder="you@example.com"
                        value={email} onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        style={{ marginBottom: "14px" }} />

                    <label style={{ color: "#64748b", fontSize: "13px", display: "block", marginBottom: "5px" }}>Password</label>
                    <input className="input" type="password" placeholder="••••••••"
                        value={password} onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        style={{ marginBottom: "20px" }} />

                    <button onClick={handleLogin} disabled={loading} style={{
                        width: "100%", padding: "12px",
                        background: "#4f46e5", color: "white",
                        border: "none", borderRadius: "8px",
                        fontSize: "15px", fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1
                    }}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                    <p style={{ color: "#64748b", textAlign: "center", marginTop: "18px", fontSize: "13px" }}>
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#4f46e5", fontWeight: "600" }}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}