import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

export const AnnouncementPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a small delay for impact
        const timer = setTimeout(() => {
            // Check session storage if already dismissed
            const dismissed = sessionStorage.getItem('hephae_seo_popup_dismissed');
            if (!dismissed) {
                setIsVisible(true);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('hephae_seo_popup_dismissed', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up max-w-sm w-full mx-4 sm:mx-0">
            <div className="relative group">
                {/* Animated Gradient Border/Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-gradient-xy"></div>

                {/* Glassmorphism Card */}
                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden">

                    {/* Background Decorative Element */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>

                    {/* Close Button */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors z-20"
                    >
                        <X size={16} />
                    </button>

                    <div className="relative z-10">
                        {/* Header Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles size={12} className="text-blue-400" />
                            New Release
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-2">
                            Website SEO Audit
                        </h3>
                        <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                            Is your website invisible? Our new AI-powered audit reveals exactly how to fix it and rank higher.
                        </p>

                        {/* CTA Button */}
                        <a
                            href="https://seo-audit.hephae.co/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn flex items-center justify-center gap-2 w-full bg-white text-slate-900 hover:bg-blue-50 font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                        >
                            Start Free Audit
                            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
