import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiTruck, HiChartBar, HiLocationMarker, HiLightningBolt, HiGlobe } from 'react-icons/hi';

const features = [
  { icon: HiLocationMarker, title: 'Report Anywhere', desc: 'Report waste issues from any location with precise geocoding and area-based tracking.' },
  { icon: HiTruck, title: 'Fast Collection', desc: 'Assigned workers reach your area quickly with real-time task management system.' },
  { icon: HiChartBar, title: 'Live Tracking', desc: 'Track your requests in real-time from submission to collection completion.' },
  { icon: HiShieldCheck, title: 'Verified Workers', desc: 'All collection workers are verified and managed through our secure admin panel.' },
  { icon: HiLightningBolt, title: 'Instant Updates', desc: 'Get instant status updates as your waste request moves through the pipeline.' },
  { icon: HiGlobe, title: 'Eco Impact', desc: 'Track the environmental impact of proper waste management in your community.' },
];

const stats = [
  { value: '10K+', label: 'Requests Handled' },
  { value: '500+', label: 'Active Workers' },
  { value: '50+', label: 'Cities Covered' },
  { value: '98%', label: 'Success Rate' },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                <span className="text-primary-300 text-sm font-medium">Smart City Initiative</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                Making Cities
                <span className="block gradient-text">Cleaner & Greener</span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                EcoClean empowers citizens to report waste issues instantly, enables admins to manage operations efficiently, and helps workers collect waste systematically.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/report" className="btn-primary flex items-center gap-2 text-lg !px-8 !py-4">
                  Report Waste <HiArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/track" className="btn-secondary !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 flex items-center gap-2 text-lg !px-8 !py-4">
                  Track Request
                </Link>
              </div>
            </div>

            {/* Right - Stats Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index}
                  className="dark-glass-card p-6 text-center hover:border-primary-500/30 transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}>
                  <p className="text-3xl font-black gradient-text mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Our Features
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4">
              Everything You Need for
              <span className="gradient-text"> Clean Cities</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              A comprehensive platform designed to streamline waste management from reporting to collection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index}
                className="group bg-white rounded-2xl p-8 shadow-card border border-slate-100 hover:border-primary-200 hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary-200">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-700 rounded-full text-sm font-semibold mb-4">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Report Issue', desc: 'Submit a waste report with location, type, and urgency details through our easy form.' },
              { step: '02', title: 'Admin Assigns', desc: 'Our admin team reviews the request and assigns a nearby verified collection worker.' },
              { step: '03', title: 'Waste Collected', desc: 'The worker visits the location, collects the waste, and marks the task complete.' },
            ].map((item, index) => (
              <div key={index} className="relative text-center group">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center mb-6 rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-xl">
                  <span className="text-2xl font-black text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 text-primary-300">
                    <HiArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Ready to Make Your City Cleaner?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens using EcoClean to report waste issues and track collections in real-time.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/report" className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 text-lg">
              Report Now
            </Link>
            <Link to="/login" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
