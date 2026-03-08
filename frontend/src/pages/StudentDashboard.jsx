import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Download, ExternalLink, QrCode as QrCodeIcon, Share2, Award, Calendar, Building, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const StudentDashboard = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const fetchMyCertificates = async () => {
            try {
                const { data } = await api.get('/certificates/my');
                setCertificates(data);
                if (data.length > 0) {
                    setSelectedCert(data[0]);
                }
            } catch (error) {
                toast.error('Failed to fetch certificates');
            } finally {
                setLoading(false);
            }
        };

        fetchMyCertificates();
    }, []);

    const handleShare = async (certId) => {
        const shareUrl = `${window.location.origin}/verify/${certId}`;
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Verification link copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy link');
        }
    };

    if (loading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div></div>;
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
             <div className="flex justify-between items-center bg-white/50 dark:bg-dark-800/50 p-6 rounded-2xl glass-panel">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 dark:text-white">My Credentials</h1>
                    <p className="text-slate-500 mt-1">View and share your verified academic certificates</p>
                </div>
            </div>

            {certificates.length === 0 ? (
                <div className="glass-card p-12 text-center border border-white/40 dark:border-dark-700">
                    <Award className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-xl font-medium text-slate-600 dark:text-slate-400">No certificates found</h3>
                    <p className="mt-2 text-slate-500">You haven't been issued any blockchain certificates yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Certificate List */}
                    <div className="lg:col-span-1 space-y-4">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 px-2">Your Certificates ({certificates.length})</h3>
                        {certificates.map(cert => (
                            <button
                                key={cert._id}
                                onClick={() => setSelectedCert(cert)}
                                className={`w-full text-left p-5 rounded-2xl transition-all duration-200 border ${
                                    selectedCert?._id === cert._id 
                                    ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-500 shadow-md ring-1 ring-primary-500 ring-offset-2 dark:ring-offset-dark-900' 
                                    : 'bg-white/40 dark:bg-dark-800/40 hover:bg-white/80 dark:hover:bg-dark-700/80 border-white/50 dark:border-dark-600 shadow-sm'
                                }`}
                            >
                                <h4 className={`font-bold text-lg mb-1 truncate ${selectedCert?._id === cert._id ? 'text-primary-700 dark:text-primary-400' : 'text-slate-800 dark:text-white'}`}>
                                    {cert.course}
                                </h4>
                                <p className="text-sm text-slate-500 flex items-center mb-2">
                                    <Building className="w-3 h-3 mr-1" /> {cert.university}
                                </p>
                                <div className="text-xs text-slate-400 font-mono mt-2 pt-2 border-t border-slate-200 dark:border-dark-600/50 flex justify-between items-center">
                                    <span>Issued: {new Date(cert.issue_date).toLocaleDateString()}</span>
                                    {selectedCert?._id === cert._id && <span className="w-2 h-2 rounded-full bg-primary-500"></span>}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Certificate Detail View */}
                    {selectedCert && (
                        <div className="lg:col-span-2">
                            <div className="glass-card overflow-hidden border border-white/40 dark:border-dark-700 shadow-xl relative">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

                                <div className="p-8 relative z-10">
                                    {/* Action Bar */}
                                    <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-dark-700">
                                        <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                            <Award className="w-4 h-4" />
                                            <span>Blockchain Verified</span>
                                        </div>
                                        <div className="flex space-x-3">
                                            <button 
                                                onClick={() => handleShare(selectedCert.certificate_id)}
                                                className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-full transition-colors tooltip"
                                                title="Copy Share Link"
                                            >
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                            <button 
                                                className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-full transition-colors"
                                                title="Download PDF"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="text-center mb-12">
                                        <div className="inline-flex items-center justify-center p-4 bg-slate-50 dark:bg-dark-900 rounded-full mb-6">
                                            <Shield className="w-12 h-12 text-primary-500" />
                                        </div>
                                        <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 leading-tight">Certificate of Completion</h2>
                                        <p className="text-slate-500 uppercase tracking-widest text-sm font-semibold mt-4">This is to certify that</p>
                                        <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mt-2 mb-6">{selectedCert.student_name}</h3>
                                        <p className="text-slate-500 uppercase tracking-widest text-sm font-semibold">has successfully completed</p>
                                        <h4 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mt-2">{selectedCert.course}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 mt-6 text-lg">at {selectedCert.university}</p>
                                    </div>

                                    {/* Footer Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/50 dark:bg-dark-800/50 p-6 rounded-2xl border border-slate-100 dark:border-dark-700">
                                        <div className="space-y-4">
                                            <InfoRow icon={<Calendar />} label="Date Issued" value={new Date(selectedCert.issue_date).toLocaleDateString()} />
                                            <InfoRow icon={<FileText />} label="Certificate ID" value={<span className="font-mono text-xs">{selectedCert.certificate_id}</span>} />
                                            <div className="pt-2">
                                                <p className="text-xs text-slate-500 font-medium mb-1 flex justify-between">
                                                    <span>Blockchain Txn</span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </p>
                                                <a 
                                                    href={`https://etherscan.io/tx/${selectedCert.blockchain_txn}`} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="font-mono text-xs text-primary-600 hover:underline break-all block"
                                                >
                                                    {selectedCert.blockchain_txn}
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-200">
                                                <QRCodeSVG 
                                                    value={`${window.location.origin}/verify/${selectedCert.certificate_id}`} 
                                                    size={120}
                                                    level={"H"}
                                                    fgColor={"#0f172a"}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-500 flex items-center"><QrCodeIcon className="w-3 h-3 mr-1" /> Scan to verify</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start">
        <div className="mt-0.5 text-slate-400 mr-3">{React.cloneElement(icon, { className: 'w-4 h-4' })}</div>
        <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{value}</div>
        </div>
    </div>
);

export default StudentDashboard;
