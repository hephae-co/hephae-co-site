import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OptimizationBackground } from './OptimizationBackground';

interface ShowcasePageProps {
    category: 'hephae' | 'curated';
}

interface AppData {
    title: string;
    description: string;
    image?: string;
    video?: string;
    imageFit?: 'cover' | 'contain';
    customVisual?: React.ReactNode;
    tags: string[];
    link: string;
}

export const ShowcasePage: React.FC<ShowcasePageProps> = ({ category }) => {
    const hephaeApps: AppData[] = [
        {
            title: "AI Readiness Quest",
            description: "Assess your business's AI maturity level with our interactive quest. Get a personalized report and badge.",
            customVisual: (
                <div className="w-full h-full flex items-center justify-center bg-slate-50">
                    <div className="text-7xl mb-2 animate-float drop-shadow-lg filter hue-rotate-15">🚀</div>
                </div>
            ),
            tags: ["Assessment", "Strategy", "Gemini Pro"],
            link: process.env.AI_READINESS_QUEST_URL!
        },
        {
            title: "Hephae SEO Audit",
            description: "Deep-dive analysis of your website's SEO performance with actionable AI-driven insights to boost your ranking.",
            customVisual: (
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                    <div className="text-7xl mb-2 animate-pulse drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">🔍</div>
                </div>
            ),
            tags: ["SEO", "Audit", "Analytics"],
            link: "https://seo-audit.hephae.co/"
        },
        {
            title: "Local Foot Traffic Forecaster",
            description: "Analyze and forecast local foot traffic trends to optimize your business operations and marketing.",
            image: "https://storage.googleapis.com/everything-hephae/foot-traffic-logo.svg",
            imageFit: 'contain',
            tags: ["Analytics", "Forecasting", "Data"],
            link: process.env.TRAFFIC_FORECASTER_URL!
        },
        {
            title: "Aetheria: AI Restaurant",
            description: "Experience the future of dining with our AI-powered restaurant demo. Smart menus, reservations, and more.",
            image: "https://storage.googleapis.com/everything-hephae/aetheria-logo.svg",
            imageFit: 'contain',
            tags: ["Demo", "Hospitality", "Interactive"],
            link: process.env.AETHERIA_AI_RESTAURANT_URL!
        }
    ];

    const curatedApps: AppData[] = [
        {
            title: "AI Product Mockup",
            description: "Create stunning product mockups instantly. Upload your design and let Gemini place it in realistic, professional scenes.",
            video: "https://www.gstatic.com/aistudio/starter-apps/thumbnails/product_mockup_viz.mp4",
            tags: ["Gemini 3.0", "Image Generation", "Design"],
            link: process.env.AI_PRODUCT_MOCKUP_URL!
        },
        {
            title: "Marketing Business AI",
            description: "Your expert marketing consultant. Generate comprehensive strategies, ad copy, and content calendars tailored to your business goals.",
            image: "https://roi.dog/_next/image?url=%2Froi%20dog%20logo.jpg&w=96&q=75",
            tags: ["GPT-4o", "Strategy", "Copywriting"],
            link: process.env.MARKETING_BUSINESS_AI_URL!
        }
    ];

    const apps = category === 'hephae' ? hephaeApps : curatedApps;
    const title = category === 'hephae' ? "Hephae Apps" : "Curated Apps";
    const description = category === 'hephae'
        ? "Explore our suite of internal tools and demonstrations designed to showcase the power of Hephae's AI solutions."
        : "A curated collection of custom GPTs and AI prototypes specifically designed to solve real-world challenges for small businesses.";

    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            {/* Optimization Background Animation */}
            <div className="absolute inset-0 z-0">
                <OptimizationBackground />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
                {/* Enable pointer events for content */}
                <div>
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {title}
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {apps.map((app, index) => (
                            <a
                                key={index}
                                href={app.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1 pointer-events-auto"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:opacity-0 transition-opacity duration-300" />
                                    {app.customVisual ? (
                                        app.customVisual
                                    ) : app.video ? (
                                        <video
                                            src={app.video}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <img
                                            src={app.image}
                                            alt={app.title}
                                            className={`w-full h-full object-${app.imageFit || 'cover'} transform group-hover:scale-105 transition-transform duration-500 ${app.imageFit === 'contain' ? 'p-4' : ''}`}
                                            onError={(e) => {
                                                // Fallback gradient if image fails
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-blue-100', 'to-purple-100');
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {app.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {app.title}
                                    </h3>

                                    <p className="text-gray-600 mb-6 flex-grow">
                                        {app.description}
                                    </p>

                                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                                        Launch App <ExternalLink size={16} className="ml-2" />
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
