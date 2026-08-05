import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Catalog from './pages/Catalog'
import ItemDetail from './pages/ItemDetail'
import Recommendations from './pages/Recommendations'
import Profile from './pages/Profile'

// Protected route
function PrivateRoute({ children }) {
    const { user } = useAuth()
    return user ? children : <Navigate to="/login" />
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "20px" }}>
                    <Routes>
                        <Route path="/" element={<Catalog />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/items/:id" element={<ItemDetail />} />
                        <Route path="/recommendations" element={
                            <PrivateRoute><Recommendations /></PrivateRoute>
                        } />
                        <Route path="/profile" element={
                            <PrivateRoute><Profile /></PrivateRoute>
                        } />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App