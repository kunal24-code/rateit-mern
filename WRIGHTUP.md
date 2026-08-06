# RateIt — Recommendation Approach Write-Up

## Which Level I Implemented
Level 1 — Genre-Based Recommendations

## How It Works
1. Find all genres the user rated 4★ or 5★
2. Find items in those genres the user hasn't rated yet
3. Sort by average rating, return top 10 results

## Why I Chose Level 1
- Clean and explainable logic
- Works well with MongoDB $in and $nin operators
- Fast query performance
- Easy to demonstrate and verify results

## Cold Start Problem
When a user hasn't rated anything yet, there are no liked 
genres to base recommendations on. I handled this by showing 
the most popular items overall (sorted by avgRating descending).
This is known as the "Cold Start Problem" in recommendation systems.

## Tech Stack
- Frontend: React + React Router + Axios (Netlify)
- Backend: Node.js + Express + JWT Auth (Render)
- Database: MongoDB Atlas + Mongoose
- Version Control: GitHub

## Live Links
- Frontend: https://rateit-mern.netlify.app
- Backend: https://rateit-mern-4bu5.onrender.com/api/health
- GitHub: https://github.com/kunal24-code/rateit-mern