import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createWorkOrder } from '../services/WorkOrderServices';
function WorkOrderForm() {
 
    const [planId, setPlanId] = useState('')
    const [scheduledDate, setScheduledDate] = useState('')
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('');
 
    function handlePlanId(e){
        setPlanId(e.target.value);
    }
    function handlescheduledDate(e){
        setScheduledDate(e.target.value);
    }
    function handleStatus(e){
        setStatus(e.target.value);
    }
 
    const navigate = useNavigate();
   
    function addWorkOrder(e){
       
        e.preventDefault();
        const workOrder = {scheduledDate,status}
        createWorkOrder(workOrder, planId)
                .then((response) =>{
                        console.log(response.data);
                        setMessage('Work Order created successfully!');      
//  Redirect to work order list after success
                setTimeout(() => {
                    navigate('/workorders');
                }, 2000); // Optional delay to show success message
   
                    })
                .catch((error)=>{
                    console.error("Error creating work order:", error);
                    setMessage('Error:Could not create workorder');
                });
        console.log(workOrder);
 
    }
  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Add Work Order</h2>
                <div className='card-body'>
                {message && ( // ✅ Show message only if it's not empty
                            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                                {message}
                            </div>
                        )}
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Plan Id</label>
                            <input type='text'
                                   placeholder='Enter the plan Id'
                                   name='planId'
                                   value={planId}
                                   className='form-control'
                                   onChange={handlePlanId}
                            >
                            </input>
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>scheduledDate</label>
                            <input type='datetime-local'
                                   placeholder='Enter the scheduled Date'
                                   name='scheduledDate'
                                   value={scheduledDate}
                                   className='form-control'
                                   onChange={handlescheduledDate}
                            >
                            </input>
                        </div>
                       
                        <div className='form-group mb-2'>
                            <label className='form-label'>Status</label>
                            <select
                                   name='status'
                                   value={status}
                                   className='form-control'
                                   onChange={handleStatus}
                            >
                                <option value="" disabled selected>Select a status</option>
                                <option value="Open"> Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
 
                        <button className='btn btn-success' onClick={addWorkOrder}>submit</button>
                    </form>
                </div>
            </div>
        </div>
 
    </div>
  )
}
 
export default WorkOrderForm
 
 