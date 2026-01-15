import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PricingCard } from './components/PricingCard';
import { Footer } from './components/Footer';
import { NeuralBackground } from './components/NeuralBackground';
import { ProblemSection } from './components/ProblemSection';
import { IntroductionSection } from './components/IntroductionSection';
import { SchedulePage } from './components/SchedulePage';
import { AboutPage } from './components/AboutPage';
import { ShowcasePage } from './components/ShowcasePage';
import { BlogPage } from './components/BlogPage';
import { SERVICE_TIERS } from './constants';
import { ArrowRight, Utensils, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

import { BuildAIProfile } from './components/BuildAIProfile';
import { usePageMeta } from './usePageMeta';

const App: React.FC = () => {
  // Helper to get view from path
  const getViewFromPath = () => {
    const path = window.location.pathname;
    if (path === '/toolkit/hephae') return 'toolkit-hephae';
    if (path === '/toolkit/curated') return 'toolkit-curated';
    if (path === '/toolkit') return 'toolkit-hephae'; // Default to hephae
    if (path === '/blog') return 'blog';
    if (path === '/about') return 'about';
    if (path === '/schedule') return 'schedule';
    if (path === '/build-ai-profile') return 'build-ai-profile';
    return 'home';
  };

  const [titleLine1, setTitleLine1] = useState('');
  const [titleLine2, setTitleLine2] = useState('');
  const [isLine1Complete, setIsLine1Complete] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // State to manage current view
  const [currentView, setCurrentView] = useState<string>(getViewFromPath());
  const [selectedService, setSelectedService] = useState<string>('General Inquiry');

  const getMeta = (view: string) => {
    switch (view) {
      case 'home': return {
        title: "Hephae.co | GenAI Solutions",
        desc: "Big AI for Small Business. Transform your business with our GenAI consulting and tools."
      };
      case 'schedule': return {
        title: "Schedule Consultation | Hephae",
        desc: "Book a call with Hephae's AI experts to start your transformation."
      };
      case 'about': return {
        title: "About Us | Hephae",
        desc: "Learn about Hephae's mission to bring enterprise-grade AI to small businesses."
      };
      case 'build-ai-profile': return {
        title: "Build AI Profile | Hephae",
        desc: "Create your custom AI readiness profile and get a tailored strategy."
      };
      case 'toolkit-hephae': return {
        title: "Hephae Apps | Toolkit",
        desc: "Explore Hephae's suite of AI tools designed for business efficiency."
      };
      case 'toolkit-curated': return {
        title: "Curated Apps | Toolkit",
        desc: "Discover hand-picked AI applications to boost your productivity."
      };
      case 'blog': return {
        title: "Blog | Hephae",
        desc: "Insights and updates on Generative AI and business transformation."
      };
      default: return {
        title: "Hephae.co | GenAI Solutions",
        desc: "Big AI for Small Business. We help you transform your business with GenAI."
      };
    }
  };

  const meta = getMeta(currentView);
  usePageMeta(meta.title, meta.desc);


  const [isBottomGetStartedOpen, setIsBottomGetStartedOpen] = useState(false);
  const bottomDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromPath());
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (bottomDropdownRef.current && !bottomDropdownRef.current.contains(event.target as Node)) {
        setIsBottomGetStartedOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const line1Text = "Big AI for ";
    const line2Text = "Small Business.";
    let current1 = 0;
    let current2 = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLine1 = () => {
      if (current1 <= line1Text.length) {
        setTitleLine1(line1Text.slice(0, current1));
        current1++;
        timeoutId = setTimeout(typeLine1, 80);
      } else {
        setIsLine1Complete(true);
        // Small pause before line 2
        timeoutId = setTimeout(typeLine2, 300);
      }
    };

    const typeLine2 = () => {
      if (current2 <= line2Text.length) {
        setTitleLine2(line2Text.slice(0, current2));
        current2++;
        timeoutId = setTimeout(typeLine2, 80);
      } else {
        setIsTypingComplete(true);
      }
    };

    // Start typing after a short delay
    timeoutId = setTimeout(typeLine1, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const navigateTo = (view: string, path: string) => {
    window.history.pushState({}, '', path);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScheduleClick = (serviceName?: string) => {
    setSelectedService(serviceName || 'General Inquiry');
    navigateTo('schedule', '/schedule');
  };

  const handleAboutClick = () => {
    navigateTo('about', '/about');
  };

  const handleHephaeAppsClick = () => {
    navigateTo('toolkit-hephae', '/toolkit/hephae');
  };

  const handleCuratedAppsClick = () => {
    navigateTo('toolkit-curated', '/toolkit/curated');
  };

  const handleBlogClick = () => {
    navigateTo('blog', '/blog');
  };

  const handleBuildProfileClick = () => {
    navigateTo('build-ai-profile', '/build-ai-profile');
  };

  const handleBackHome = () => {
    navigateTo('home', '/');
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentView(event.state.view);
      } else {
        setCurrentView(getViewFromPath());
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (currentView === 'schedule') {
    return <SchedulePage onBack={handleBackHome} initialService={selectedService} />;
  }

  if (currentView === 'about') {
    return <AboutPage onBack={handleBackHome} />;
  }

  if (currentView === 'build-ai-profile') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onScheduleClick={() => handleScheduleClick('General Inquiry')}
          onAboutClick={handleAboutClick}
          onHephaeAppsClick={handleHephaeAppsClick}
          onCuratedAppsClick={handleCuratedAppsClick}
          onBlogClick={handleBlogClick}
          onHomeClick={handleBackHome}
          onBuildProfileClick={handleBuildProfileClick}
        />
        <BuildAIProfile />
      </div>
    );
  }

  if (currentView === 'toolkit-hephae' || currentView === 'toolkit-curated') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onScheduleClick={() => handleScheduleClick('General Inquiry')}
          onAboutClick={handleAboutClick}
          onHephaeAppsClick={handleHephaeAppsClick}
          onCuratedAppsClick={handleCuratedAppsClick}
          onBlogClick={handleBlogClick}
          onHomeClick={handleBackHome}
          onBuildProfileClick={handleBuildProfileClick}
        />
        <ShowcasePage category={currentView === 'toolkit-hephae' ? 'hephae' : 'curated'} />
        <Footer />
      </div>
    );
  }

  if (currentView === 'blog') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar
          onScheduleClick={() => handleScheduleClick('General Inquiry')}
          onAboutClick={handleAboutClick}
          onHephaeAppsClick={handleHephaeAppsClick}
          onCuratedAppsClick={handleCuratedAppsClick}
          onBlogClick={handleBlogClick}
          onHomeClick={handleBackHome}
          onBuildProfileClick={handleBuildProfileClick}
        />
        <BlogPage />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        onScheduleClick={() => handleScheduleClick('General Inquiry')}
        onAboutClick={handleAboutClick}
        onHephaeAppsClick={handleHephaeAppsClick}
        onCuratedAppsClick={handleCuratedAppsClick}
        onBlogClick={handleBlogClick}
        onHomeClick={handleBackHome}
        onBuildProfileClick={handleBuildProfileClick}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

        {/* Static Background Elements (Blobs) - Placed BEHIND Neural Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
          <div className="absolute top-20 right-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 left-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Interactive Neural Background - Placed ON TOP of Blobs */}
        <NeuralBackground />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 pointer-events-none">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 border border-blue-100/50 backdrop-blur-md mb-8 pointer-events-auto shadow-sm transition-transform hover:scale-105 duration-300">
            <img
              src="https://insights.ai.hephae.co/hephae_logo_blue.png"
              alt="Hephae Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold font-display text-gray-900 tracking-widest">HEPHAE</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tighter mb-8 leading-[1.1] min-h-[2.2em]">
            {titleLine1}
            {!isLine1Complete && <span className="animate-pulse text-blue-600">|</span>}
            <br />
            <span className="animate-gradient-text">
              {titleLine2}
              {isLine1Complete && !isTypingComplete && <span className="animate-pulse text-blue-600">|</span>}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto mt-12 relative z-20">
            <a
              href={process.env.AI_READINESS_QUEST_URL!}
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-ring bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-full font-bold text-lg md:text-xl hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-white/20 group"
            >
              Play the AI Readiness Quest <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={process.env.AETHERIA_AI_RESTAURANT_URL!}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/80 backdrop-blur-md text-gray-900 border border-white/40 px-8 py-4 rounded-full font-bold text-lg md:text-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              Try Restaurant Demo <Utensils size={20} className="text-gray-500" />
            </a>
          </div>
        </div>
      </section>

      {/* Problem Section (Chaos) */}
      <ProblemSection />

      {/* Introduction Section (Transition) */}
      <IntroductionSection />

      {/* Services Grid */}
      <section className="py-20 bg-surface-50 relative scroll-mt-24" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-gray-500 text-lg">Whether you are just exploring the possibilities or ready to build deployment-ready tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {SERVICE_TIERS.map((tier) => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>

          {/* Global CTA */}
          <div className="mt-16 text-center">
            <div className="relative inline-block text-left" ref={bottomDropdownRef}>
              <button
                onClick={() => setIsBottomGetStartedOpen(!isBottomGetStartedOpen)}
                className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto"
              >
                Start Your Transformation <ChevronDown size={20} className={`ml-1 transition-transform ${isBottomGetStartedOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBottomGetStartedOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fade-in-up z-30 text-left">
                  <a
                    href="/build-ai-profile"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsBottomGetStartedOpen(false);
                      handleBuildProfileClick();
                    }}
                    className="block px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <span className="block font-bold text-lg">Build AI Profile</span>
                    <span className="block text-sm text-gray-400 font-normal mt-1">Get a custom analysis for your business</span>
                  </a>
                  <div className="h-px bg-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      setIsBottomGetStartedOpen(false);
                      handleScheduleClick('General Inquiry');
                    }}
                    className="block w-full text-left px-6 py-4 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <span className="block font-bold text-lg">Schedule an Intro Call</span>
                    <span className="block text-sm text-gray-400 font-normal mt-1">Speak directly with an AI expert</span>
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-500 mt-4 text-sm">Select your preferred path above.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;