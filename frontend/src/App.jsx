import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import VerificationPage from './pages/VerificationPage';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
          <Route path="/verify/:id?" element={<MainLayout><VerificationPage /></MainLayout>} />
          
          <Route path="/admin/*" element={<DashboardLayout role="admin"><AdminDashboard /></DashboardLayout>} />
          <Route path="/student/*" element={<DashboardLayout role="student"><StudentDashboard /></DashboardLayout>} />
          <Route path="/recruiter/*" element={<DashboardLayout role="recruiter"><RecruiterDashboard /></DashboardLayout>} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
