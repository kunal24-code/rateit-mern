import { useState } from 'react'

export default function StarRating({ score, onRate, readOnly = false }) {
    const [hovered, setHovered] = useState(0)

    return (
        <div style={{ display: "flex", gap: readOnly ? "2px" : "5px" }}>
            {[1, 2, 3, 4, 5].map(star => (
                <span key={star}
                    onClick={() => !readOnly && onRate(star)}
                    onMouseEnter={() => !readOnly && setHovered(star)}
                    onMouseLeave={() => !readOnly && setHovered(0)}
                    style={{
                        fontSize: readOnly ? "15px" : "30px",
                        cursor: readOnly ? "default" : "pointer",
                        color: star <= (hovered || score) ? "#f59e0b" : "#e2e8f0",
                        transition: "all 0.1s",
                        transform: !readOnly && star <= hovered ? "scale(1.2)" : "scale(1)",
                        display: "inline-block", lineHeight: 1
                    }}
                >★</span>
            ))}
        </div>
    )
}