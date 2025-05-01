import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import TawkToChat from '../chat/TawkToChat';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-adult-dark">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <TawkToChat />
    </div>
  );
};

export default MainLayout;
