import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Loader } from 'lucide-react';

interface BlogPost {
    title: string;
    link: string;
    pubDate: string;
    content: string;
    thumbnail: string;
    description: string;
}

export const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    'https://api.rss2json.com/v1/api.json?rss_url=https://hephae.substack.com/feed'
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }

                const data = await response.json();

                if (data.status === 'ok') {
                    setPosts(data.items);
                } else {
                    throw new Error('Failed to parse blog feed');
                }
            } catch (err) {
                console.error('Error fetching blog posts:', err);
                setError('Could not load latest posts. Please check back later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Insights & <span className="text-blue-600">Updates</span>
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        Latest news, tutorials, and success stories from the Hephae ecosystem.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Loader className="animate-spin text-blue-600 mb-4" size={40} />
                        <p className="text-gray-500">Loading latest insights...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
                            <Calendar size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops!</h2>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            {error}
                        </p>
                        <a
                            href="https://hephae.substack.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
                        >
                            <span>Visit our Substack</span>
                            <ArrowRight size={16} />
                        </a>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {posts.map((post, index) => (
                                <a
                                    key={index}
                                    href={post.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
                                >
                                    <div className="h-48 bg-gray-100 overflow-hidden relative">
                                        {post.thumbnail ? (
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                                <Calendar className="text-blue-200" size={48} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-sm">
                                            Substack
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-sm text-gray-400 mb-3">
                                            {formatDate(post.pubDate)}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 mb-4 line-clamp-3 text-sm flex-grow">
                                            {stripHtml(post.description)}
                                        </p>
                                        <div className="flex items-center text-blue-600 font-medium text-sm mt-auto group-hover:translate-x-1 transition-transform">
                                            Read full article <ArrowRight size={16} className="ml-1" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="flex justify-center pb-20">
                            <a
                                href="https://hephae.substack.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
                            >
                                <span>Subscribe on Substack</span>
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
