import React, { useState } from 'react';
import axios from 'axios';


const AssignmentList = () => {
  const [assignments, setAssignments] = useState([]);
  const [techId, setTechId] = useState('');
  const [message, setMessage] = useState('');

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`/api/technicians/assignments`, {
        params: { technicianId: techId }
      });

      if (res.data.length === 0) {
        setMessage('No assignments for technician.');
      } else {
        setMessage('');
      }

      setAssignments(res.data);
    } catch (err) {
      setMessage('Error fetching assignments.');
      setAssignments([]);
    }
  };

  return (
    <div>
      <h2>Technician Assignments</h2>
      <input 
        type="text" 
        placeholder="Technician ID" 
        value={techId} 
        onChange={e => setTechId(e.target.value)} 
      />
      <button onClick={fetchAssignments}>Get Assignments</button>

      {message && <p>{message}</p>}

      <ul>
        {assignments.map(a => (
          <li key={a.assignmentId}>
            Work Order ID: {a.workOrderId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
