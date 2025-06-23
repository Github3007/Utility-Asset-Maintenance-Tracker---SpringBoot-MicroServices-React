import React, { useState } from 'react';
import axios from 'axios';

const AssignTechnicianForm = () => {
  const [technicianId, setTechnicianId] = useState('');
  const [workOrderId, setWorkOrderId] = useState('');
  const handleAssign = async () => {
    try {
      const response = await axios.post('/api/technicians/assignments', null, {
        params: { technicianId, workOrderId }
      });
  
      if (!response.data || !response.data.assignmentId) {
        alert('Technician or Work Order not found.');
      } else {
        alert('Technician assigned successfully!');
      }
    } catch (err) {
      alert('Error assigning technician.');
    }
  };
  

return (
<div>
<h2>Assign Technician</h2>
<input 
        type="text" 
        placeholder="Technician ID" 
        value={technicianId}
        onChange={e => setTechnicianId(e.target.value)} 
/>

<input 
        type="text" 
        placeholder="Work Order ID" 
        value={workOrderId}
        onChange={e => setWorkOrderId(e.target.value)} 
/>

<button onClick={handleAssign}>Assign</button>
</div>
  );
};

export default AssignTechnicianForm;
 