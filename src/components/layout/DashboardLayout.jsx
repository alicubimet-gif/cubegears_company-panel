import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="app-shell">
      {/* Desktop Independent Left Sidebar */}
      <Sidebar />

      {/* Main Canvas Area */}
      <div className="main-area">
        <Header />

        {/* Independent Scrollable Main Content Area */}
        <main className="main-content scroll-hidden" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            {children}
          </div>
          <Footer />
        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
