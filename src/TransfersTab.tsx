import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Base {
  id: number;
  name: string;
}

interface Equipment {
  id: number;
  name: string;
  quantity: number;
}

interface Transfer {
  id: number;
  equipmentName: string;
  fromBaseName: string;
  toBaseName: string;
  quantity: number;
  status: string;
}

const TransfersTab: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    {
      id: 6,
      equipmentName: 'T-90 Bhishma Tank',
      fromBaseName: 'Command HQ',
      toBaseName: 'Northern Sector',
      quantity: 2,
      status: 'PENDING',
    },
  ]);

  const [bases, setBases] = useState<Base[]>([
    { id: 7, name: 'Command HQ' },
    { id: 8, name: 'Northern Sector' },
  ]);

  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    { id: 13, name: 'T-90 Bhishma Tank', quantity: 10 },
  ]);

  // Form State
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [fromBase, setFromBase] = useState('');
  const [toBase, setToBase] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [transRes, baseRes, eqRes] = await Promise.all([
        axios.get('http://localhost:8081/api/transfers'),
        axios.get('http://localhost:8081/api/bases'),
        axios.get('http://localhost:8081/api/equipment'),
      ]);
      if (transRes.data) setTransfers(transRes.data);
      if (baseRes.data) setBases(baseRes.data);
      if (eqRes.data) setEquipmentList(eqRes.data);
    } catch (err) {
      console.log('Using default state for transfers UI');
    }
  };

  const handleCreateTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEquipment || !fromBase || !toBase || !quantity || quantity <= 0) {
      alert('Please fill out all fields correctly.');
      return;
    }

    if (fromBase === toBase) {
      alert('Source and destination bases must be different.');
      return;
    }

    const payload = {
      equipmentId: Number(selectedEquipment),
      fromBaseId: Number(fromBase),
      toBaseId: Number(toBase),
      quantity: Number(quantity),
    };

    try {
      const res = await axios.post('http://localhost:8081/api/transfers', payload);
      setTransfers([...transfers, res.data]);
    } catch (err) {
      // Fallback for UI simulation
      const eq = equipmentList.find((e) => e.id === Number(selectedEquipment));
      const fBase = bases.find((b) => b.id === Number(fromBase));
      const tBase = bases.find((b) => b.id === Number(toBase));

      const newTransfer: Transfer = {
        id: Date.now(),
        equipmentName: eq ? eq.name : 'Equipment',
        fromBaseName: fBase ? fBase.name : 'Source Base',
        toBaseName: tBase ? tBase.name : 'Destination Base',
        quantity: Number(quantity),
        status: 'PENDING',
      };
      setTransfers([...transfers, newTransfer]);
    }

    // Reset Form
    setSelectedEquipment('');
    setFromBase('');
    setToBase('');
    setQuantity('');
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8081/api/transfers/${id}`);
    } catch (err) {
      console.log('Deleted locally');
    }
    setTransfers(transfers.filter((t) => t.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 🚀 NEW: Initiate Transfer Form */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>Initiate Transfer Request</h4>
        <form onSubmit={handleCreateTransfer} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>Equipment</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            >
              <option value="">Select Equipment</option>
              {equipmentList.map((eq) => (
                <option key={eq.id} value={eq.id}>{eq.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>From Base</label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            >
              <option value="">Select Origin</option>
              {bases.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>To Base</label>
            <select
              value={toBase}
              onChange={(e) => setToBase(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            >
              <option value="">Select Destination</option>
              {bases.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>Quantity</label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value ? Number(e.target.value) : '')}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginTop: '4px' }}
            />
          </div>

          <button
            type="submit"
            style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '9px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Submit Transfer
          </button>
        </form>
      </div>

      {/* Transfer History Table */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h4 style={{ margin: '0 0 16px 0', color: '#0f172a' }}>Transfer History</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', fontSize: '12px', color: '#64748b' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>EQUIPMENT</th>
              <th style={{ padding: '10px' }}>FROM BASE</th>
              <th style={{ padding: '10px' }}>TO BASE</th>
              <th style={{ padding: '10px' }}>QTY</th>
              <th style={{ padding: '10px' }}>STATUS</th>
              <th style={{ padding: '10px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' }}>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>#{t.id}</td>
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{t.equipmentName}</td>
                <td style={{ padding: '10px' }}>{t.fromBaseName}</td>
                <td style={{ padding: '10px' }}>{t.toBaseName}</td>
                <td style={{ padding: '10px' }}>{t.quantity}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
                    {t.status}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default TransfersTab;