import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

export default function Recommendations() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => { fetchRecommendations() }, [])

    const fetchRecommendations = async () => {
        try {
            setLoading(true)
            const res = await API.get('/users/recommendations')
            setItems(res.data)
        } catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    if (loading) return (
        <div className="page" style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
            Finding recommendations...
        </div>
    )

    return (
        <div className="page">
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#1e293b", marginBottom: "4px" }}>
                🎯 Recommended for You
            </h1>
            <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
                Based on genres you rated 4★ or 5★
            </p>

            {items.length === 0 ? (
                <div style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "16px", padding: "60px 32px",
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                }}>
                    <p style={{ fontSize: "44px", marginBottom: "14px" }}>🎬</p>
                    <h3 style={{ color: "#1e293b", marginBottom: "8px", fontSize: "18px", fontWeight: "700" }}>
                        No recommendations yet!
                    </h3>
                    <p style={{ color: "#64748b", marginBottom: "20px", fontSize: "14px" }}>
                        Rate movies or books 4★ or 5★ to get personalized picks
                    </p>
                    <button onClick={() => navigate('/')} style={{
                        background: "#4f46e5", color: "white",
                        border: "none", padding: "11px 24px",
                        borderRadius: "8px", cursor: "pointer",
                        fontWeight: "600", fontSize: "14px"
                    }}>Browse Catalog</button>
                </div>
            ) : (
                <div className="grid">
                    {items.map(item => (
                        <div key={item._id} onClick={() => navigate(`/items/${item._id}`)}
                            style={{
                                background: "white", borderRadius: "12px",
                                overflow: "hidden", cursor: "pointer",
                                border: "1px solid #e2e8f0",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                transition: "all 0.25s"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-4px)"
                                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)"
                                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"
                            }}
                        >
                            <img src={item.posterUrl} alt={item.title}
                            onError={e => {
        e.target.src = `https://placehold.co/300x400/e2e8f0/64748b?text=${encodeURIComponent(item.title)}`
    }}
                                style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                            <div style={{ padding: "12px 14px" }}>
                                <h3 style={{
                                    fontSize: "14px", fontWeight: "700",
                                    color: "#1e293b", marginBottom: "4px",
                                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                }}>{item.title}</h3>
                                <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "6px" }}>
                                    {item.releaseYear} • {item.genre.slice(0, 2).join(", ")}
                                </p>
                                <p style={{ color: "#f59e0b", fontSize: "13px", fontWeight: "600" }}>
                                    ⭐ {item.avgRating > 0 ? item.avgRating : "Not rated"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}