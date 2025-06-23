import React, { useState } from 'react';
import apiService from '../services/apiService';

// Removed setModalOpen, setModalTitle, setModalMessage. Added handleAlert.
const UpcomingScheduleReport = ({ loading, fetchData, handleAlert }) => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [upcomingSchedule, setUpcomingSchedule] = useState(null);

    const handleGetUpcomingSchedule = () => {
        if (!month || !year) {
            handleAlert('danger', 'Please enter both Month and Year.');
            return;
        }
        fetchData(
            () => apiService.getScheduleOverviewReport(month, year),
            (data) => setUpcomingSchedule(data)
        );
    };

    return (
        <div className="card card-body"> {/* Basic card for content */}
            <h4 className="card-title">Upcoming Maintenance Plans</h4>
            <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-3">
                <div className="input-group me-sm-2 mb-2 mb-sm-0">
                    <span className="input-group-text">Month:</span>
                    <input
                        type="number"
                        className="form-control"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder="1-12"
                        min="1"
                        max="12"
                    />
                </div>
                <div className="input-group me-sm-2 mb-2 mb-sm-0">
                    <span className="input-group-text">Year:</span>
                    <input
                        type="number"
                        className="form-control"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="YYYY"
                        min="2000"
                    />
                </div>
                <button
                    onClick={handleGetUpcomingSchedule}
                    className="btn btn-primary w-100 w-sm-auto"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get Schedule'}
                </button>
            </div>
            {upcomingSchedule && (
                <div className="mt-3">
                    <h5>Schedule for {upcomingSchedule.month}/{upcomingSchedule.year}</h5>
                    {upcomingSchedule.upcomingMaintenance.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Work Order ID</th>
                                        <th>Scheduled Date</th>
                                        <th>Status</th>
                                        <th>Asset Name</th>
                                        <th>Location</th>
                                        <th>Plan Frequency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingSchedule.upcomingMaintenance.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.workOrderId}</td>
                                            <td>{new Date(entry.scheduledDate).toLocaleDateString()}</td>
                                            <td>{entry.status}</td>
                                            <td>{entry.assetName}</td>
                                            <td>{entry.location}</td>
                                            <td>{entry.planFrequency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-muted">No upcoming maintenance found for this period.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UpcomingScheduleReport;