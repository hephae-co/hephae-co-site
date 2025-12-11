import React from 'react';
import { ServiceTier } from '../types';
import { Check, Info } from 'lucide-react';

interface PricingCardProps {
  tier: ServiceTier;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  const Icon = tier.icon;

  return (
    <div 
      className={`
        relative flex flex-col p-8 rounded-3xl bg-white border transition-all duration-300 h-full
        ${tier.isPopular ? 'border-blue-200 shadow-xl scale-100 md:scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1'}
        ${tier.isComingSoon ? 'opacity-90' : ''}
      `}
    >
      {tier.isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Most Popular
          </span>
        </div>
      )}

      {tier.isComingSoon && (
        <div className="absolute top-4 right-4">
          <span className="bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full border border-gray-200">
            Coming Soon
          </span>
        </div>
      )}

      <div className="mb-6">
        <div className={`p-3 rounded-2xl w-fit mb-4 bg-gray-50 ${tier.accentColor}`}>
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{tier.title}</h3>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{tier.subtitle}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-semibold text-gray-500 tracking-tight">{tier.price}</span>
          {tier.priceDetail && <span className="ml-2 text-gray-500 font-medium">{tier.priceDetail}</span>}
        </div>
        <p className="mt-4 text-gray-600 leading-relaxed text-sm">
          {tier.description}
        </p>
      </div>

      <div className="flex-grow mb-8">
        <ul className="space-y-4">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-300'}`}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className={`ml-3 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {tier.id === 'ASSESSMENT' && (
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Info size={14} />
          <span>Tools + Consultant Hybrid Model</span>
        </div>
      )}
    </div>
  );
};