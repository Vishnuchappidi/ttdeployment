import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">EC</span>
              </div>
              <span className="text-xl font-bold text-white">EcoClean</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Smart Waste Management System — making cities cleaner, greener, and more sustainable through technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/report" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Report Waste</Link></li>
              <li><Link to="/track" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">Track Request</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-primary-400 text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-slate-400 text-sm">Household Waste</li>
              <li className="text-slate-400 text-sm">E-Waste Collection</li>
              <li className="text-slate-400 text-sm">Hazardous Disposal</li>
              <li className="text-slate-400 text-sm">Green Waste Recycling</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <HiMail className="w-4 h-4 text-primary-400" /> support@ecoclean.com
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <HiPhone className="w-4 h-4 text-primary-400" /> +91 1800-ECO-CLEAN
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <HiLocationMarker className="w-4 h-4 text-primary-400" /> Smart City HQ, India
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-10 border-slate-800" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 EcoClean. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">Smart Waste Management for a Cleaner Tomorrow</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
