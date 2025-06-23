import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TechnicianList.css';

const TechnicianList = () => {
  const [technicians, setTechnicians] = useState([]);
  const [region, setRegion] = useState('');
  const [newTechnician, setNewTechnician] = useState({
    name: '',
    skillSet: '',
    region: ''
  });

  const fetchTechnicians = async () => {
    try {
      const url = region 
        ? `/api/technicians/region/${region}` 
        : '/api/technicians';
      const res = await axios.get(url);
      setTechnicians(res.data);
    } catch (err) {
      console.error("Error fetching technicians", err);
      alert("Failed to fetch technicians");
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, [region]);

  const handleAddTechnician = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8090/api/technicians', newTechnician);
      alert('Technician added successfully');
      setNewTechnician({ name: '', skillSet: '', region: '' });
      fetchTechnicians();
    } catch (err) {
      console.error("Error adding technician", err);
      alert('Failed to add technician');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Technician Directory</h2>

      <input 
        type="text" 
        placeholder="Filter by region" 
        value={region}
        onChange={e => setRegion(e.target.value)} 
        className="input"
      />

      <ul className="list">
        {technicians.map(t => (
          <li key={t.technicianId} className="list-item">
            <strong>{t.name}</strong><br />
            Skill: {t.skillSet}<br />
            Region: {t.region}
          </li>
        ))}
      </ul>

      <hr />

      <h3 className="form-title">Add New Technician</h3>
      <form onSubmit={handleAddTechnician}>
        <input 
          type="text" 
          placeholder="Name" 
          value={newTechnician.name}
          onChange={e => setNewTechnician({ ...newTechnician, name: e.target.value })}
          required
          className="input"
        />
        <input 
          type="text" 
          placeholder="Skill Set" 
          value={newTechnician.skillSet}
          onChange={e => setNewTechnician({ ...newTechnician, skillSet: e.target.value })}
          required
          className="input"
        />
        <input 
          type="text" 
          placeholder="Region" 
          value={newTechnician.region}
          onChange={e => setNewTechnician({ ...newTechnician, region: e.target.value })}
          required
          className="input"
        />
        <button type="submit" className="button">Add Technician</button>
      </form>
    </div>
  );
};

export default TechnicianList;
