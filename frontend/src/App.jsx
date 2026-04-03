import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>

        {/* 🔥 DEFAULT → LOGIN PAGE */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 🔐 Protected Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            {/* ✅ Dashboard AFTER LOGIN */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* 🔴 ADMIN ONLY */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/patients" element={<Patients />} />
            </Route>

            {/* 🔴 ADMIN + DOCTOR */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]} />}>
              <Route path="/appointments" element={<Appointments />} />
            </Route>

            {/* 🟢 PATIENT ONLY */}
            <Route element={<ProtectedRoute allowedRoles={["PATIENT"]} />}>
              <Route path="/book-appointment" element={<BookAppointment />} />
            </Route>

          </Route>
        </Route>

        {/* ❌ Unknown route */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;