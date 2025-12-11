import React from 'react';
import { NeuralBackground } from './NeuralBackground';
import { ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Background - Fixed */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground />
      </div>
      
      {/* Navigation */}
      <div className="relative z-20 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
           <img 
              src="https://insights.ai.hephae.co/hephae_logo_blue.png" 
              alt="Hephae.co" 
              className="h-6 w-auto object-contain" 
            />
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-20">
         <div className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              <span className="animate-gradient-text">Meet the Founders</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
               The Architects of Simple, Powerful Technology.
            </p>
         </div>

         {/* Founders Illustration */}
         <div className="flex justify-center mb-16 relative">
            <img 
              src="https://storage.googleapis.com/everything-hephae/Gemini_Generated_Image_cr1eiocr1eiocr1e.png"
              alt="Founders Sarthak and Chris" 
              className="w-full max-w-3xl h-auto object-contain mix-blend-multiply drop-shadow-xl transition-transform duration-500 hover:scale-[1.02] rounded-xl"
            />
         </div>

         <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Sarthak */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
               <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-blue-50 border-4 border-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                     🔭
                  </div>
                  <h3 className="text-3xl font-bold font-display text-gray-900">Sarthak</h3>
                  <p className="text-blue-600 font-medium tracking-wide uppercase text-sm mt-1">The Architect of Simplicity</p>
               </div>
               
               <div className="space-y-6">
                  <div>
                     <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-lg">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> His Superpower:
                     </h4>
                     <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-blue-100">
                        Turning chaos into clarity. Sarthak spent years building and scaling massive teams and products across leading Silicon Valley startups and high-tech companies. He doesn't just know AI; he knows how to make it <em>work</em> at scale.
                     </p>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-lg">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> His Mission:
                     </h4>
                     <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-blue-100">
                        To take the 80,000-foot strategic vision of AI and boil it down to: <em>What is the one thing your business should automate today?</em> He cuts through the hype to find the profit.
                     </p>
                  </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-gray-100 flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold tracking-wide">#AI_Strategy</span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold tracking-wide">#Scaling_Expert</span>
               </div>
            </div>

            {/* Chris */}
            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-green-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
               <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-green-50 border-4 border-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                     ⚙️
                  </div>
                  <h3 className="text-3xl font-bold font-display text-gray-900">Chris</h3>
                  <p className="text-green-600 font-medium tracking-wide uppercase text-sm mt-1">The Engine Room</p>
               </div>
               
               <div className="space-y-6">
                  <div>
                     <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-lg">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> His Superpower:
                     </h4>
                     <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-green-100">
                        Data and Systems. Chris's background in complex engineering across Silicon Valley startups and high-tech companies, focusing on IoT, data systems, and security, means he knows exactly how to build and integrate robust technology solutions that won't break on a Monday morning.
                     </p>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-lg">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> His Mission:
                     </h4>
                     <p className="text-gray-600 leading-relaxed pl-4 border-l-2 border-green-100">
                         To ensure that the "easy" AI solution we propose is also the <em>right</em> AI solution—stable, secure, and ready to handle real-world business data. He's the one making sure the plumbing works perfectly.
                     </p>
                  </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-gray-100 flex gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-wide">#Data_Integrity</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold tracking-wide">#System_Expert</span>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};