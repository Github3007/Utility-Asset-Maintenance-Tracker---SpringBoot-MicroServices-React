import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const Tasklist = () => {
  const { planId } = useParams();
  const [taskList, setTaskList] = useState([]);
  const [description, setDescription] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchTasks();
  }, [planId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/api/maintenance-plans/tasks/${planId}`);
      setTaskList(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Could not load tasks.');
    }
  };

  const insertTasks = async (e) => {
    e.preventDefault();
    const task = { description, estimatedHours };

    try {
      await axios.post(`http://localhost:8090/api/maintenance-plans/tasks/${planId}`, task);
      setDescription('');
      setEstimatedHours('');
      setSuccess('Task added successfully.');
      setError('');
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Failed to add task.');
      setSuccess('');
    }
  };

  const handleUpdate = async (taskId) => {
    // You can navigate to an update form or open a modal
    navigate(`/update-task/${taskId}`);

  };
  
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8090/api/maintenance-plans/tasks/delete/${taskId}`);
      setSuccess('Task deleted successfully.');
      setError('');
      fetchTasks(); // Refresh list
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task.');
      setSuccess('');
    }
  };
  

  return (
    <div className="container">
      <h2>Tasks for Maintenance Plan ID: {planId}</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estimated Hours:</label>
          <input
            type="number"
            className="form-control"
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={insertTasks}>Add Task</button>
      </form>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Plan ID</th>
            <th>Description</th>
            <th>Estimated Hours</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {taskList.map(task => (
            <tr key={task.taskId}>
              <td>{planId}</td>
              <td>{task.description}</td>
              <td>{task.estimatedHours}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleUpdate(task.taskId)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task.taskId)}>Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasklist;
