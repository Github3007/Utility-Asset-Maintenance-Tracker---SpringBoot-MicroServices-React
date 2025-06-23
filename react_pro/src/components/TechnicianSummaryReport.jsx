import React, { useState } from 'react';
import apiService from '../services/apiService';

// Removed setModalOpen, setModalTitle, setModalMessage. Added handleAlert.
const TechnicianSummaryReport = ({ loading, fetchData, handleAlert }) => {
    const [technicianId, setTechnicianId] = useState('');
    const [technicianSummary, setTechnicianSummary] = useState(null);

    const handleGetTechnicianSummary = () => {
        if (!technicianId) {
            handleAlert('danger', 'Please enter a Technician ID.');
            return;
        }
        fetchData(
            () => apiService.getTechnicianSummaryReport(technicianId),
            (data) => setTechnicianSummary(data)
        );
    };

    return (
        <div className="card card-body"> {/* Basic card for content */}
            <h4 className="card-title">Technician Performance Summary</h4>
            <div className="input-group mb-3">
                <span className="input-group-text">Technician ID:</span>
                <input
                    type="number"
                    className="form-control"
                    value={technicianId}
                    onChange={(e) => setTechnicianId(e.target.value)}
                    placeholder="Enter Technician ID"
                />
                <button
                    onClick={handleGetTechnicianSummary}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get Summary'}
                </button>
            </div>
            {technicianSummary && (
                <div className="mt-3">
                    <h5>Summary for {technicianSummary.technician}</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Skill Set:</strong> {technicianSummary.skillSet}</li>
                        <li className="list-group-item"><strong>Total Work Logs:</strong> {technicianSummary.totalWorkLogs}</li>
                        <li className="list-group-item"><strong>Average Time Spent (Hours):</strong> {technicianSummary.averageTimeSpentHours ? technicianSummary.averageTimeSpentHours.toFixed(2) : 'N/A'}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TechnicianSummaryReport;