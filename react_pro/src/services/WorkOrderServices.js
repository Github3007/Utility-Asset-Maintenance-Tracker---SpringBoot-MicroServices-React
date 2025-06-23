import axios from "axios";
 
const REST_API_BASE_URL = 'http://localhost:8090/api/work-orders'
 
export const listWorkOrders = ()=> axios.get(REST_API_BASE_URL);
 
 
export const createWorkOrder = (workOrder, planId) => {
    return axios.post(REST_API_BASE_URL, workOrder, {
                params: { planId }
         });
    };
 
    export const updateWorkOrderStatus = (workOrder) => {
        return axios.put(`${REST_API_BASE_URL}/${workOrder.workOrderId}/status`, workOrder);
    };
   
 
 