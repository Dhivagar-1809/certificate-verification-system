import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { PlusCircle, Search, Clock, FileText } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const AdminDashboard = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Certificate Form State
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    course: '',
    university: '',
    issue_date: new Date().toISOString().split('T')[0],
  });
  const [issuing, setIssuing] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data } = await api.get('/certificates');
      setCertificates(data);
    } catch (error) {
      toast.error('Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleIssue = async (e) => {
    e.preventDefault();
    setIssuing(true);
    try {
      await api.post('/certificates/issue', formData);
      toast.success('Certificate issued to blockchain successfully!');
      fetchCertificates();
      setFormData({ ...formData, student_name: '', student_email: '', course: '' }); // Reset partial
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error issuing certificate');
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center bg-white/50 dark:bg-dark-800/50 p-6 rounded-2xl glass-panel">
          <div>
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Admin Dashboard</h1>
              <p className="text-slate-500 mt-1">Manage and issue university certificates</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issue form column */}
          <div className="lg:col-span-1">
              <div className="glass-card p-6 h-full border border-white/40 dark:border-dark-700">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center mb-6">
                      <PlusCircle className="mr-2 text-primary-500" /> Issue Certificate
                  </h3>
                  
                  <form onSubmit={handleIssue} className="space-y-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Student Name</label>
                          <input required type="text" className="input-field" value={formData.student_name} onChange={e => setFormData({...formData, student_name: e.target.value})} placeholder="Jane Doe" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Student Email</label>
                          <input required type="email" className="input-field" value={formData.student_email} onChange={e => setFormData({...formData, student_email: e.target.value})} placeholder="jane@example.com" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course / Degree</label>
                          <input required type="text" className="input-field" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} placeholder="B.Sc Computer Science" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">University Name</label>
                          <input required type="text" className="input-field" value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})} placeholder="Stanford University" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issue Date</label>
                          <input required type="date" className="input-field" value={formData.issue_date} onChange={e => setFormData({...formData, issue_date: e.target.value})} />
                      </div>
                      
                      <button type="submit" disabled={issuing} className="btn-primary w-full mt-4 flex justify-center items-center h-12">
                          {issuing ? <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div> : 'Mint to Blockchain'}
                      </button>
                  </form>
              </div>
          </div>

          {/* List and Stats Column */}
          <div className="lg:col-span-2 space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <StatWidget title="Total Issued" value={certificates.length} icon={<FileText className="text-blue-500" />} />
                  <StatWidget title="This Month" value={certificates.filter(c => new Date(c.createdAt).getMonth() === new Date().getMonth()).length} icon={<Clock className="text-emerald-500" />} />
                  <StatWidget title="Blockchain" value="Ethereum" icon={<div className="font-bold text-purple-500">ETH</div>} />
                  <StatWidget title="Network Status" value="Active" icon={<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>} />
              </div>

              {/* Chart (Placeholder for aesthetics) */}
              <div className="glass-card p-6 border border-white/40 dark:border-dark-700">
                   <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Issuance Activity (Last 7 Days)</h3>
                   <div className="h-48 w-full flex items-end space-x-2">
                       {/* Purely decorative bars for aesthetic startup look */}
                       {[30, 45, 20, 60, 40, 80, 50].map((height, i) => (
                           <div key={i} className="flex-1 bg-primary-100 dark:bg-primary-900/30 rounded-t-md relative group">
                               <div 
                                  className="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-md transition-all duration-500 group-hover:from-primary-500 group-hover:to-primary-300"
                                  style={{ height: `${height}%` }}
                               ></div>
                           </div>
                       ))}
                   </div>
              </div>

              {/* Recent Certificates Table */}
              <div className="glass-card overflow-hidden border border-white/40 dark:border-dark-700">
                  <div className="p-6 border-b border-slate-100 dark:border-dark-700 bg-white/50 dark:bg-dark-800/50">
                      <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
                          <Search className="mr-2 text-primary-500" size={20} /> Recent Certificates
                      </h3>
                  </div>
                  <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-slate-200 dark:divide-dark-700">
                          <thead className="bg-slate-50 dark:bg-dark-900">
                              <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Candidate</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Course</th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white/30 dark:bg-dark-800/30 divide-y divide-slate-100 dark:divide-dark-700">
                              {loading ? (
                                  <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
                              ) : certificates.slice(0, 5).map(cert => (
                                  <tr key={cert._id} className="hover:bg-slate-50/50 dark:hover:bg-dark-700/50 transition-colors">
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{cert.student_name}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{cert.certificate_id.substring(0,8)}...</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{cert.course}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(cert.issue_date).toLocaleDateString()}</td>
                                  </tr>
                              ))}
                              {!loading && certificates.length === 0 && (
                                  <tr><td colSpan="4" className="text-center py-8 text-slate-500">No certificates issued yet.</td></tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

const StatWidget = ({ title, value, icon }) => (
    <div className="glass-card p-4 flex items-center space-x-4 border border-white/40 dark:border-dark-700">
        <div className="p-3 rounded-xl bg-white dark:bg-dark-800 shadow-sm">
            {icon}
        </div>
        <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{title}</p>
            <p className="text-xl font-bold text-slate-800 dark:text-white">{value}</p>
        </div>
    </div>
)

export default AdminDashboard;
