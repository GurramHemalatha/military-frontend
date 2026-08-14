import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DashboardMetrics {
  openingBalance: number;
  purchases: number;
  transfersIn: number;
  transfersOut: number;
  netMovement: number;
  assigned: number;
  expended: number;
  closingBalance: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    openingBalance: 1200,
    purchases: 300,
    transfersIn: 150,
    transfersOut: 80,
    netMovement: 370, // 300 + 150 - 80
    assigned: 250,
    expended: 120,
    closingBalance: 1200 + 370 - 250 - 120, // 1200 + 370 - 250 - 120 = 1200
  });

  const [selectedBase, setSelectedBase] = useState<string>('ALL');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Optional: Fetch live metrics from Spring Boot backend when endpoint is ready
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get<DashboardMetrics>(`http://localhost:8081/api/dashboard/metrics?baseId=${selectedBase}`);
        setMetrics(res.data);
      } catch (err) {
        // Fallback to local calculated metrics if backend endpoint isn't wired yet
        console.log('Using default metric views');
      }
    };
    fetchMetrics();
  }, [selectedBase]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header & Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Executive Asset Overview</h2>
        
        <div>
          <label style={{ fontSize: '14px', fontWeight: '600', marginRight: '8px', color: '#475569' }}>Filter Base:</label>
          <select 
            value={selectedBase} 
            onChange={(e) => setSelectedBase(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '14px' }}
          >
            <option value="ALL">All Bases (Global View)</option>
            <option value="7">Command HQ (New Delhi)</option>
            <option value="8">Northern Sector (Leh)</option>
          </select>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Opening Balance */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #3b82f6', border: '1px solid #e2e8f0', borderLeftWidth: '5px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Opening Balance</span>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0', color: '#0f172a' }}>{metrics.openingBalance}</h3>
        </div>

        {/* Net Movement Card (Clickable) */}
        <div 
          onClick={() => setShowModal(true)}
          style={{ 
            backgroundColor: '#f0fdf4', 
            padding: '20px', 
            borderRadius: '10px', 
            border: '1px solid #bbf7d0', 
            borderLeft: '5px solid #16a34a', 
            cursor: 'pointer',
            transition: 'transform 0.1s ease-in-out'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#15803d', textTransform: 'uppercase' }}>Net Movement</span>
            <span style={{ fontSize: '11px', backgroundColor: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>Click Details</span>
          </div>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0', color: '#15803d' }}>
            {metrics.netMovement >= 0 ? `+${metrics.netMovement}` : metrics.netMovement}
          </h3>
        </div>

        {/* Assigned Card */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #eab308', border: '1px solid #e2e8f0', borderLeftWidth: '5px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Assigned</span>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0', color: '#0f172a' }}>{metrics.assigned}</h3>
        </div>

        {/* Expended Card */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #ef4444', border: '1px solid #e2e8f0', borderLeftWidth: '5px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Expended</span>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0', color: '#0f172a' }}>{metrics.expended}</h3>
        </div>

        {/* Closing Balance Card */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', color: '#fff' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Closing Balance</span>
          <h3 style={{ fontSize: '28px', margin: '8px 0 0 0', color: '#38bdf8' }}>{metrics.closingBalance}</h3>
        </div>

      </div>

      {/* Formula Explanation Banner */}
      <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', fontSize: '13px', color: '#475569' }}>
        <strong>System Accounting Model:</strong> 
        <code style={{ background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>
          Closing Balance = Opening ({metrics.openingBalance}) + Net Movement ({metrics.netMovement}) - Assigned ({metrics.assigned}) - Expended ({metrics.expended}) = {metrics.closingBalance}
        </code>
      </div>

      {/* Net Movement Detail Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', width: '420px', borderRadius: '12px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>Net Movement Breakdown</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#475569' }}>Purchases (+):</span>
                <span style={{ fontWeight: 'bold', color: '#0f172a' }}>+{metrics.purchases}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#475569' }}>Transfers In (+):</span>
                <span style={{ fontWeight: 'bold', color: '#16a34a' }}>+{metrics.transfersIn}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#475569' }}>Transfers Out (-):</span>
                <span style={{ fontWeight: 'bold', color: '#dc2626' }}>-{metrics.transfersOut}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold' }}>
                <span style={{ color: '#0f172a' }}>Total Net Movement:</span>
                <span style={{ color: '#16a34a' }}>+{metrics.netMovement}</span>
              </div>
            </div>

            <button 
              onClick={() => setShowModal(false)}
              style={{ width: '100%', backgroundColor: '#0f172a', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;