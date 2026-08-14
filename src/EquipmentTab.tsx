import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Base {
  id: number;
  name: string;
}

interface Equipment {
  id: number;
  name: string;
  category: string;
  quantity: number;
  base?: Base;
}

const EquipmentTab: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [formData, setFormData] = useState({ name: '', category: '', quantity: '', baseId: '' });

  const fetchData = async () => {
    try {
      const [eqRes, baseRes] = await Promise.all([
        axios.get<Equipment[]>('http://localhost:8081/api/equipment'),
        axios.get<Base[]>('http://localhost:8081/api/bases')
      ]);
      setEquipmentList(eqRes.data);
      setBases(baseRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/equipment', {
        ...formData,
        quantity: parseInt(formData.quantity)
      });
      setFormData({ name: '', category: '', quantity: '', baseId: '' });
      fetchData();
    } catch (err) {
      console.error('Error adding equipment:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this equipment item?')) {
      try {
        await axios.delete(`http://localhost:8081/api/equipment/${id}`);
        fetchData();
      } catch (err) {
        console.error('Error deleting equipment:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Add Equipment</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Assigned Base</label>
            <select name="baseId" value={formData.baseId} onChange={handleChange} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <option value="">Select Base</option>
              {bases.map(b => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
            Add Equipment
          </button>
        </form>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Equipment Inventory</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>NAME</th>
              <th style={{ padding: '12px' }}>CATEGORY</th>
              <th style={{ padding: '12px' }}>QTY</th>
              <th style={{ padding: '12px' }}>BASE</th>
              <th style={{ padding: '12px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {equipmentList.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px' }}>#{item.id}</td>
                <td style={{ padding: '12px', fontWeight: '600' }}>{item.name}</td>
                <td style={{ padding: '12px' }}>{item.category}</td>
                <td style={{ padding: '12px' }}>{item.quantity}</td>
                <td style={{ padding: '12px' }}>{item.base ? item.base.name : 'N/A'}</td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
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

export default EquipmentTab;