import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Database, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary-400/20 blur-[100px] animate-pulse"></div>
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border border-primary-200 dark:border-primary-900/50 text-primary-600 dark:text-primary-400 font-medium text-sm mb-8 animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
              <span>Blockchain Verified Certificates</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900 dark:text-white">
              End Fake Degrees with <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-indigo-500 to-purple-500">
                Immutable Trust
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Empower your university to issue tamper-proof digital certificates on the Ethereum blockchain. Enable recruiters to verify credentials instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg">
                Issue Certificates
              </Link>
              <Link to="/verify" className="w-full sm:w-auto px-8 py-4 glass-panel text-slate-800 dark:text-white font-semibold rounded-xl hover:bg-white/60 dark:hover:bg-dark-800/60 transition-all duration-300 text-lg border border-slate-200 dark:border-dark-600">
                Verify a Certificate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose CertiChain?</h2>
            <div className="h-1 w-20 bg-primary-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-indigo-500" />}
              title="Tamper-Proof"
              description="Certificates are hashed using SHA-256 and stored on the blockchain, making alterations mathematically impossible."
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-amber-500" />}
              title="Instant Verification"
              description="Recruiters can verify a candidate's credentials in seconds by uploading the file or scanning a QR code."
            />
            <FeatureCard 
              icon={<Database className="h-8 w-8 text-emerald-500" />}
              title="Decentralized Trust"
              description="No single point of failure. The Ethereum network ensures the permanence and validity of all records."
            />
          </div>
        </div>
      </section>
      
      {/* Stats Section with Glassmorphism */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900 dark:bg-dark-950"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-card bg-white/10 dark:bg-black/20 border border-white/10 p-12 rounded-3xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem value="99.9%" label="Uptime Guarantee" />
              <StatItem value="< 2s" label="Verification Time" />
              <StatItem value="10k+" label="Certs Issued" />
              <StatItem value="SHA-256" label="Encryption Standard" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass-card p-8 hover:-translate-y-2 transition-transform duration-300">
    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-dark-800 shadow-sm flex items-center justify-center mb-6 text-primary-500">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
  </div>
);

const StatItem = ({ value, label }) => (
  <div>
    <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{value}</div>
    <div className="text-primary-200 font-medium">{label}</div>
  </div>
);

export default Home;
