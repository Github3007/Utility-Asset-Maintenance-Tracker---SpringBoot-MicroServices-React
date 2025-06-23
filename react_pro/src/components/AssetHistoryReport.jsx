import React, { useState } from 'react';
import apiService from '../services/apiService';

// Removed setModalOpen, setModalTitle, setModalMessage. Added handleAlert.
const AssetHistoryReport = ({ loading, fetchData, handleAlert }) => {
    const [assetId, setAssetId] = useState('');
    const [assetHistory, setAssetHistory] = useState(null);

    const handleGetAssetHistory = () => {
        if (!assetId) {
            handleAlert('danger', 'Please enter an Asset ID.');
            return;
        }
        fetchData(
            () => apiService.getAssetHistoryReport(assetId),
            (data) => setAssetHistory(data)
        );
    };

    return (
        <div className="card card-body"> {/* Basic card for content */}
            <h4 className="card-title">Asset Maintenance History</h4>
            <div className="input-group mb-3">
                <span className="input-group-text">Asset ID:</span>
                <input
                    type="number"
                    className="form-control"
                    value={assetId}
                    onChange={(e) => setAssetId(e.target.value)}
                    placeholder="Enter Asset ID"
                />
                <button
                    onClick={handleGetAssetHistory}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Get History'}
                </button>
            </div>
            {assetHistory && (
                <div className="mt-3">
                    <h5>History for Asset ID: {assetHistory.assetId}</h5>
                    {assetHistory.maintenanceHistory.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Work Order ID</th>
                                        <th>Plan ID</th>
                                        <th>Scheduled Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assetHistory.maintenanceHistory.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.WorkOrderId}</td>
                                            <td>{entry.PlanId}</td>
                                            <td>{new Date(entry.scheduledDate).toLocaleDateString()}</td>
                                            <td>{entry.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-muted">No maintenance history found for this asset.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AssetHistoryReport;