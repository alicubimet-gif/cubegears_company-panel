import React, { useState, useEffect } from 'react';
import { MobileTabRail } from '../../components/common/MobileTabRail';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';
import { Globe, Image, Star, Eye } from 'lucide-react';
import { getWebsiteConfig } from '../../services/website.service';

export const Website = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getWebsiteConfig();
      setConfig(res);
      setLoading(false);
    };
    load();
  }, []);

  const tabs = [
    { id: 'profile', label: 'Business Profile', icon: Globe },
    { id: 'content', label: 'Home Content' },
    { id: 'services', label: 'Services & Packages' },
    { id: 'gallery', label: 'Gallery & Media', icon: Image },
    { id: 'enquiries', label: 'Bookings & Enquiries' }
  ];

  if (loading) return <Loader />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#f8fafc', margin: 0 }}>Company Website Manager</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '4px 0 0 0' }}>Configure public landing site, online bookings, and customer portal.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm" onClick={() => window.open('http://localhost:5173', '_blank')}>
            <Eye size={16} /> Live Preview
          </Button>
          <Button variant="primary" size="sm">Publish Site</Button>
        </div>
      </div>

      <MobileTabRail tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'profile' && (
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px', maxWidth: '700px' }}>
          <h3 style={{ color: '#f8fafc', marginBottom: '16px' }}>Public Website Branding</h3>
          <Input label="Homepage Hero Title" defaultValue={config?.profile?.heroTitle} />
          <Input label="Homepage Subtitle" defaultValue={config?.profile?.heroSubtitle} />
          <Input label="Workshop Address" defaultValue={config?.profile?.address} />
          <Input label="Public Support Phone" defaultValue={config?.profile?.phone} />
          <Button variant="primary">Save Changes</Button>
        </div>
      )}

      {activeTab === 'enquiries' && (
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', color: '#fff' }}>
          Recent Online Appointment Enquiries (2 Pending Review)
        </div>
      )}
    </div>
  );
};
