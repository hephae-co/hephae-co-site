import { LucideIcon } from 'lucide-react';

export enum ServiceType {
  CONSULT = 'CONSULT',
  ASSESSMENT = 'ASSESSMENT',
  PROTOTYPE = 'PROTOTYPE'
}

export interface ServiceFeature {
  text: string;
  included: boolean;
}

export interface ServiceTier {
  id: ServiceType;
  title: string;
  subtitle: string;
  price: string;
  priceDetail?: string;
  description: string;
  features: ServiceFeature[];
  buttonText: string;
  icon: LucideIcon;
  isPopular?: boolean;
  isComingSoon?: boolean;
  accentColor: string;
}