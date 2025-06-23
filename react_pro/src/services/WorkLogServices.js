import axios from "axios";
 
const REST_API_BASE_URL = 'http://localhost:8090/api/work-orders/worklogs'
 
export const listWorkLogs = ()=> axios.get(REST_API_BASE_URL);
 
export const createWorkLog = (workLog, workOrderId, technicianId) => {
   
    if (!workOrderId || !technicianId) {
        console.error("WorkOrderId or TechnicianId is missing!");
        return Promise.reject("WorkOrderId and TechnicianId cannot be empty.");
    }
 
    return axios.post(REST_API_BASE_URL, workLog, {
                params: { workOrderId, technicianId }
         });
    };
 
 