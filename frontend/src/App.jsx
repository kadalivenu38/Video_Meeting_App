import { Toaster } from 'react-hot-toast'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProtectedLayout from './components/ProtectedLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sessions from './pages/Sessions.jsx'
import Pricing from './pages/Pricing.jsx'
import MeetingRoom from './pages/MeetingRoom.jsx'

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login mode="login" />} />
        <Route path="/register" element={<Login mode="register" />} />

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
          <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
        </Route>

        {/* Other Routes */}
        <Route path="*" element={<Navigate to={'/dashboard'} replace/>} />
      </Routes>
    </>
  )
}

export default App
