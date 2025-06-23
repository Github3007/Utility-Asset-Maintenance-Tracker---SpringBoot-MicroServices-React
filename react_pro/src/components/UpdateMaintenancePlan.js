import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateMaintenancePlan, getAllMaintenancePlans } from '../services/api';

const UpdateMaintenancePlan = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assetId: '',
    frequency: ''
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getAllMaintenancePlans();
        const plan = res.data.find(p => p.planId === parseInt(planId));
        if (plan) {
          setFormData({
            assetId: plan.assetId,
            frequency: plan.frequency
          });
        }
      } catch (error) {
        console.error('Error fetching plan:', error);
      }
    };

    fetchPlan();
  }, [planId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMaintenancePlan(planId, formData);
      navigate('/maintenance');
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  return (
    <div className="container">
      <h2>Update Maintenance Plan</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Asset ID</label>
          <input
            type="text"
            name="assetId"
            value={formData.assetId}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Frequency</label>
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success" onClick={()=>navigate(`/maintenance`)}>Update Plan</button>
      </form>
    </div>
  );
};

export default UpdateMaintenancePlan;
