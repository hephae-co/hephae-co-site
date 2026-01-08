import React, { useState, useEffect, useRef } from 'react';

// Define types for state
interface SocialHandle {
    name: string;
    isPrimary: boolean;
}

interface ToolTag {
    name: string;
    usage: string;
}

export const BuildAIProfile: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processingText, setProcessingText] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    // Form Data
    const [businessName, setBusinessName] = useState('');
    const [website, setWebsite] = useState('');
    const [problem, setProblem] = useState('');
    const [competitor, setCompetitor] = useState('');

    // Tag State
    const [toolTags, setToolTags] = useState<ToolTag[]>([]);
    const [socialHandles, setSocialHandles] = useState<SocialHandle[]>([]);

    // Tool Input State
    const [tempToolName, setTempToolName] = useState('');
    const [isToolUsageMode, setIsToolUsageMode] = useState(false);

    const totalSteps = 7;

    // Refs for focusing
    const mainInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const toolNameInputRef = useRef<HTMLInputElement>(null);
    const toolUsageInputRef = useRef<HTMLInputElement>(null);
    const socialInputRef = useRef<HTMLInputElement>(null);

    // Auto-focus logic
    useEffect(() => {
        // Small delay to allow transition
        const timer = setTimeout(() => {
            if (currentStep === 4) {
                if (isToolUsageMode) {
                    toolUsageInputRef.current?.focus();
                } else {
                    toolNameInputRef.current?.focus();
                }
            } else if (currentStep === 5) {
                socialInputRef.current?.focus();
            } else {
                mainInputRef.current?.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [currentStep, isToolUsageMode]);


    // processing simulator
    const simulateProcessing = async (text: string, duration: number) => {
        setIsProcessing(true);
        setProcessingText(text);
        await new Promise(resolve => setTimeout(resolve, duration));
        setIsProcessing(false);
    };

    const handleNext = async () => {
        // Validation
        if (currentStep === 1 && !businessName.trim()) return;
        if (currentStep === 3 && !problem.trim()) return;

        // Processing interludes
        if (currentStep === 3) {
            await simulateProcessing('ANALYZING PAIN POINTS', 2000);
        } else if (currentStep === 4) {
            await simulateProcessing('SCANNING TECH STACK COMPATIBILITY', 1500);
        }

        if (currentStep === 6) {
            await finishForm();
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const finishForm = async () => {
        await simulateProcessing('COMPILING PROFILE', 2500);

        // Submit Data
        try {
            const payload = {
                businessName,
                website,
                problem,
                tools: toolTags,
                socials: socialHandles,
                competitor
            };

            const response = await fetch('/api/submit-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setShowSuccess(true);
            } else {
                console.error('Submission failed');
                // Show error handling UI or alert? For now just show success as fallback/mock
                setShowSuccess(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setShowSuccess(true);
        }
    };

    // Tool Handlers
    const handleToolNameEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const val = e.currentTarget.value.trim();
            if (val) {
                setTempToolName(val);
                setIsToolUsageMode(true);
                e.currentTarget.value = ''; // clear input but keep state
            } else {
                handleNext();
            }
        }
    };

    const handleToolUsageEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const usageVal = e.currentTarget.value.trim();
            setToolTags([...toolTags, { name: tempToolName, usage: usageVal }]);
            // Reset
            setTempToolName('');
            setIsToolUsageMode(false);
        }
    };

    // Social Handlers
    const handleSocialEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const val = e.currentTarget.value.trim();
            if (val) {
                setSocialHandles([...socialHandles, { name: val, isPrimary: false }]);
                e.currentTarget.value = '';
            } else {
                handleNext();
            }
        }
    };

    const toggleSocialPrimary = (index: number) => {
        const newHandles = socialHandles.map((h, i) => ({
            ...h,
            isPrimary: i === index ? !h.isPrimary : false // Toggle clicked, unset others
        }));
        setSocialHandles(newHandles);
    };

    // Generic Enter Handler
    const handleGenericEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleNext();
        }
    };


    if (showSuccess) {
        return (
            <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white p-8 text-center animate-fade-in">
                <div className="mb-8 animate-bounce-slow">
                    <img src="https://insights.ai.hephae.co/hephae_logo_blue.png" alt="Hephae Logo" className="w-32 h-32 object-contain drop-shadow-xl" />
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-4">Transmission Received.</h1>
                <p className="text-slate-500 text-xl max-w-2xl italic mb-4">
                    "We have top men working on it right now. Top... men."
                </p>
                <p className="text-slate-400 text-sm font-mono mb-8">
                    (Translation: Our veteran consultants are analyzing your data and will be in touch shortly.)
                </p>

                <div className="mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50 font-mono text-sm text-left w-full max-w-md shadow-sm">
                    <div className="text-slate-400 mb-2 border-b border-slate-200 pb-1">// SYSTEM LOG</div>
                    <div className="text-green-600 font-bold">{'>'} STATUS: SECURE</div>
                    <div className="text-green-600 font-bold">{'>'} NEXT_STEP: HUMAN_PROTOCOL_INITIATED</div>
                </div>

                <div className="mt-8 text-center">
                    <a href="/" className="inline-block px-6 py-2 border border-slate-200 rounded-full text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors mb-4">
                        Return to Home
                    </a>
                    <br />
                    <span className="text-slate-400 text-xs">Questions? </span>
                    <a href="mailto:contact@hephae.co" className="text-slate-500 hover:text-blue-600 text-xs font-mono hover:underline transition-colors">
                        contact@hephae.co
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative bg-slate-50 overflow-hidden text-slate-900 font-sans selection:bg-blue-100">
            {/* Background Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            {/* Top UI */}
            <div className="absolute top-0 w-full p-8 flex justify-between items-center z-20">
                <div className="flex items-center gap-2">
                    <a href="/" className="w-3 h-3 bg-blue-500 rounded-full animate-pulse cursor-pointer"></a>
                    <span className="text-xs font-mono text-blue-600 tracking-widest font-bold">HEPHAE_INTEL_SYSTEM</span>
                </div>
                <div className="flex gap-1">
                    {[...Array(totalSteps)].map((_, i) => (
                        <div key={i} className={`w-12 h-1 rounded transition-colors duration-300 ${i <= currentStep ? 'bg-blue-500' : 'bg-slate-200'}`}></div>
                    ))}
                </div>
            </div>

            {/* Memory Buffer (Desktop Only) */}
            <div className="hidden md:block fixed bottom-8 left-8 w-[250px] z-30 font-mono text-xs">
                <div className="text-blue-400 mb-2 border-b border-blue-200 pb-1 tracking-widest uppercase font-bold text-[10px]">// MEMORY BUFFER</div>
                <div className="space-y-1">
                    {businessName && (
                        <div className="text-slate-500 truncate group cursor-pointer hover:text-blue-600" onClick={() => setCurrentStep(1)}>
                            <span className="font-bold text-slate-400 group-hover:text-blue-500">[ENTITY]</span> {businessName}
                        </div>
                    )}
                    {website && (
                        <div className="text-slate-500 truncate group cursor-pointer hover:text-blue-600" onClick={() => setCurrentStep(2)}>
                            <span className="font-bold text-slate-400 group-hover:text-blue-500">[URL]</span> {website}
                        </div>
                    )}
                    {toolTags.length > 0 && (
                        <div className="text-slate-500 truncate group cursor-pointer hover:text-blue-600" onClick={() => setCurrentStep(4)}>
                            <span className="font-bold text-slate-400 group-hover:text-blue-500">[INFRA]</span> {toolTags.map(t => t.name).join(', ')}
                        </div>
                    )}
                    {socialHandles.length > 0 && (
                        <div className="text-slate-500 truncate group cursor-pointer hover:text-blue-600" onClick={() => setCurrentStep(5)}>
                            <span className="font-bold text-slate-400 group-hover:text-blue-500">[NET]</span> {socialHandles.map(s => s.name).join(', ')}
                        </div>
                    )}
                </div>
            </div>

            <main className="relative z-10 w-full flex flex-col items-center px-4 max-w-4xl mx-auto">
                {/* Logo */}
                {currentStep < totalSteps && !showSuccess && (
                    <div className="mb-10 animate-bounce-slow">
                        <img src="https://insights.ai.hephae.co/hephae_logo_blue.png" alt="Hephae Logo" className="w-32 h-32 object-contain drop-shadow-xl" />
                    </div>
                )}

                {/* Steps */}
                <div className="w-full flex justify-center min-h-[400px]">

                    {/* Step 0: Welcome */}
                    {currentStep === 0 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <h1 className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-slate-900">Initialize Analysis</h1>
                            <p className="text-slate-500 text-lg mb-8 text-center max-w-md leading-relaxed">
                                Welcome to Hephae. Let's construct your business intelligence profile together.
                            </p>
                            <button onClick={handleNext} className="px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                BEGIN SESSION
                            </button>
                        </div>
                    )}

                    {/* Step 1: Business Name */}
                    {currentStep === 1 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <label className="text-blue-600 text-sm font-bold font-mono tracking-widest mb-4">IDENTIFICATION</label>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 text-slate-900">What is the name of your entity?</h2>
                            <input
                                ref={mainInputRef}
                                type="text"
                                className="w-full bg-transparent border-b-2 border-slate-300 text-3xl md:text-4xl text-center py-2 text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-300 font-display transition-colors"
                                placeholder="Type business name..."
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                onKeyDown={handleGenericEnter}
                            />
                            <button onClick={handleNext} className="mt-12 px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                CONFIRM
                            </button>
                        </div>
                    )}

                    {/* Step 2: Website */}
                    {currentStep === 2 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <label className="text-blue-600 text-sm font-bold font-mono tracking-widest mb-4">DIGITAL FOOTPRINT</label>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 text-slate-900">
                                Where can we find <span className="text-blue-600">{businessName || 'you'}</span> online?
                            </h2>
                            <input
                                ref={mainInputRef}
                                type="url"
                                className="w-full bg-transparent border-b-2 border-slate-300 text-3xl md:text-4xl text-center py-2 text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-300 font-display transition-colors"
                                placeholder="www.example.com"
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                onKeyDown={handleGenericEnter}
                            />
                            <div className="flex flex-col items-center gap-4 mt-12">
                                <button onClick={handleNext} className="px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                    NEXT
                                </button>
                                <button onClick={handleNext} className="text-slate-400 text-sm hover:text-blue-600 underline">Skip this step</button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: The Problem */}
                    {currentStep === 3 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <label className="text-blue-600 text-sm font-bold font-mono tracking-widest mb-4">CORE OBJECTIVE</label>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3 text-slate-900">What is the #1 problem to solve?</h2>
                            <p className="text-slate-400 text-sm mb-8">Be specific. I learn faster with details.</p>
                            <textarea
                                ref={mainInputRef}
                                className="w-full bg-transparent border-b-2 border-slate-300 text-xl md:text-2xl text-center py-2 text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-300 font-display transition-colors bg-white/50 rounded-t-lg resize-none"
                                rows={3}
                                placeholder="e.g. Too much time spent on manual data entry..."
                                value={problem}
                                onChange={(e) => setProblem(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleNext(); } }}
                            />
                            <button onClick={handleNext} className="mt-12 px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                ANALYZE THIS
                            </button>
                        </div>
                    )}

                    {/* Step 4: Tools */}
                    {currentStep === 4 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <label className="text-blue-600 text-sm font-bold font-mono tracking-widest mb-4">CURRENT INFRASTRUCTURE</label>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-slate-900">What tools power your operations?</h2>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 justify-center mb-6 min-h-[32px]">
                                {toolTags.map((tool, idx) => (
                                    <div key={idx} className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold font-mono border border-blue-200 shadow-sm flex flex-col items-center leading-tight animate-fade-in">
                                        <span>{tool.name}</span>
                                        {tool.usage && <span className="text-[10px] text-blue-500 font-normal border-t border-blue-200 mt-0.5 pt-0.5">{tool.usage}</span>}
                                    </div>
                                ))}
                            </div>

                            {!isToolUsageMode ? (
                                <>
                                    <input
                                        ref={toolNameInputRef}
                                        type="text"
                                        className="w-full bg-transparent border-b-2 border-slate-300 text-2xl md:text-3xl text-center py-2 text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-300 font-display transition-colors"
                                        placeholder="Name (e.g. Salesforce)..."
                                        onKeyDown={handleToolNameEnter}
                                    />
                                    <div className="text-slate-400 text-xs mt-3 font-mono">Press <span className="font-bold text-blue-600">[ENTER]</span> to add tool details</div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center w-full animate-fade-in-up">
                                    <label className="text-slate-500 text-sm font-mono mb-2">How do you use <span className="text-blue-600 font-bold">{tempToolName}</span>? (Optional)</label>
                                    <input
                                        ref={toolUsageInputRef}
                                        type="text"
                                        className="w-4/5 bg-white border border-slate-300 text-lg text-center py-2 px-4 rounded-lg text-slate-600 focus:outline-none focus:border-blue-500 font-display transition-colors shadow-sm"
                                        placeholder="e.g. For tracking leads..."
                                        onKeyDown={handleToolUsageEnter}
                                    />
                                    <div className="text-xs text-slate-400 mt-2">Press [ENTER] to save tool</div>
                                </div>
                            )}

                            <button onClick={handleNext} className="mt-12 px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                NEXT STEP
                            </button>
                        </div>
                    )}

                    {/* Step 5: Socials */}
                    {currentStep === 5 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <label className="text-blue-600 text-sm font-bold font-mono tracking-widest mb-4">NETWORK NODES</label>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-slate-900">Add your social handles</h2>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 justify-center mb-6 min-h-[32px]">
                                {socialHandles.map((handle, idx) => (
                                    <span
                                        key={idx}
                                        onClick={() => toggleSocialPrimary(idx)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-bold font-mono border shadow-sm cursor-pointer transition-all hover:scale-105 ${handle.isPrimary ? 'bg-yellow-100 text-yellow-800 border-yellow-300 shadow-md ring-2 ring-yellow-200' : 'bg-blue-100 text-blue-700 border-blue-200'}`}
                                    >
                                        {handle.isPrimary && <span className="mr-1">★</span>}
                                        {handle.name}
                                    </span>
                                ))}
                            </div>

                            <input
                                ref={socialInputRef}
                                type="text"
                                className="w-full bg-transparent border-b-2 border-slate-300 text-2xl md:text-3xl text-center py-2 text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-300 font-display transition-colors"
                                placeholder="Type handle & press Enter..."
                                onKeyDown={handleSocialEnter}
                            />
                            <div className="text-slate-400 text-xs mt-3 font-mono">Click a tag to set as <span className="text-yellow-600 font-bold">★ PRIMARY</span></div>

                            <button onClick={handleNext} className="mt-12 px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                NEXT
                            </button>
                        </div>
                    )}

                    {/* Step 6: Competitor */}
                    {currentStep === 6 && (
                        <div className="flex flex-col items-center animate-slide-up w-full max-w-[700px]">
                            <label className="text-blue-600 text-sm font-bold font-mono tracking-widest mb-4">COMPETITIVE BENCHMARK</label>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8 text-slate-900">Is there a competitor doing it well?</h2>
                            <input
                                ref={mainInputRef}
                                type="text"
                                className="w-full bg-transparent border-b-2 border-slate-300 text-2xl md:text-3xl text-center py-2 text-slate-900 focus:outline-none focus:border-blue-500 placeholder-slate-300 font-display transition-colors"
                                placeholder="Competitor Name or URL..."
                                value={competitor}
                                onChange={(e) => setCompetitor(e.target.value)}
                                onKeyDown={handleGenericEnter}
                            />
                            <div className="flex flex-col items-center gap-4 mt-12">
                                <button onClick={handleNext} className="px-8 py-3 bg-white border-2 border-blue-500 text-blue-500 font-display font-bold tracking-widest uppercase rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
                                    FINALIZE PROFILE
                                </button>
                                <button onClick={handleNext} className="text-slate-400 text-sm hover:text-blue-600 underline">No specific competitor</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Hint */}
                <div className="mt-16 text-slate-400 text-xs font-mono animate-pulse">
                    PRESS [ENTER] TO CONTINUE
                </div>
            </main>

            {/* Processing Overlay */}
            {isProcessing && (
                <div className="fixed inset-0 bg-white/95 z-50 flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <div className="text-lg font-mono font-bold text-blue-600 animate-pulse">{processingText}...</div>
                </div>
            )}
        </div>
    );
};
