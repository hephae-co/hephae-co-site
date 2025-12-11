import React, { useState, useEffect } from 'react';
import { NeuralBackground } from './NeuralBackground';
import { Footer } from './Footer';
import { ArrowLeft, Send, CheckCircle, Mail, MessageSquare, AlertCircle, Briefcase } from 'lucide-react';
import { SERVICE_TIERS } from '../constants';

interface SchedulePageProps {
  onBack: () => void;
  initialService?: string;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onBack, initialService }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [service, setService] = useState(initialService || 'General Inquiry');
  const [errorMessage, setErrorMessage] = useState('');

  // Update service if initialService prop changes
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
  }, [initialService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const formData = new FormData();
    // Web3Forms Access Key
    formData.append("access_key", "a862f72e-99fe-4e60-9fdf-b61a5eb4c5b9");

    formData.append("email", email);
    formData.append("service_interest", service);
    formData.append("message", message || "No message provided");
    formData.append("subject", `New Lead: ${service}`);
    formData.append("from_name", "Hephae Website");
    // Honeypot field for spam protection
    formData.append("botcheck", "");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState('success');
        setEmail('');
        setMessage('');
      } else {
        setFormState('error');
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setFormState('error');
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden flex flex-col">
      {/* Neural Background Layer */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground />
      </div>

      {/* Navigation / Header */}
      <div className="relative z-20 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <div className="p-2 rounded-full bg-white/50 border border-gray-200 group-hover:border-blue-200 transition-all">
            <ArrowLeft size={20} />
          </div>
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <img
            src="https://insights.ai.hephae.co/hephae_logo_blue.png"
            alt="Hephae.co"
            className="h-8 w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg">

          <div className={`bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-8 md:p-12 transition-all duration-500 ${formState === 'success' ? 'scale-95 opacity-0 absolute pointer-events-none' : 'scale-100 opacity-100'}`}>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">Let's Connect</h2>
              <p className="text-gray-500">
                Ready to transform your business? Select a service and tell us about your needs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <Briefcase size={16} className="text-gray-500" /> Service Interest
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-gray-900 appearance-none"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    {SERVICE_TIERS.map(tier => (
                      <option key={tier.id} value={tier.title}>
                        {tier.title}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <Mail size={16} className="text-blue-500" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-gray-300 text-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700 ml-1 flex items-center gap-2">
                  <MessageSquare size={16} className="text-purple-500" /> Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your challenges or specify a preferred time..."
                  className="w-full px-5 py-4 rounded-xl bg-white border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-gray-300 text-gray-900 resize-none"
                />
              </div>

              {formState === 'error' && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <>
                    Send Request <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Success State */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg text-center transition-all duration-500 ${formState === 'success' ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}>
            <div className="bg-white/80 backdrop-blur-xl border border-green-100 shadow-[0_20px_60px_rgba(0,255,100,0.15)] rounded-3xl p-12">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Request Received!</h3>
              <p className="text-gray-600 mb-8">
                Thanks for reaching out about our <strong>{service}</strong>. We've received your details and will be in touch shortly.
              </p>
              <button
                onClick={onBack}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full font-medium transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};