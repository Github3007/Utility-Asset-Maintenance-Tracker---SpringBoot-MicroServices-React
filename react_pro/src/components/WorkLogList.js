import React, { useState, useEffect } from 'react';
import { listWorkLogs } from '../services/WorkLogServices';
import { useNavigate } from 'react-router-dom';
 
const WorkLogList = () => {
    const [workLogs, setWorkLogs] = useState([]);
    const [technicianFilter, setTechnicianFilter] = useState('');
    const [workOrderFilter, setWorkOrderFilter] = useState('');
 
    const navigate = useNavigate();
 
    useEffect(() => {
        listWorkLogs()
            .then(response => {
                console.log(response.data);
                setWorkLogs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
 
    const addWorkLog = () => {
        navigate('/addWorkLog');
    };
 
    const goHome = () => {
        navigate('/workorder');
    };
 
    const filteredLogs = workLogs.filter(log => {
        const matchesTechnician = technicianFilter === '' || log.technicianId.toString().includes(technicianFilter);
        const matchesWorkOrder = workOrderFilter === '' || log.workOrder.workOrderId.toString().includes(workOrderFilter);
        return matchesWorkOrder && matchesTechnician ;
    });
 
    return (
        <div className='container'>
            <h2 className='text-center'>List of WorkLogs</h2>
 
            <div className='row mb-3'>
        <div className='col-md-6'>
            <input
                type='text'
                className='form-control'
                placeholder='Filter by WorkOrder ID'
                value={workOrderFilter}
                onChange={(e) => setWorkOrderFilter(e.target.value)}
            />
        </div>
        <div className='col-md-6'>
            <input
                type='text'
                className='form-control'
                placeholder='Filter by Technician ID'
                value={technicianFilter}
                onChange={(e) => setTechnicianFilter(e.target.value)}
            />
        </div>
        </div>
 
 
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>WorkLog Id</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>WorkOrder Id</th>
                        <th>Technician Id</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map(worklog => (
                        <tr key={worklog.workLogId}>
                            <td>{worklog.workLogId}</td>
                            <td>{worklog.startTime}</td>
                            <td>{worklog.endTime}</td>
                            <td>{worklog.workOrder.workOrderId}</td>
                            <td>{worklog.technicianId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
 
            <button className='btn btn-primary mb-2 me-2' onClick={addWorkLog}>Add WorkLog</button>
            <button className='btn btn-secondary mb-2' onClick={goHome}>Return</button>
        </div>
    );
};
 
export default WorkLogList;
 
 