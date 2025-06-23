import React, { useState } from 'react'
import { createWorkLog } from '../services/WorkLogServices'
import { useNavigate } from 'react-router-dom'
function WorkLogForm() {
 
    const [workOrderId, setworkOrderId] = useState('')
    const [technicianId, setTechnicianId] = useState('')
    const [endTime, setEndTime] = useState('')
    const [startTime, setstartTime] = useState('')
    const [message, setMessage] = useState('');
 
    const navigate = useNavigate();
    function saveWorkLog(e){
       
        e.preventDefault();
        const workLog = {startTime,endTime}
        console.log(workLog);
        createWorkLog(workLog, workOrderId, technicianId)
        .then((response) =>{
            console.log(response.data);
            setMessage('Worklog created successfully!');
            setTimeout(() => {
                navigate('/worklogs');
            }, 2000); // Optional delay to show success message
 
        })
    .catch((error)=>{
        console.error("Error creating work log:", error);
        setMessage('Error: Could not create Worklog');
    });
 
    }
 
  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Add Worklog</h2>
                <div className='card-body'>
                {message && ( // ✅ Show message only if it's not empty
                            <div className={`alert ${message.includes('Error') ? 'alert-danger' : 'alert-success'}`}>
                                {message}
                            </div>
                        )}
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>WorkOrder Id</label>
                            <input type='text'
                                   placeholder='Enter WorkOrder Id'
                                   name='workOrderId'
                                   value={workOrderId}
                                   className='form-control'
                                   onChange={(e)=>(setworkOrderId(e.target.value))}
                            >
                            </input>
                        </div>
                       
                        <div className='form-group mb-2'>
                            <label className='form-label'>Technician Id</label>
                            <input type='text'
                                   placeholder='Enter technician Id'
                                   name='technicianId'
                                   value={technicianId}
                                   className='form-control'
                                   onChange={(e)=>(setTechnicianId(e.target.value))}
                            >
                            </input>
                        </div>
                       
                        <div className='form-group mb-2'>
                            <label className='form-label'>Start Time</label>
                            <input type='datetime-local'
                                   placeholder='Enter the scheduled Date'
                                   name='startTime'
                                   value={startTime}
                                   className='form-control'
                                   onChange={(e)=>(setstartTime(e.target.value))}
                            >
                            </input>
                        </div>
 
                        <div className='form-group mb-2'>
                            <label className='form-label'>End Time</label>
                            <input type="datetime-local"
                                   name='endTime'
                                   value={endTime}
                                   className='form-control'
                                   onChange={(e)=>(setEndTime(e.target.value))}
                            >
                            </input>
                        </div>
 
                        <button className='btn btn-success' onClick={saveWorkLog}>submit</button>
                    </form>
                </div>
            </div>
        </div>
 
    </div>
  )
}
 
export default WorkLogForm
 