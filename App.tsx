import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PricingCard } from './components/PricingCard';
import { Footer } from './components/Footer';
import { NeuralBackground } from './components/NeuralBackground';
import { ProblemSection } from './components/ProblemSection';
import { IntroductionSection } from './components/IntroductionSection';
import { SchedulePage } from './components/SchedulePage';
import { AboutPage } from './components/AboutPage';
import { SERVICE_TIERS } from './constants';
import { ArrowRight, Utensils } from 'lucide-react';

const App: React.FC = () => {
  const [titleLine1, setTitleLine1] = useState('');
  const [titleLine2, setTitleLine2] = useState('');
  const [isLine1Complete, setIsLine1Complete] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  // State to manage current view
  // 'home' | 'schedule' | 'about'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<string>('General Inquiry');

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

  const handleScheduleClick = (serviceName?: string) => {
    setSelectedService(serviceName || 'General Inquiry');
    setCurrentView('schedule');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAboutClick = () => {
      setCurrentView('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackHome = () => {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (currentView === 'schedule') {
    return <SchedulePage onBack={handleBackHome} initialService={selectedService} />;
  }
  
  if (currentView === 'about') {
      return <AboutPage onBack={handleBackHome} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onScheduleClick={() => handleScheduleClick('General Inquiry')} onAboutClick={handleAboutClick} />
      
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
              href="https://ai-readiness-quest-1096334123076.us-west1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-pulse-ring bg-gradient-to-r from-blue-600 to-violet-600 text-white px-8 py-4 rounded-full font-bold text-lg md:text-xl hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.2)] border border-white/20 group"
             >
               Play the AI Readiness Quest <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
             </a>
             
             <a 
              href="https://aetheria-ai-restaurant-737598413072.us-central1.run.app/"
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
             <button 
              onClick={() => handleScheduleClick()}
              className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 mx-auto"
             >
                Start Your Transformation <ArrowRight size={20} />
             </button>
             <p className="text-gray-500 mt-4 text-sm">Select your preferred service in the next step.</p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default App;