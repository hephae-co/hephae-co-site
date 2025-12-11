import { ServiceTier, ServiceType } from './types';
import { Lightbulb, BarChart3, Rocket } from 'lucide-react';

export const SERVICE_TIERS: ServiceTier[] = [
  {
    id: ServiceType.CONSULT,
    title: "AI Quick Start",
    subtitle: "30 Minutes to Clarity",
    price: "Free",
    description: "Find your fastest path to AI benefit.",
    features: [
      { text: "Expert Brainstorm Session", included: true },
      { text: "GenAI Opportunity Mapping", included: true },
      { text: "Actionable Next Steps", included: true },
    ],
    buttonText: "Schedule Free Call",
    icon: Lightbulb,
    accentColor: "text-blue-600",
    isPopular: true,
  },
  {
    id: ServiceType.ASSESSMENT,
    title: "AI Intelligence Audit",
    subtitle: "Your Business, Through an AI Lens",
    price: "Free",
    description: "Proprietary tools analyze readiness, competitors, and market sentiment.",
    features: [
      { text: "AI Readiness Diagnostic", included: true },
      { text: "Competitor & Sentiment Analysis", included: true },
      { text: "Expert Consultant Review", included: true },
      { text: "Workflow Optimization Report", included: true },
      { text: "ROI Projection", included: true },
    ],
    buttonText: "Join Waitlist",
    icon: BarChart3,
    accentColor: "text-purple-600",
  },
  {
    id: ServiceType.PROTOTYPE,
    title: "AI Proof-of-Action",
    subtitle: "From Idea to Integration",
    price: "Custom",
    description: "Rapidly build, test, and validate a custom AI workflow.",
    features: [
      { text: "Proof of Concept (POC) Build", included: true },
      { text: "GenAI Integration & Validation", included: true },
      { text: "Quick Turnaround Prototype", included: true },
      { text: "Deployment Support", included: true },
    ],
    buttonText: "Schedule a Call",
    icon: Rocket,
    accentColor: "text-orange-600",
  }
];