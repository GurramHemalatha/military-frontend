import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import BasesTab from './BasesTab';
import EquipmentTab from './EquipmentTab';
import TransfersTab from './TransfersTab';
import Login, { type User } from './Login';
import AuditLogsTab from './AuditLogsTab';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bases' | 'equipment' | 'transfers' | 'audit'>('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <Login onLogin={(user) => setCurrentUser(user)} />;
  }

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '20px' }}>
      
      {/* Top Header Bar with User Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Military Asset Management System</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#fff', padding: '6px 14px', borderRadius: '20px', border: '1px solid #cbd5e1' }}>
          <span style={{ fontSize: '13px', color: '#334155', fontWeight: '600' }}>
            👤 {currentUser.username} <span style={{ color: '#2563eb' }}>({currentUser.role})</span>
          </span>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* RBAC Navigation Tabs */}
      <div style={{ display: 'flex', gap: '20px', borderBottom: '2px solid #cbd5e1', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('dashboard')}
          style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'dashboard' ? '3px solid #2563eb' : 'none', fontWeight: 'bold' }}
        >
          Dashboard
        </button>

        {/* Hide Bases tab for Logistics Officers per RBAC rules */}
        {currentUser.role !== 'LOGISTICS_OFFICER' && (
          <button 
            onClick={() => setActiveTab('bases')}
            style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'bases' ? '3px solid #2563eb' : 'none', fontWeight: 'bold' }}
          >
            Bases
          </button>
        )}

        <button 
          onClick={() => setActiveTab('equipment')}
          style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'equipment' ? '3px solid #2563eb' : 'none', fontWeight: 'bold' }}
        >
          Equipment
        </button>

        <button 
          onClick={() => setActiveTab('transfers')}
          style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'transfers' ? '3px solid #2563eb' : 'none', fontWeight: 'bold' }}
        >
          Transfers
        </button>

        {/* Audit Trail tab (Hidden for Logistics Officer) */}
        {currentUser.role !== 'LOGISTICS_OFFICER' && (
          <button 
            onClick={() => setActiveTab('audit')}
            style={{ padding: '10px 20px', border: 'none', background: 'none', cursor: 'pointer', borderBottom: activeTab === 'audit' ? '3px solid #2563eb' : 'none', fontWeight: 'bold' }}
          >
            Audit Logs
          </button>
        )}
      </div>

      {/* Tab Views */}
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'bases' && <BasesTab />}
      {activeTab === 'equipment' && <EquipmentTab />}
      {activeTab === 'transfers' && <TransfersTab />}
      {activeTab === 'audit' && <AuditLogsTab />}
    </div>
  );
};

export default App;