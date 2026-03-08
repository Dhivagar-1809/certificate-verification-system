import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User as UserIcon, Shield, GraduationCap, Briefcase } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(name, email, password, role);
      navigate(`/${user.role}`);
    } catch (error) {
      // Toast handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-dark-900">
        <div className="w-full max-w-md">
            <div className="glass-card p-10 mt-8">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-500">Create Account</h2>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Join the secure verification network</p>
                </div>
                
                <form className="space-y-5" onSubmit={handleSubmit}>
                    
                    {/* Role Selection */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <RoleOption 
                            selected={role === 'student'} 
                            onClick={() => setRole('student')} 
                            icon={<GraduationCap className="h-5 w-5" />} 
                            label="Student" 
                        />
                        <RoleOption 
                            selected={role === 'recruiter'} 
                            onClick={() => setRole('recruiter')} 
                            icon={<Briefcase className="h-5 w-5" />} 
                            label="Recruiter" 
                        />
                        <RoleOption 
                            selected={role === 'admin'} 
                            onClick={() => setRole('admin')} 
                            icon={<Shield className="h-5 w-5" />} 
                            label="Admin" 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-dark-600 rounded-xl leading-5 bg-white/50 dark:bg-dark-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all sm:text-sm"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-dark-600 rounded-xl leading-5 bg-white/50 dark:bg-dark-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all sm:text-sm"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-dark-600 rounded-xl leading-5 bg-white/50 dark:bg-dark-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all transform hover:-translate-y-0.5 mt-4"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-slate-100 dark:border-dark-700 pt-6">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

const RoleOption = ({ selected, onClick, icon, label }) => (
    <button
        type="button"
        onClick={onClick}
        className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all ${
            selected 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
            : 'border-slate-200 dark:border-dark-600 hover:border-primary-300 text-slate-500 dark:text-slate-400'
        }`}
    >
        <div className="mb-1">{icon}</div>
        <span className="text-xs font-medium">{label}</span>
    </button>
)

export default Register;
