import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Footer } from './Footer';
import { GuidancePageAction } from '../../guidance/GuidancePageAction';
import { GuidanceWindow } from '../../guidance/GuidanceWindow';
import { DemoModeBanner } from '../../guidance/DemoModeBanner';

export const DashboardLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Header />

        <main className="main-content scroll-hidden" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <DemoModeBanner />
            <GuidancePageAction />
            {children}
          </div>
          <Footer />
        </main>
      </div>

      <MobileBottomNav />
      <GuidanceWindow />
    </div>
  );
};
