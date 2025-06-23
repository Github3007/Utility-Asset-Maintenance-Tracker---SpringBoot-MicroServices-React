import React, { useState } from 'react';
import { createMaintenancePlan } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddMaintenancePlan = () => {
  const [assetId, setAssetId] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plan = { assetId, frequency };

    try {
      await createMaintenancePlan(plan, assetId);
      setError('');
      navigate('/maintenance');
    } catch (err) {
      if (err.response || err.response.status === '404') {
        setError('Asset not found. Please enter a valid Asset ID.');
      } else {
        setError('An error occurred while creating the plan.');
      }
    }
  };

  return (
    <div className="container">
      <h2>Create Maintenance Plan</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Asset ID:</label>
          <input
            type="number"
            className="form-control"
            value={assetId}
            onChange={(e) => setAssetId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Frequency:</label>
          <input
            type="text"
            className="form-control"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default AddMaintenancePlan;
