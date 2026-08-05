import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/axios'

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async () => {
        if (!name || !email || !password) { setError("Please fill all fields!"); return }
        if (password.length < 6) { setError("Password must be at least 6 characters!"); return }
        try {
            setLoading(true); setError('')
            await API.post('/auth/register', { name, email, password })
            navigate('/login')
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
                    <p style={{ color: "#64748b", marginTop: "6px", fontSize: "14px" }}>Join the community!</p>
                </div>

                <div style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "16px", padding: "28px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)"
                }}>
                    <h2 style={{ color: "#1e293b", marginBottom: "20px", fontSize: "18px", fontWeight: "700" }}>
                        Create Account
                    </h2>

                    {error && (
                        <div style={{
                            background: "#fef2f2", border: "1px solid #fecaca",
                            color: "#ef4444", padding: "10px 14px",
                            borderRadius: "8px", marginBottom: "16px", fontSize: "13px"
                        }}>{error}</div>
                    )}

                    {[
                        { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "Your name" },
                        { label: "Email", value: email, setter: setEmail, type: "email", placeholder: "you@example.com" },
                        { label: "Password", value: password, setter: setPassword, type: "password", placeholder: "Min. 6 characters" }
                    ].map(({ label, value, setter, type, placeholder }) => (
                        <div key={label} style={{ marginBottom: "14px" }}>
                            <label style={{ color: "#64748b", fontSize: "13px", display: "block", marginBottom: "5px" }}>
                                {label}
                            </label>
                            <input className="input" type={type} placeholder={placeholder}
                                value={value} onChange={e => setter(e.target.value)} />
                        </div>
                    ))}

                    <button onClick={handleRegister} disabled={loading} style={{
                        width: "100%", padding: "12px",
                        background: "#4f46e5", color: "white",
                        border: "none", borderRadius: "8px",
                        fontSize: "15px", fontWeight: "600",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1, marginTop: "6px"
                    }}>
                        {loading ? "Creating account..." : "Create Account"}
                    </button>

                    <p style={{ color: "#64748b", textAlign: "center", marginTop: "18px", fontSize: "13px" }}>
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#4f46e5", fontWeight: "600" }}>Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}