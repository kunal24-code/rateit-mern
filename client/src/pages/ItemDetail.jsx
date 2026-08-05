import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'
import StarRating from '../components/StarRating'

export default function ItemDetail() {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userScore, setUserScore] = useState(0)
    const [review, setReview] = useState('')
    const [message, setMessage] = useState('')
    const [msgType, setMsgType] = useState('success')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => { fetchItem() }, [id])

    const fetchItem = async () => {
        try {
            setLoading(true)
            const res = await API.get(`/items/${id}`)
            setItem(res.data)
        } catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    const submitRating = async () => {
        if (userScore === 0) return
        try {
            setSubmitting(true)
            await API.post(`/items/${id}/ratings`, { score: userScore, review })
            setMessage("Rating submitted! ✅")
            setMsgType('success')
            fetchItem()
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong!")
            setMsgType('error')
        } finally { setSubmitting(false) }
    }

    if (loading) return (
        <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>Loading...</div>
    )
    if (!item) return (
        <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>Item not found!</div>
    )

    return (
        <div className="page">
            {/* Back Button */}
            <button onClick={() => navigate(-1)} style={{
                background: "white", border: "1px solid #e2e8f0",
                color: "#64748b", padding: "8px 16px",
                borderRadius: "8px", cursor: "pointer",
                fontSize: "13px", marginBottom: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)"
            }}>← Back</button>

            {/* Main Card */}
            <div style={{
                background: "white", border: "1px solid #e2e8f0",
                borderRadius: "16px", overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                marginBottom: "20px"
            }}>
                {/* Banner */}
                <div style={{
                    height: "220px",
                    backgroundImage: `url(${item.posterUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative"
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 100%)"
                    }} />
                </div>

                <div className="detail-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "160px 1fr",
                    gap: "24px", padding: "0 28px 28px",
                    marginTop: "-80px", position: "relative"
                }}>
                    {/* Poster */}
                    <img src={item.posterUrl} alt={item.title}
                    onError={e => {
        e.target.src = `https://placehold.co/300x400/e2e8f0/64748b?text=${encodeURIComponent(item.title)}`
    }}
                        style={{
                            width: "160px", height: "220px",
                            objectFit: "cover", borderRadius: "10px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                            border: "3px solid white", flexShrink: 0
                        }}
                    />

                    {/* Info */}
                    <div style={{ paddingTop: "90px" }}>
                        <span style={{
                            display: "inline-block",
                            background: "#ede9fe", color: "#7c3aed",
                            padding: "3px 12px", borderRadius: "20px",
                            fontSize: "12px", fontWeight: "600", marginBottom: "10px"
                        }}>
                            {item.type === "movie" ? "🎬 Movie" : "📚 Book"}
                        </span>

                        <h1 style={{
                            fontSize: "clamp(20px, 3vw, 28px)",
                            fontWeight: "800", color: "#1e293b",
                            marginBottom: "6px", letterSpacing: "-0.5px"
                        }}>{item.title}</h1>

                        <p style={{ color: "#94a3b8", marginBottom: "10px", fontSize: "13px" }}>
                            {item.releaseYear} • {item.genre.join(", ")}
                        </p>

                        <p style={{ color: "#475569", marginBottom: "16px", lineHeight: "1.7", fontSize: "14px" }}>
                            {item.description}
                        </p>

                        {/* Rating */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            background: "#fefce8", border: "1px solid #fde68a",
                            padding: "10px 16px", borderRadius: "10px"
                        }}>
                            <span style={{ fontSize: "22px" }}>⭐</span>
                            <div>
                                <p style={{ color: "#92400e", fontSize: "20px", fontWeight: "800", lineHeight: "1" }}>
                                    {item.avgRating > 0 ? item.avgRating : "—"}
                                </p>
                                <p style={{ color: "#b45309", fontSize: "11px" }}>
                                    {item.ratingCount > 0 ? `${item.ratingCount} ratings` : "No ratings yet"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating Form */}
            {user ? (
                <div style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "16px", padding: "24px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                }}>
                    <h3 style={{ color: "#1e293b", marginBottom: "14px", fontSize: "16px", fontWeight: "700" }}>
                        Rate this {item.type === "movie" ? "Movie" : "Book"}
                    </h3>
                    <StarRating score={userScore} onRate={setUserScore} />
                    <textarea
                        placeholder="Write a review (optional)"
                        value={review} onChange={e => setReview(e.target.value)}
                        className="input"
                        style={{ marginTop: "14px", height: "85px", resize: "none" }}
                    />
                    <button onClick={submitRating}
                        disabled={userScore === 0 || submitting}
                        style={{
                            marginTop: "12px", padding: "11px 26px",
                            backgroundColor: userScore === 0 ? "#e2e8f0" : "#4f46e5",
                            color: userScore === 0 ? "#94a3b8" : "white",
                            border: "none", borderRadius: "8px",
                            cursor: userScore === 0 ? "not-allowed" : "pointer",
                            fontSize: "14px", fontWeight: "600"
                        }}>
                        {submitting ? "Submitting..." : "Submit Rating"}
                    </button>
                    {message && (
                        <p style={{
                            marginTop: "10px",
                            color: msgType === 'success' ? "#10b981" : "#ef4444",
                            fontSize: "13px", fontWeight: "500"
                        }}>{message}</p>
                    )}
                </div>
            ) : (
                <div style={{
                    background: "white", border: "1px solid #e2e8f0",
                    borderRadius: "16px", padding: "28px",
                    textAlign: "center",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
                }}>
                    <p style={{ color: "#64748b", marginBottom: "14px" }}>
                        Login to rate this {item.type}
                    </p>
                    <button onClick={() => navigate('/login')} style={{
                        background: "#4f46e5", color: "white",
                        border: "none", padding: "10px 24px",
                        borderRadius: "8px", cursor: "pointer", fontWeight: "600"
                    }}>Login to Rate</button>
                </div>
            )}
        </div>
    )
}