import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// ... imports
// (Note: I will use a larger replacement chunk to ensure I catch both desktop and mobile menus correctly without conflicts)

interface NavbarProps {
  onScheduleClick: () => void;
  onAboutClick: () => void;
  onHephaeAppsClick: () => void;
  onCuratedAppsClick: () => void;
  onBlogClick: () => void;
  onHomeClick?: () => void;
  onBuildProfileClick?: () => void; // New prop
}

export const Navbar: React.FC<NavbarProps> = ({
  onScheduleClick,
  onAboutClick,
  onHephaeAppsClick,
  onCuratedAppsClick,
  onBlogClick,
  onHomeClick,
  onBuildProfileClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolkitDropdownOpen, setIsToolkitDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    // Click outside handler for dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolkitDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, handler?: () => void) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsToolkitDropdownOpen(false);
    if (handler) handler();
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'} `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2 cursor-pointer" onClick={(e) => handleNavClick(e, onHomeClick || (() => window.scrollTo({ top: 0, behavior: 'smooth' })))}>
          <img
            src="https://insights.ai.hephae.co/hephae_logo_blue.png"
            alt="Hephae.co"
            className="h-10 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">

          {/* Toolkit Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsToolkitDropdownOpen(!isToolkitDropdownOpen)}
              className="flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors focus:outline-none"
            >
              Toolkit for AI dummies <ChevronDown size={16} className={`ml-1 transition-transform ${isToolkitDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isToolkitDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in-up">
                <a
                  href="#hephae-apps"
                  onClick={(e) => handleNavClick(e, onHephaeAppsClick)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  Hephae Apps
                </a>
                <a
                  href="#curated-apps"
                  onClick={(e) => handleNavClick(e, onCuratedAppsClick)}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  Curated Apps
                </a>
              </div>
            )}
          </div>

          <a href="#services" onClick={handleServicesClick} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</a>
          <a href="#about" onClick={(e) => handleNavClick(e, onAboutClick)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a>
          <a href="#blog" onClick={(e) => handleNavClick(e, onBlogClick)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Blog</a>

          {/* Get Started Dropdown (CTA) */}
          <div className="relative group">
            <button
              className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1"
            >
              Get Started <ChevronDown size={16} />
            </button>

            {/* Hover-based dropdown for simplicity, matching the toolkit one somewhat but using CSS group-hover for pure CSS approach or we can use state. 
                The toolkit one uses click. Let's stick to CSS hover for the button or click. 
                Actually, the existing dropdown uses click. Let's use CSS hover for this one to be 'stylized' and smoother, 
                or stick to consistency.
                Let's use a pure CSS hover approach for a "dropdown button" feel often seen in CTAs.
            */}
            <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 hidden group-hover:block animate-fade-in-up z-50">
              <a
                href="/build-ai-profile"
                onClick={(e) => handleNavClick(e, onBuildProfileClick)}
                className="block px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                Build AI Profile
                <span className="block text-xs text-gray-400 font-normal mt-0.5">Custom analysis for your biz</span>
              </a>
              <div className="h-px bg-gray-100 my-1"></div>
              <button
                onClick={onScheduleClick}
                className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
              >
                Schedule an Intro Call
                <span className="block text-xs text-gray-400 font-normal mt-0.5">Speak with an expert</span>
              </button>
            </div>
          </div>

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
          <div className="pl-3 border-l-2 border-blue-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Toolkit</span>
            <a href="#hephae-apps" className="block py-2 text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onHephaeAppsClick)}>Hephae Apps</a>
            <a href="#curated-apps" className="block py-2 text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onCuratedAppsClick)}>Curated Apps</a>
          </div>

          <a href="#services" className="text-gray-600 font-medium" onClick={handleServicesClick}>Services</a>
          <a href="#about" className="text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onAboutClick)}>About</a>
          <a href="#blog" className="text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onBlogClick)}>Blog</a>

          <div className="pt-4 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Get Started</span>
            <button
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                if (onBuildProfileClick) onBuildProfileClick();
                else window.location.href = '/build-ai-profile';
              }}
              className="w-full text-left py-3 px-4 bg-blue-50 text-blue-700 rounded-lg font-bold mb-2 flex justify-between items-center"
            >
              Build AI Profile
              <span className="text-xs bg-white px-2 py-1 rounded text-blue-600">Recommended</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScheduleClick();
              }}
              className="w-full text-left py-3 px-4 bg-gray-900 text-white rounded-lg font-bold"
            >
              Schedule an Intro Call
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};