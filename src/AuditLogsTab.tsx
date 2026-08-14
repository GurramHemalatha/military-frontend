import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AuditLog {
  id: number;
  userId: number;
  action: string;
  details: string;
  createdAt: string;
}

const AuditLogsTab: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: 1,
      userId: 101,
      action: 'PURCHASE',
      details: 'Added 50x INSAS Rifles to Command HQ',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 2,
      userId: 102,
      action: 'TRANSFER',
      details: 'Transferred 20x Vehicles from HQ to Leh Base',
      createdAt: new Date().toLocaleString(),
    },
    {
      id: 3,
      userId: 101,
      action: 'EXPENDITURE',
      details: 'Logged 100x 5.56mm Ammo expended in training exercise',
      createdAt: new Date().toLocaleString(),
    },
  ]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get<AuditLog[]>('http://localhost:8081/api/audit-logs');
        if (res.data && res.data.length > 0) {
          setLogs(res.data);
        }
      } catch (err) {
        console.log('Using default system audit records');
      }
    };
    fetchLogs();
  }, []);

  const getBadgeStyle = (action: string) => {
    switch (action) {
      case 'PURCHASE':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'TRANSFER':
        return { backgroundColor: '#dbeafe', color: '#1e40af' };
      case 'EXPENDITURE':
        return { backgroundColor: '#fee2e2', color: '#991b1b' };
      default:
        return { backgroundColor: '#f1f5f9', color: '#334155' };
    }
  };

  return (
    <div style={{ padding: '10px 0' }}>
      <h3 style={{ color: '#0f172a', marginBottom: '16px' }}>System Audit Trail</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>
            <th style={{ padding: '12px 16px' }}>Log ID</th>
            <th style={{ padding: '12px 16px' }}>Action Type</th>
            <th style={{ padding: '12px 16px' }}>User ID</th>
            <th style={{ padding: '12px 16px' }}>Details</th>
            <th style={{ padding: '12px 16px' }}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
              <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>#{log.id}</td>
              <td style={{ padding: '12px 16px' }}>
                <span style={{ ...getBadgeStyle(log.action), padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                  {log.action}
                </span>
              </td>
              <td style={{ padding: '12px 16px' }}>User #{log.userId}</td>
              <td style={{ padding: '12px 16px' }}>{log.details}</td>
              <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '13px' }}>{log.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogsTab;