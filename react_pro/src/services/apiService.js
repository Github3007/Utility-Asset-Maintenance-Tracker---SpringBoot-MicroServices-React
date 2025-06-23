// src/services/apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api/reports';

const apiService = {
    /**
     * Fetches asset maintenance history for a given asset ID.
     * GET /api/reports/asset-history?assetId={assetId}
     */
    getAssetHistoryReport: async (assetId) => {
        if (assetId === null || assetId === undefined) {
            throw new Error('Asset ID is required for asset history report.');
        }
        console.log(`[API] Fetching asset history for ID: ${assetId}`);
        const response = await axios.get(`${BASE_URL}/asset-history`, {
            params: { assetId }
        });
        return response.data;
    },

    /**
     * Fetches technician performance summary for a given technician ID.
     * GET /api/reports/technician-summary?technicianId={technicianId}
     */
    getTechnicianSummaryReport: async (technicianId) => {
        if (technicianId === null || technicianId === undefined) {
            throw new Error('Technician ID is required for technician summary report.');
        }
        console.log(`[API] Fetching technician summary for ID: ${technicianId}`);
        const response = await axios.get(`${BASE_URL}/technician-summary`, {
            params: { technicianId }
        });
        return response.data;
    },

    /**
     * Fetches upcoming maintenance schedule for a given month and year.
     * GET /api/reports/schedule-overview?month={month}&year={year}
     */
    getScheduleOverviewReport: async (month, year) => {
        if (month === null || month === undefined || year === null || year === undefined) {
            throw new Error('Month and Year are required for upcoming schedule report.');
        }
        console.log(`[API] Fetching schedule for Month: ${month}, Year: ${year}`);
        const response = await axios.get(`${BASE_URL}/schedule-overview`, {
            params: { month, year }
        });
        return response.data;
    },
};

export default apiService;
