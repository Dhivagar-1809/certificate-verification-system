import React, { useState } from 'react';
import { Search, UploadCloud, CheckCircle, XCircle, FileText, Calendar, Building, User } from 'lucide-react';
import api from '../utils/api';
import { toast } from 'react-toastify';

const VerificationPage = () => {
    const [certificateId, setCertificateId] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!certificateId.trim()) {
            toast.error('Please enter a Certificate ID');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const { data } = await api.post('/certificates/verify', { certificate_id: certificateId });
            setResult({ success: true, data });
        } catch (error) {
            setResult({ 
                success: false, 
                message: error.response?.data?.message || 'Verification failed. Certificate might be fake.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-dark-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Verify a Certificate
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Enter the unique Certificate ID below to instantly verify its authenticity against the Ethereum blockchain.
                    </p>
                </div>

                <div className="glass-card p-8 md:p-12 shadow-xl border border-white/40 dark:border-dark-700">
                    
                    <form onSubmit={handleVerify} className="max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-32 py-4 rounded-2xl border-2 border-slate-200 dark:border-dark-600 bg-white/50 dark:bg-dark-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-lg shadow-sm"
                            placeholder="e.g. 5a1b3c9d2..."
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value)}
                        />
                        <div className="absolute inset-y-2 right-2 flex items-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                            >
                                {loading ? (
                                    <span className="flex items-center space-x-2">
                                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
                                        <span>Verifying</span>
                                    </span>
                                ) : 'Verify Now'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm text-slate-500">
                        <span className="inline-flex items-center space-x-2">
                            <UploadCloud className="w-4 h-4" />
                            <span>Or upload a PDF certificate file (Coming soon)</span>
                        </span>
                    </div>

                    {/* Result Area */}
                    {result && (
                        <div className={`mt-12 rounded-2xl p-8 border ${result.success ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'} animate-fade-in-up transition-all`}>
                            <div className="flex flex-col items-center text-center">
                                {result.success ? (
                                    <>
                                        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Valid Certificate!</h3>
                                        <p className="text-emerald-700 dark:text-emerald-500/80 mb-8">This certificate has been verified on the blockchain and has not been tampered with.</p>
                                        
                                        {/* Certificate Details Card */}
                                        <div className="w-full bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-emerald-100 dark:border-emerald-800/50 text-left">
                                            <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-6 flex items-center border-b border-slate-100 dark:border-dark-700 pb-3">
                                                <FileText className="w-5 h-5 mr-2 text-primary-500"/>
                                                Certificate Details
                                            </h4>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                                <DetailItem icon={<User />} label="Student Name" value={result.data.certificate.student_name} />
                                                <DetailItem icon={<Building />} label="University" value={result.data.certificate.university} />
                                                <DetailItem icon={<FileText />} label="Course" value={result.data.certificate.course} />
                                                <DetailItem icon={<Calendar />} label="Issue Date" value={new Date(result.data.certificate.issue_date).toLocaleDateString()} />
                                            </div>
                                            
                                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-700">
                                                <p className="text-sm font-medium text-slate-500 mb-2">Blockchain Transaction ID</p>
                                                <a 
                                                    href={`https://etherscan.io/tx/${result.data.certificate.blockchain_txn}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-mono text-primary-600 dark:text-primary-400 break-all bg-primary-50 dark:bg-primary-900/20 p-3 rounded-lg block hover:underline"
                                                >
                                                    {result.data.certificate.blockchain_txn}
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6 shadow-inner">
                                            <XCircle className="w-10 h-10 text-red-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">Fake Certificate Detected</h3>
                                        <p className="text-red-700/80 dark:text-red-500/80 text-lg">{result.message}</p>
                                        <div className="mt-6 p-4 bg-white/50 dark:bg-dark-800 rounded-lg border border-red-100 dark:border-red-900/50">
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                The cryptographic hash of this ID does not match any valid record on the blockchain. This document is invalid.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start space-x-3">
        <div className="p-2 bg-slate-50 dark:bg-dark-900 rounded-lg text-slate-400 shrink-0">
            {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-slate-800 dark:text-slate-200 font-medium">{value}</p>
        </div>
    </div>
);

export default VerificationPage;
