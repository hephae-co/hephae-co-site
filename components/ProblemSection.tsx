import React, { useEffect, useRef } from 'react';

const chaosWords = [
    'Data Entry', 'Unpaid Invoices', 'Scheduling Nightmare', 'Payroll Errors', 
    'Missed Emails', 'Spreadsheets', 'Compliance', 'Hiring?', 
    'Inventory', 'Lost Leads', 'Paperwork', 'Manual Reports',
    'Where is the file?', 'Password Reset', 'Support Tickets', 'Faxing?',
    'Duplicate Data', 'Late Fees', 'Tax Prep', 'Onboarding', 'Audit',
    'Receipts', 'Calendar', 'Deadlines', 'Burnout'
];

const colors = ['#cbd5e1', '#94a3b8', '#64748b', '#ef4444', '#f87171'];

export const ProblemSection: React.FC = () => {
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logic for particles
    const createParticle = (layerRef: React.RefObject<HTMLDivElement>, isBg: boolean) => {
        if (!layerRef.current) return;
        
        const el = document.createElement('div');
        // Tailwind classes for the particle
        el.className = 'absolute font-bold whitespace-nowrap select-none will-change-transform antialiased pointer-events-none';
        el.innerText = chaosWords[Math.floor(Math.random() * chaosWords.length)];
        
        // Position logic
        let leftPos;
        const zone = Math.random();
        if (zone < 0.45) {
            // Left Zone
            leftPos = Math.random() * 35; 
        } else if (zone < 0.90) {
            // Right Zone
            leftPos = 65 + (Math.random() * 35);
        } else {
            // Center Zone
            leftPos = 35 + (Math.random() * 30);
        }
        
        el.style.left = leftPos + '%';

        const duration = Math.random() * 10 + 10; // 10s - 20s
        const rotStart = (Math.random() * 40 - 20) + 'deg';
        const rotEnd = (Math.random() * 80 - 40) + 'deg';
        const scaleStart = (Math.random() * 0.2 + 0.9).toFixed(2);
        const scaleEnd = (parseFloat(scaleStart) + 0.2).toFixed(2);
        
        el.style.setProperty('--rot-start', rotStart);
        el.style.setProperty('--rot-end', rotEnd);
        el.style.setProperty('--scale-start', scaleStart);
        el.style.setProperty('--scale-end', scaleEnd);
        
        const opacity = isBg ? (Math.random() * 0.15 + 0.05) : (Math.random() * 0.5 + 0.4);
        el.style.setProperty('--target-opacity', opacity.toFixed(2));

        if (isBg) {
             const size = Math.random() * 4 + 3; // 3rem - 7rem
             el.style.fontSize = size + 'rem';
             el.style.zIndex = '0';
             el.style.color = '#475569'; // slate-600
             el.style.filter = 'blur(1px)';
        } else {
             const size = Math.random() * 1.5 + 1; // 1rem - 2.5rem
             el.style.fontSize = size + 'rem';
             el.style.zIndex = '10';
             el.style.color = colors[Math.floor(Math.random() * colors.length)];
        }

        el.style.animation = `floatDown ${duration}s linear forwards`;

        layerRef.current.appendChild(el);

        // Self-cleanup
        setTimeout(() => {
            el.remove();
        }, duration * 1000);
    };

    const midInterval = setInterval(() => createParticle(midLayerRef, false), 400);
    const bgInterval = setInterval(() => createParticle(bgLayerRef, true), 1200);
    
    // Initial burst to populate screen
    for(let i=0; i<30; i++) {
        setTimeout(() => createParticle(midLayerRef, false), i * 100);
        if(i % 3 === 0) setTimeout(() => createParticle(bgLayerRef, true), i * 100);
    }

    return () => {
        clearInterval(midInterval);
        clearInterval(bgInterval);
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-dark text-white flex items-center justify-center">
       {/* Layers */}
       <div ref={bgLayerRef} className="absolute inset-0 pointer-events-none w-full h-full z-0"></div>
       <div ref={midLayerRef} className="absolute inset-0 pointer-events-none w-full h-full z-0"></div>
       
       {/* Vignette */}
       <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'radial-gradient(circle, transparent 40%, #0B0F19 120%)' }}></div>

       {/* Content */}
       <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-block px-5 py-2 rounded-full bg-red-500/10 text-red-400 text-xs font-bold tracking-[0.25em] mb-10 border border-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.25)] animate-pulse backdrop-blur-md">
            THE REALITY
          </div>

          <h1 className="text-6xl md:text-9xl font-bold mb-10 leading-tight tracking-tight drop-shadow-2xl font-display">
            Drowning in <br />
            <span className="text-slate-500 relative inline-block">
                Manual Work?
                {/* Underline decoration */}
                <svg className="absolute w-[110%] h-4 -bottom-1 -left-[5%] text-red-600/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
            </span>
          </h1>

          <div className="relative inline-block">
            <p className="text-slate-300 max-w-2xl mx-auto text-2xl md:text-3xl leading-relaxed font-light drop-shadow-xl bg-dark/50 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                "I know AI is important, but I don't know where to start."
            </p>
        </div>
       </div>
    </section>
  );
};