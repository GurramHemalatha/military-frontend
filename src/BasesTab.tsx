import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Define Base Interface
interface Base {
  id: number;
  name: string;
  location: string;
}

const BasesTab: React.FC = () => {
  // 2. Type state explicitly as Base[]
  const [bases, setBases] = useState<Base[]>([]);
  const [formData, setFormData] = useState({ name: '', location: '' });

  const fetchBases = async () => {
    try {
      const res = await axios.get<Base[]>('http://localhost:8081/api/bases');
      setBases(res.data);
    } catch (err) {
      console.error('Error fetching bases:', err);
    }
  };

  useEffect(() => {
    fetchBases();
  }, []);

  // 3. Type event parameters
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/bases', formData);
      setFormData({ name: '', location: '' });
      fetchBases();
    } catch (err) {
      console.error('Error adding base:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this base?')) {
      try {
        await axios.delete(`http://localhost:8081/api/bases/${id}`);
        fetchBases();
      } catch (err) {
        console.error('Error deleting base:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Add New Base Form */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px', color: '#1e293b' }}>Add New Base</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Base Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g. Southern Command" 
              value={formData.name} 
              onChange={handleChange}
              required 
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' }}>Location</label>
            <input 
              type="text" 
              name="location"
              placeholder="e.g. Pune" 
              value={formData.location} 
              onChange={handleChange}
              required 
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
            />
          </div>
          <button type="submit" style={{ backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Add Base
          </button>
        </form>
      </div>

      {/* Bases Directory Table */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px', color: '#1e293b' }}>Bases Directory</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>ID</th>
              <th style={{ padding: '12px 16px' }}>BASE NAME</th>
              <th style={{ padding: '12px 16px' }}>LOCATION</th>
              <th style={{ padding: '12px 16px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {bases.map((base) => (
              <tr key={base.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', color: '#64748b', fontSize: '14px' }}>#{base.id}</td>
                <td style={{ padding: '16px', fontWeight: '600', color: '#0f172a', fontSize: '14px' }}>{base.name}</td>
                <td style={{ padding: '16px', color: '#334155', fontSize: '14px' }}>{base.location}</td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => handleDelete(base.id)}
                    style={{ backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}
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

export default BasesTab;