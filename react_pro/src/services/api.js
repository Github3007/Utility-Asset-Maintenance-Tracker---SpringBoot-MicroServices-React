import axios from "axios";

const API_BASE_URL = "http://localhost:8090/api/maintenance-plans";

export const createMaintenancePlan = (plan, assetId) =>
    axios.post(`${API_BASE_URL}`, plan, { params: { assetId } });

export const getMaintenancePlans = (assetId) =>
    axios.get(`${API_BASE_URL}`, { params: { assetId } });

export const getAllMaintenancePlans = () =>
    axios.get(`${API_BASE_URL}/getAll`);

export const getMaintenancePlanById = (id) =>
    axios.get(`${API_BASE_URL}/${id}`);

export const updateMaintenancePlan = (id, plan) =>
    axios.put(`${API_BASE_URL}/${id}`, plan);

export const deleteMaintenancePlan = (id) =>
    axios.delete(`${API_BASE_URL}/delete`, { params: { id } });

export const deleteAllMaintenancePlans = () =>
    axios.delete(`${API_BASE_URL}/deleteAll`);





export const createTask = (planId, task) =>
    axios.post(`${API_BASE_URL}/tasks/${planId} `, task );

export const getTasksByPlanId = (planId) =>
    axios.get(`${API_BASE_URL}/tasks/${planId}`);

export const updateTask = (taskId, task) =>
    axios.put(`${API_BASE_URL}/tasks/${taskId}`, task);

export const deleteTask = (taskId) =>
    axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`);