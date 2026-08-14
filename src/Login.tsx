import React from 'react';

export interface User {
  username: string;
  role: 'ADMIN' | 'BASE_COMMANDER' | 'LOGISTICS_OFFICER';
  baseId: string;
  baseName: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'BASE_COMMANDER' | 'LOGISTICS_OFFICER'>('ADMIN');

  const handleQuickLogin = (role: 'ADMIN' | 'BASE_COMMANDER' | 'LOGISTICS_OFFICER') => {
    let mockUser: User;

    if (role === 'ADMIN') {
      mockUser = { username: 'admin_user', role: 'ADMIN', baseId: 'ALL', baseName: 'All Bases (Global Control)' };
    } else if (role === 'BASE_COMMANDER') {
      mockUser = { username: 'commander_alpha', role: 'BASE_COMMANDER', baseId: '7', baseName: 'Command HQ (New Delhi)' };
    } else {
      mockUser = { username: 'logistics_officer', role: 'LOGISTICS_OFFICER', baseId: 'ALL', baseName: 'Logistics Ops' };
    }

    localStorage.setItem('user', JSON.stringify(mockUser));
    onLogin(mockUser);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', width: '400px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ marginTop: 0, color: '#0f172a', textAlign: 'center' }}>Military Portal Login</h2>
        <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginBottom: '24px' }}>
          Select a role below to simulate Role-Based Access Control (RBAC).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => handleQuickLogin('ADMIN')}
            style={{ padding: '12px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', textAlign: 'left' }}
          >
            🔑 Login as Admin
            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'normal' }}>Full Unrestricted Global Access</div>
          </button>

          <button 
            onClick={() => handleQuickLogin('BASE_COMMANDER')}
            style={{ padding: '12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', textAlign: 'left' }}
          >
            🛡️ Login as Base Commander
            <div style={{ fontSize: '11px', color: '#bfdbfe', fontWeight: 'normal' }}>Scoped strictly to Command HQ (#7)</div>
          </button>

          <button 
            onClick={() => handleQuickLogin('LOGISTICS_OFFICER')}
            style={{ padding: '12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', textAlign: 'left' }}
          >
            📦 Login as Logistics Officer
            <div style={{ fontSize: '11px', color: '#a7f3d0', fontWeight: 'normal' }}>Restricted to Equipment & Movement</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;