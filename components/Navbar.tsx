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

          <a href="/build-ai-profile" onClick={(e) => handleNavClick(e, onBuildProfileClick)} className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Build AI Profile</a>
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
          <div className="pl-3 border-l-2 border-blue-100">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Toolkit</span>
            <a href="#hephae-apps" className="block py-2 text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onHephaeAppsClick)}>Hephae Apps</a>
            <a href="#curated-apps" className="block py-2 text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onCuratedAppsClick)}>Curated Apps</a>
          </div>

          <a href="/build-ai-profile" className="text-gray-600 font-medium" onClick={(e) => handleNavClick(e, onBuildProfileClick)}>Build AI Profile</a>
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