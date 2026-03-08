import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <footer className="glass-panel py-8 border-t border-white/20 dark:border-dark-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} CertiChain. Secure Academic Verification.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
