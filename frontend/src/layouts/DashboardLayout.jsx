import React from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { LayoutDashboard, FileText, Search, Settings } from 'lucide-react';

const DashboardLayout = ({ children, role }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role && user.role !== 'admin') {
     return <Navigate to="/" replace />;
  }

  const getLinks = () => {
      if (user.role === 'admin') {
          return [
              { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={20} /> },
              { name: 'Issue Certificate', path: '/admin/issue', icon: <FileText size={20} /> },
              { name: 'Verify', path: '/verify', icon: <Search size={20} /> },
          ];
      } else if (user.role === 'student') {
          return [
              { name: 'My Certificates', path: '/student', icon: <FileText size={20} /> },
          ];
      } else if (user.role === 'recruiter') {
           return [
              { name: 'Verify Certificate', path: '/verify', icon: <Search size={20} /> },
          ];
      }
      return [];
  };

  const links = getLinks();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dark-900">
      <Navbar />
      <div className="flex flex-1 pt-16 h-[calc(100vh-64px)] overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 glass-panel border-r border-white/20 dark:border-dark-700/50 hidden md:flex flex-col overflow-y-auto">
            <div className="p-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Menu
                </p>
                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path || (link.path !== '/verify' && location.pathname.startsWith(link.path) && link.path !== '/admin' && link.path !== '/student');
                        return (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive 
                                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800'
                                }`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto p-6">
                 {/* User profile snippet */}
                 <div className="flex items-center space-x-3 bg-white/50 dark:bg-dark-800/50 p-3 rounded-xl border border-white/40 dark:border-dark-600/50">
                     <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                         {user.name.charAt(0).toUpperCase()}
                     </div>
                     <div className="overflow-hidden">
                         <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                         <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                     </div>
                 </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
