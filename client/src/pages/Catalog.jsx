import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const GENRES = ["All Genres", "Sci-Fi", "Action", "Drama", "Thriller", "Crime", "Romance", "Fantasy", "Adventure", "Fiction", "Self-Help", "Finance"]

export default function Catalog() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("all")
    const [genre, setGenre] = useState("All Genres")
    const [search, setSearch] = useState("")
    const navigate = useNavigate()

    useEffect(() => { fetchItems() }, [filter])

    const fetchItems = async () => {
        try {
            setLoading(true)
            const url = filter === "all" ? '/items' : `/items?type=${filter}`
            const res = await API.get(url)
            setItems(res.data)
        } catch (err) { console.log(err) }
        finally { setLoading(false) }
    }

    const filtered = items.filter(item => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase())
        const matchGenre = genre === "All Genres" || item.genre.includes(genre)
        return matchSearch && matchGenre
    })

    return (
        <div className="page">
            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                borderRadius: "16px", padding: "40px 32px",
                marginBottom: "28px", position: "relative", overflow: "hidden"
            }}>
                <div style={{
                    position: "absolute", top: "-40px", right: "-40px",
                    width: "180px", height: "180px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "50%", pointerEvents: "none"
                }} />
                <div style={{
                    position: "absolute", bottom: "-60px", right: "80px",
                    width: "140px", height: "140px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "50%", pointerEvents: "none"
                }} />
                <h1 style={{
                    fontSize: "clamp(22px, 4vw, 36px)",
                    fontWeight: "800", color: "white",
                    marginBottom: "6px", letterSpacing: "-0.5px"
                }}>
                    Discover Movies & Books
                </h1>
                <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: "20px", fontSize: "15px" }}>
                    Rate what you love. Get personalized recommendations.
                </p>

                {/* Search */}
                <div style={{ position: "relative", maxWidth: "460px" }}>
                    <span style={{
                        position: "absolute", left: "13px",
                        top: "50%", transform: "translateY(-50%)",
                        color: "#94a3b8", fontSize: "15px", pointerEvents: "none"
                    }}>🔍</span>
                    <input
                        placeholder="Search movies or books..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            background: "white", border: "none",
                            color: "#1e293b", padding: "11px 14px 11px 40px",
                            borderRadius: "8px", fontSize: "14px",
                            width: "100%", outline: "none"
                        }}
                    />
                </div>
            </div>

            {/* Type Filter */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                {["all", "movie", "book"].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: "7px 18px", borderRadius: "20px",
                        border: `1.5px solid ${filter === f ? "#4f46e5" : "#e2e8f0"}`,
                        cursor: "pointer",
                        backgroundColor: filter === f ? "#4f46e5" : "white",
                        color: filter === f ? "white" : "#64748b",
                        fontWeight: filter === f ? "600" : "400",
                        fontSize: "13px", transition: "all 0.2s"
                    }}>
                        {f === "all" ? "All" : f === "movie" ? "🎬 Movies" : "📚 Books"}
                    </button>
                ))}
            </div>

            {/* Genre Filter */}
            <div style={{ display: "flex", gap: "6px", marginBottom: "20px", flexWrap: "wrap" }}>
                {GENRES.map(g => (
                    <button key={g} onClick={() => setGenre(g)} style={{
                        padding: "4px 12px", borderRadius: "20px",
                        border: `1.5px solid ${genre === g ? "#7c3aed" : "#e2e8f0"}`,
                        cursor: "pointer",
                        backgroundColor: genre === g ? "#ede9fe" : "white",
                        color: genre === g ? "#7c3aed" : "#94a3b8",
                        fontSize: "12px", fontWeight: genre === g ? "600" : "400",
                        transition: "all 0.2s"
                    }}>{g}</button>
                ))}
            </div>

            {/* Count */}
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "16px" }}>
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </p>

            {/* Loading Skeleton */}
            {loading ? (
                <div className="grid">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} style={{
                            height: "280px", borderRadius: "12px",
                            background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 1.5s infinite"
                        }} />
                    ))}
                </div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
                    <p style={{ fontSize: "18px", color: "#1e293b", fontWeight: "600" }}>No results found</p>
                    <p style={{ fontSize: "13px", color: "#94a3b8", marginTop: "6px" }}>Try a different search or filter</p>
                </div>
            ) : (
                <div className="grid">
                    {filtered.map(item => (
                        <ItemCard key={item._id} item={item} onClick={() => navigate(`/items/${item._id}`)} />
                    ))}
                </div>
            )}
        </div>
    )
}

function ItemCard({ item, onClick }) {
    const [hovered, setHovered] = useState(false)

    return (
        <div onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "white",
                borderRadius: "12px", overflow: "hidden",
                cursor: "pointer",
                boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.08)",
                transition: "all 0.25s",
                transform: hovered ? "translateY(-4px)" : "translateY(0)",
                border: "1px solid #e2e8f0"
            }}
        >
            {/* Poster */}
            <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img src={item.posterUrl} alt={item.title}
    onError={e => {
        e.target.src = `https://placehold.co/300x400/e2e8f0/64748b?text=${encodeURIComponent(item.title)}`
    }}
    style={{
        width: "100%", height: "200px",
        objectFit: "cover",
        transition: "transform 0.3s",
        transform: hovered ? "scale(1.05)" : "scale(1)"
    }}
/>
                {/* Type Badge */}
                <div style={{
                    position: "absolute", top: "8px", left: "8px",
                    background: "white", color: "#4f46e5",
                    padding: "3px 10px", borderRadius: "20px",
                    fontSize: "11px", fontWeight: "700",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
                }}>
                    {item.type === "movie" ? "🎬 Movie" : "📚 Book"}
                </div>
            </div>

            {/* Info */}
            <div style={{ padding: "12px 14px" }}>
                <h3 style={{
                    fontSize: "14px", fontWeight: "700",
                    color: "#1e293b", marginBottom: "4px",
                    lineHeight: "1.3",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                }}>{item.title}</h3>
                <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "8px" }}>
                    {item.releaseYear} • {item.genre.slice(0, 2).join(", ")}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: "#f59e0b", fontSize: "13px" }}>⭐</span>
                    <span style={{
                        fontSize: "13px", fontWeight: "600",
                        color: item.avgRating > 0 ? "#1e293b" : "#cbd5e1"
                    }}>
                        {item.avgRating > 0 ? item.avgRating : "Not rated"}
                    </span>
                    {item.ratingCount > 0 && (
                        <span style={{ color: "#cbd5e1", fontSize: "11px" }}>({item.ratingCount})</span>
                    )}
                </div>
            </div>
        </div>
    )
}