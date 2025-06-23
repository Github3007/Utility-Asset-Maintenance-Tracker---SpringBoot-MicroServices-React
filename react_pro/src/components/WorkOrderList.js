import React, { useState, useEffect } from "react";
import { listWorkOrders, updateWorkOrderStatus } from "../services/WorkOrderServices";
import { useNavigate } from "react-router-dom";
 
const WorkOrderList = () => {
    const [workOrders, setWorkOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
 
    useEffect(() => {
        listWorkOrders()
            .then((response) => {
                setWorkOrders(response.data);
            })
            .catch((error) => {
                console.error("Error fetching work orders:", error);
            });
    }, []);
 
    const navigate = useNavigate();
 
    const addNewWorkOrder = () => navigate("/addWorkOrder");
    const goHome = () => navigate("/workorder");
 
    const handleStatusChange = (event, workOrderId) => {
        const newStatus = event.target.value;
        const currentWorkOrder = workOrders.find(order => order.workOrderId === workOrderId);
 
        if (!currentWorkOrder) return;
 
        const updatedWorkOrder = { ...currentWorkOrder, status: newStatus };
 
        updateWorkOrderStatus(updatedWorkOrder)
            .then(() => {
                setWorkOrders(workOrders.map(order =>
                    order.workOrderId === workOrderId ? { ...order, status: newStatus } : order
                ));
            })
            .catch(error => console.error("Failed to update status:", error));
    };
 
    const filteredWorkOrders = statusFilter === "All"
        ? workOrders
        : workOrders.filter(order => order.status === statusFilter);
 
    return (
        <div className="container">
            <h2 className="text-center">List of WorkOrders</h2>
 
            <div className="form-group mb-3">
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    className="form-control"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
 
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>WorkOrder Id</th>
                        <th>Plan Id</th>
                        <th>Scheduled Date</th>
                        <th>Status</th>
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWorkOrders.map((workorder) => (
                        <tr key={workorder.workOrderId}>
                            <td>{workorder.workOrderId}</td>
                            <td>{workorder.planId}</td>
                            <td>{workorder.scheduledDate}</td>
                            <td>{workorder.status}</td>
                            <td>
                                <select
                                    className="form-control"
                                    value={workorder.status}
                                    onChange={(e) => handleStatusChange(e, workorder.workOrderId)}
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
 
            <button className="btn btn-primary mb-2" onClick={addNewWorkOrder}>Add Work Order</button>
            <button className="btn btn-secondary mb-2" onClick={goHome}>Return</button>
        </div>
    );
};
 
export default WorkOrderList;
 
 