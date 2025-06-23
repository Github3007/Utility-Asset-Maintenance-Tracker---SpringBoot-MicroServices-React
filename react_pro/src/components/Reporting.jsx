import React, { useState } from 'react';
import AssetHistoryReport from './AssetHistoryReport';
import TechnicianSummaryReport from './TechnicianSummaryReport';
import UpcomingScheduleReport from './UpcomingScheduleReport';
import apiService from '../services/apiService';

const Reporting = () => {
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState(''); // 'success' or 'danger'
    const [activeTab, setActiveTab] = useState('assetHistory');

    const handleAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setTimeout(() => {
            setAlertMessage(''); // Clear alert after some time
            setAlertType('');
        }, 5000); // 5 seconds
    };

    // Common function to handle API calls and update state
    // const fetchData = async (apiCall, successCallback) => {
    //     setLoading(true);
    //     setAlertMessage(''); // Clear previous alert
    //     try {
    //         const data = await apiCall();
    //         successCallback(data);
    //         handleAlert('success', 'Report generated successfully!');
    //     } catch (err) {
    //         handleAlert('danger', err.message || 'Failed to generate report.');
    //         successCallback(null); // Clear previous report data on error
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchData = async (apiCall, successCallback) => {
        setLoading(true);
        setAlertMessage('');
        try {
            const data = await apiCall();
            successCallback(data);
            handleAlert('success', 'Report generated successfully!');
        } catch (err) {
            let message = 'Failed to generate report.';
            console.log(err.response.data)
            if (err.response && err.response.data) {
                message = err.response.data.message || message;
            } else if (err.message) {
                message = err.message;
            }
            handleAlert('danger', message);
            successCallback(null);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="container py-3">
            <h2 className="text-center my-4">Reporting Dashboard</h2>

            {/* Alert Display */}
            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage('')} aria-label="Close"></button>
                </div>
            )}

            {/* Tab Navigation (Pills style) */}
            <ul className="nav nav-pills nav-fill mb-3" id="reportTabs" role="tablist">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'assetHistory' ? 'active' : ''}`}
                        onClick={() => setActiveTab('assetHistory')}
                        type="button"
                    >
                        Asset History
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'technicianSummary' ? 'active' : ''}`}
                        onClick={() => setActiveTab('technicianSummary')}
                        type="button"
                    >
                        Technician Summary
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'upcomingSchedule' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upcomingSchedule')}
                        type="button"
                    >
                        Upcoming Schedule
                    </button>
                </li>
            </ul>

            {/* Report Content Area */}
            <div className="tab-content" id="reportTabsContent">
                <div className={`tab-pane fade ${activeTab === 'assetHistory' ? 'show active' : ''}`}>
                    <AssetHistoryReport
                        loading={loading}
                        fetchData={fetchData}
                        handleAlert={handleAlert} // Pass alert handler
                    />
                </div>
                <div className={`tab-pane fade ${activeTab === 'technicianSummary' ? 'show active' : ''}`}>
                    <TechnicianSummaryReport
                        loading={loading}
                        fetchData={fetchData}
                        handleAlert={handleAlert} // Pass alert handler
                    />
                </div>
                <div className={`tab-pane fade ${activeTab === 'upcomingSchedule' ? 'show active' : ''}`}>
                    <UpcomingScheduleReport
                        loading={loading}
                        fetchData={fetchData}
                        handleAlert={handleAlert} // Pass alert handler
                    />
                </div>
            </div>
        </div>
    );
};

export default Reporting;