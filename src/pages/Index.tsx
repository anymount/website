import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/sections/Hero';
import FeaturedGroups from '@/components/sections/FeaturedGroups';
import Categories from '@/components/sections/Categories';
import HowItWorks from '@/components/sections/HowItWorks';
import FeaturesList from '@/components/sections/FeaturesList';
import CallToAction from '@/components/sections/CallToAction';
import AgeVerificationDialog from '@/components/ui/AgeVerificationDialog';
import { createTestNotification } from '@/lib/supabase';

const Index = () => {
  const [showAgeVerification, setShowAgeVerification] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerifiedAge = localStorage.getItem('ageVerified') === 'true';
    if (!hasVerifiedAge) {
      setShowAgeVerification(true);
    }

    // Mostrar notificação de boas-vindas apenas uma vez
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome') === 'true';
    if (!hasSeenWelcome) {
      createTestNotification().then(() => {
        localStorage.setItem('hasSeenWelcome', 'true');
      });
    }
  }, []);

  const handleAgeConfirm = () => {
    localStorage.setItem('ageVerified', 'true');
    setShowAgeVerification(false);
  };

  const handleAgeCancel = () => {
    // In a real implementation, you might redirect to another site
    alert('Este site requer verificação de idade para acesso');
  };

  return (
    <>
      <AgeVerificationDialog 
        open={showAgeVerification} 
        onConfirm={handleAgeConfirm} 
        onCancel={handleAgeCancel} 
      />
      <MainLayout>
        <Hero />
        <FeaturedGroups />
        <Categories />
        <HowItWorks />
        <FeaturesList />
        <CallToAction />
      </MainLayout>
    </>
  );
};

export default Index;
