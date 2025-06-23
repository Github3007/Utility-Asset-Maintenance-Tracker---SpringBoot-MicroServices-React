import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    estimatedHours: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:8090/api/maintenance-plans/tasks/${taskId}`);
        setFormData({
          description: res.data.description,
          estimatedHours: res.data.estimatedHours
        });
      } catch (err) {
        console.error('Error fetching task:', err);
        setMessage('Failed to load task details.');
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8090/api/maintenance-plans/tasks/${taskId}`, formData);
      setMessage('Task updated successfully.');
      setTimeout(() => navigate(-1), 1500); // Go back after success
    } catch (err) {
      console.error('Error updating task:', err);
      setMessage('Failed to update task.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Task</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
           />
           </div>
        <div className="mb-3">
          <label>Estimated Hours</label>
          <input
            type="number"
            name="estimatedHours"
            className="form-control"
            value={formData.estimatedHours}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">Update Task</button>
      </form>
    </div>
    
  );
};

export default UpdateTask;
