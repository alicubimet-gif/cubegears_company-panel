import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('admin@cubixgear.com');
  const [password, setPassword] = useState('password123');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '32px', borderRadius: '12px', border: '1px solid #334155', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#f8fafc', margin: '0 0 8px 0' }}>Welcome to CubixGear</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>Sign in to manage your company portal</p>
        
        <form onSubmit={handleSubmit}>
          <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '12px' }}>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};
