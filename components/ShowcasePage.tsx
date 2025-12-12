import React from 'react';
import { ExternalLink } from 'lucide-react';
import { NeuralBackground } from './NeuralBackground';

export const ShowcasePage: React.FC = () => {
    const apps = [
        {
            title: "AI Readiness Quest",
            description: "Test your business's AI readiness with this interactive quest. Survive the week as a boss facing AI challenges!",
            image: "https://insights.ai.hephae.co/product_mockup_thumbnail.png", // Keeping existing thumbnail for now
            tags: ["Assessment", "Interactive Game"],
            link: "https://ai-readiness-quest-1096334123076.us-west1.run.app"
        },
        {
            title: "Aetheria: The AI-Powered Restaurant",
            description: "Experience the future of dining with Aetheria. An AI-powered restaurant concept demonstrating generative AI in hospitality.",
            image: "https://insights.ai.hephae.co/marketing_ai_thumbnail.png", // Keeping existing thumbnail for now
            tags: ["Hospitality", "Demo"],
            link: "https://aetheria-the-ai-powered-restaurant-1096334123076.us-west1.run.app"
        }
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
            {/* Neural Background Animation */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <NeuralBackground />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Showcase Apps
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our collection of AI-powered applications designed to demonstrate the capabilities of modern generative models.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {apps.map((app, index) => (
                        <a
                            key={index}
                            href={app.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:opacity-0 transition-opacity duration-300" />
                                <img
                                    src={app.image}
                                    alt={app.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        // Fallback gradient if image fails
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-blue-100', 'to-purple-100');
                                    }}
                                />
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
    );
};
