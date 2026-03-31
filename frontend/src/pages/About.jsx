import { HiGlobe, HiLightningBolt, HiUserGroup, HiShieldCheck, HiHeart, HiAcademicCap } from 'react-icons/hi';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 text-center mb-20 animate-slide-up">
        <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">About EcoClean</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
          Building a <span className="gradient-text">Cleaner Future</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          EcoClean is a Smart Waste Management System designed to bridge the gap between citizens and municipal waste collection services. 
          Our platform enables seamless waste reporting, efficient task assignment, and transparent tracking from complaint to collection.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-10 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-200">
              <HiGlobe className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
            <p className="text-slate-500 leading-relaxed">
              To empower communities with technology that makes waste management efficient, transparent, and accessible. 
              We believe every citizen deserves a clean neighborhood and every waste complaint deserves prompt action.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-card border border-slate-100 p-10 hover:shadow-lg transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-accent-200">
              <HiLightningBolt className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h2>
            <p className="text-slate-500 leading-relaxed">
              A world where waste management is as seamless as a food delivery app — where reporting is instant, 
              response is swift, and every piece of waste finds its proper disposal path.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stakeholders */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <h2 className="text-3xl font-black text-slate-800 text-center mb-12">Key Stakeholders</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: HiUserGroup, title: 'Citizens', desc: 'Report waste issues with location, type, and urgency. Track status in real-time from submission to collection.', color: 'from-emerald-400 to-emerald-600' },
            { icon: HiShieldCheck, title: 'Administrators', desc: 'Manage all requests, assign workers, track analytics, and control the entire waste management operations.', color: 'from-violet-400 to-violet-600' },
            { icon: HiHeart, title: 'Collection Workers', desc: 'View assigned tasks, update collection status, and mark waste as collected efficiently.', color: 'from-blue-400 to-blue-600' },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-card border border-slate-100 p-8 text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-500">
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-5xl mx-auto px-4 mb-20">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-10 md:p-14">
          <div className="flex items-center gap-3 mb-8">
            <HiAcademicCap className="w-8 h-8 text-primary-400" />
            <h2 className="text-2xl font-bold text-white">Technology Stack</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'React.js', sub: 'Frontend UI' },
              { label: 'Tailwind CSS', sub: 'Styling' },
              { label: 'Spring Boot', sub: 'Backend API' },
              { label: 'MySQL', sub: 'Database' },
              { label: 'React Router', sub: 'Navigation' },
              { label: 'Axios', sub: 'HTTP Client' },
              { label: 'JPA / Hibernate', sub: 'ORM' },
              { label: 'REST APIs', sub: 'Communication' },
            ].map((tech, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all">
                <p className="text-white font-bold text-sm">{tech.label}</p>
                <p className="text-slate-400 text-xs mt-1">{tech.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
