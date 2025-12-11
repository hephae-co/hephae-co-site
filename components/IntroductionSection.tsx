import React, { useEffect, useRef, useState } from 'react';

export const IntroductionSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative py-32 bg-dark overflow-hidden flex flex-col items-center justify-center">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>
            
            {/* Gradient Overlay for smooth transition to bottom */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-dark via-transparent to-surface-50/5 pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                
                {/* Introducing Label - Slide Down */}
                <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                     <span className="inline-block py-1.5 px-5 rounded-full border border-blue-400/20 bg-blue-900/10 text-blue-300 font-mono text-xs tracking-[0.3em] uppercase backdrop-blur-sm mb-8 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        Introducing Hephae
                    </span>
                </div>

                {/* Main Text - Blur Reveal */}
                <h2 className="text-7xl md:text-9xl font-display font-bold text-white tracking-tighter mb-6 relative leading-none">
                    <span className={`block transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'filter-none opacity-100 scale-100' : 'blur-xl opacity-0 scale-90'}`}>
                        AI for
                    </span>
                    <span className={`block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400 transition-all duration-1000 delay-700 ease-out transform ${isVisible ? 'filter-none opacity-100 translate-y-0' : 'blur-xl opacity-0 translate-y-10'}`}>
                        Dummies...
                    </span>
                </h2>

                <p className={`mt-12 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    We strip away the complexity. No buzzwords. No confusion. <br className="hidden md:block"/>Just simple, powerful tools that work for your business.
                </p>

            </div>
            
            {/* Hard blend to next white section */}
            <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-surface-50 to-transparent"></div>
        </section>
    );
};