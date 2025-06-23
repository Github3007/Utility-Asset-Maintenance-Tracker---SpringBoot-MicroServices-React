import React from 'react';
import { useNavigate } from 'react-router-dom';
 
const MainPage = () => {
    const navigate = useNavigate();
 
    return (
        <div className="container text-center">
            <h2>Work Orders and Work Logs</h2>
            <button className="btn btn-primary m-3" onClick={() => navigate("/workorders")}>
                View WorkOrders
            </button>
            <button className="btn btn-secondary m-3" onClick={() => navigate("/worklogs")}>
                View WorkLogs
            </button>
        </div>
    );
};
 
export default MainPage;