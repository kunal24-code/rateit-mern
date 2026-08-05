import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import StarRating from '../components/StarRating'

export default function Profile() {
    const { user } = useAuth()
    const [ratings, setRatings] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => { fetchRatings() }, [])

    const fetchRatings = async () => {
        try {
            setLoading(true)
            const res = await API.get('/users/me')
            setRatings(res.data)
        } catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    // ✅ Filter out null items
    const validRatings = ratings.filter(r => r.item !== null)

    const avgMyRating = validRatings.length > 0
        ? (validRatings.reduce((sum, r) => sum + r.score, 0) / validRatings.length).toFixed(1)
        : "—"

    const movies = validRatings.filter(r => r.item?.type === "movie").length
    const books = validRatings.filter(r => r.item?.type === "book").length

    if (loading) return (
        <div className="page" style={{ textAlign: "center", color: "#64748b" }}>Loading...</div>
    )

    return (
        <div className="page">
            {/* Profile Header */}
            <div style={{
                background: "white", border: "1px solid #e2e8f0",
                borderRadius: "16px", padding: "28px", marginBottom: "20px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <div style={{
                        width: "56px", height: "56px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "22px", fontWeight: "800", color: "white", flexShrink: 0
                    }}>
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 style={{ color: "#1e293b", fontSize: "20px", fontWeight: "800" }}>{user.name}</h1>
                        <p style={{ color: "#94a3b8", fontSize: "13px" }}>{user.email}</p>
                    </div>
                </div>

                {/* Stats — all using validRatings ✅ */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
                    gap: "12px"
                }}>
                    {[
                        { label: "Total Rated", value: validRatings.length, icon: "⭐", color: "#fef9c3", text: "#92400e" },
                        { label: "Movies", value: movies, icon: "🎬", color: "#ede9fe", text: "#6d28d9" },
                        { label: "Books", value: books, icon: "📚", color: "#ecfdf5", text: "#065f46" },
                        { label: "Avg Given", value: avgMyRating, icon: "📊", color: "#eff6ff", text: "#1e40af" }
                    ].map(stat => (
                        <div key={stat.label} style={{
                            background: stat.color,
                            borderRadius: "10px", padding: "16px", textAlign: "center"
                        }}>
                            <p style={{ fontSize: "20px", marginBottom: "4px" }}>{stat.icon}</p>
                            <p style={{ color: stat.text, fontSize: "22px", fontWeight: "800", lineHeight: "1.2" }}>
                                {stat.value}
                            </p>
                            <p style={{ color: stat.text, fontSize: "11px", marginTop: "3px", opacity: 0.8 }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ratings */}
            <h2 style={{ color: "#1e293b", marginBottom: "14px", fontSize: "16px", fontWeight: "700" }}>
                My Ratings
            </h2>

            {/* ✅ Use validRatings for empty check too */}
            {validRatings.length === 0 ? (
                <div style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "16px", padding: "60px", textAlign: "center"
                }}>
                    <p style={{ fontSize: "40px", marginBottom: "10px" }}>🎬</p>
                    <p style={{ color: "#64748b" }}>No ratings yet!</p>
                    <button onClick={() => navigate('/')} style={{
                        marginTop: "14px", background: "#4f46e5",
                        color: "white", border: "none",
                        padding: "10px 22px", borderRadius: "8px",
                        cursor: "pointer", fontWeight: "600"
                    }}>Browse Catalog</button>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* ✅ Use validRatings directly */}
                    {validRatings.map(rating => (
                        <div key={rating._id}
                            onClick={() => navigate(`/items/${rating.item._id}`)}
                            style={{
                                background: "white",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px", padding: "14px 18px",
                                display: "flex", justifyContent: "space-between",
                                alignItems: "center", cursor: "pointer",
                                transition: "all 0.2s", gap: "16px"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = "#a5b4fc"
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(79,70,229,0.1)"
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = "#e2e8f0"
                                e.currentTarget.style.boxShadow = "none"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "14px", overflow: "hidden" }}>
                                <img
                                    src={rating.item.posterUrl}
                                    alt={rating.item.title}
                                    onError={e => {
                                        e.target.src = `https://placehold.co/42x56/e2e8f0/64748b?text=${encodeURIComponent(rating.item.title.charAt(0))}`
                                    }}
                                    style={{
                                        width: "42px", height: "56px",
                                        objectFit: "cover", borderRadius: "6px", flexShrink: 0
                                    }}
                                />
                                <div style={{ overflow: "hidden" }}>
                                    <h3 style={{
                                        color: "#1e293b", fontSize: "14px",
                                        fontWeight: "600", marginBottom: "3px",
                                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                    }}>
                                        {rating.item.type === "movie" ? "🎬" : "📚"} {rating.item.title}
                                    </h3>
                                    {rating.review && (
                                        <p style={{
                                            color: "#94a3b8", fontSize: "12px", fontStyle: "italic",
                                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                        }}>"{rating.review}"</p>
                                    )}
                                </div>
                            </div>
                            <div style={{ flexShrink: 0 }}>
                                <StarRating score={rating.score} readOnly={true} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}