import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onScheduleClick: () => void;
  onAboutClick: () => void;
  onShowcaseClick: () => void;
  onBlogClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScheduleClick, onAboutClick, onShowcaseClick, onBlogClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, handler: () => void) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    handler();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="https://insights.ai.hephae.co/hephae_logo_blue.png"
            alt="Hephae.co"
            className="h-10 w-auto object-contain"
          />
          <span className="bg-blue-500 text-white text-xs px-1 rounded">v3</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#showcase" onClick={(e) => handleNavClick(e, onShowcaseClick)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Showcase Apps</a>
          <a href="#services" onClick={handleServicesClick} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</a>
          <a href="#about" onClick={(e) => handleNavClick(e, onAboutClick)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
          <a href="#blog" onClick={(e) => handleNavClick(e, onBlogClick)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</a>
          <button
            onClick={onScheduleClick}
            className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95"
          >
            Schedule a Call
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-900">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col space-y-4 shadow-xl">
          <a href="#showcase" className="text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onShowcaseClick)}>Showcase Apps</a>
          <a href="#services" className="text-gray-600 font-medium" onClick={handleServicesClick}>Services</a>
          <a href="#about" className="text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onAboutClick)}>About</a>
          <a href="#blog" className="text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onBlogClick)}>Blog</a>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onScheduleClick();
            }}
            className="bg-black text-white px-6 py-3 rounded-lg font-medium w-full"
          >
            Schedule a Call
          </button>
        </div>
      )}
    </nav>
  );
};