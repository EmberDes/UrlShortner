import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { JSX } from "react"

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuth = localStorage.getItem("auth")
  return isAuth ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App