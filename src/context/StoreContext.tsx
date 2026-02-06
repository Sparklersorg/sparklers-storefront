
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface SocialMedia {
  youtube?: string;
  instagram?: string;
  whatsapp?: string;
}

interface BannerStyles extends React.CSSProperties {}

export interface StoreDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  websiteUrl?: string;
  pageTitle?: string;
  bannerImage?: string;
  bannerText?: string;
  bannerSubtext?: string;
  banner_text_styles?: BannerStyles;
  banner_subtext_styles?: BannerStyles;
  banner_design?: any;
  primaryColor: string;
  secondaryColor: string;
  videoSection?: string;
  showVideoSection: boolean;
  brandText?: string;
  isOffer: boolean;
  offerText?: string;
  offerCondition?: number;
  discountText?: string;
  minimumPurchase: number;
  percentage?: number;
  socialMedia: SocialMedia;
}

interface StoreContextType {
  store: StoreDetails | null;
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<StoreDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        
        // For development, you might want to use a fallback store ID or domain
        const domain = isLocalhost ? 'localhost' : hostname;
        
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/v1/frontend/store/details?domain=${domain}`);
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        setStore(result.data);
      } catch (err: any) {
        console.error('Failed to fetch store details:', err);
        setError(err.message);
        
        // Fallback for demo/dev
        setStore({
            id: 'demo-store',
            name: 'GARUDA CRACKERS',
            email: 'demo@example.com',
            phone: '1234567890',
            primaryColor: '#3B82F6',
            secondaryColor: '#1F2937',
            showVideoSection: false,
            isOffer: true,
            percentage: 70,
            minimumPurchase: 0,
            socialMedia: {},
            bannerText: 'Celebrate 2025 Diwali with',
            bannerSubtext: 'GARUDA CRACKERS'
        } as StoreDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, []);

  return (
    <StoreContext.Provider value={{ store, loading, error }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
