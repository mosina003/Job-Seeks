import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{backgroundColor: '#0F172A', fontFamily: 'Inter, sans-serif'}} className="text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Poppins, sans-serif'}}>
              <span className="text-white">JOB</span>
              <span style={{color: '#00C4CC'}}>PORTAL</span>
            </h2>
            <p className="text-gray-300 mb-4">
              Your trusted platform for finding the perfect job opportunities. 
              Connect with top employers and take your career to the next level.
            </p>
            <p className="text-sm text-gray-400">© 2024 JobPortal. All rights reserved.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{color: '#00C4CC'}}>Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-[#00C4CC] transition-colors">Home</a>
              </li>
              <li>
                <a href="/jobs" className="text-gray-300 hover:text-[#00C4CC] transition-colors">Jobs</a>
              </li>
              <li>
                <a href="/browse" className="text-gray-300 hover:text-[#00C4CC] transition-colors">Browse</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-[#00C4CC] transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{color: '#00C4CC'}}>Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-colors" 
                style={{backgroundColor: '#1E293B'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00C4CC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-colors" 
                style={{backgroundColor: '#1E293B'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00C4CC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full transition-colors" 
                style={{backgroundColor: '#1E293B'}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#00C4CC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E293B'}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-300 text-sm">Email: support@jobportal.com</p>
              <p className="text-gray-300 text-sm mt-1">Phone: +91 1234567890</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              Made with ❤️ for job seekers worldwide
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-gray-400 hover:text-[#00C4CC] transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-400 hover:text-[#00C4CC] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;