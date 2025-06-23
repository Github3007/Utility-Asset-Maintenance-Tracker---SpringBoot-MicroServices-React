package rcl.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import rcl.client.*;
import rcl.dto.*;
import rcl.exception.*;

public class ReportsServiceTest {

    @Mock
    private TechnicianClient technicianClient;

    @Mock
    private WorkOrderClient workOrderClient;

    @Mock
    private AssetClient assetClient;

    @Mock
    private MaintenanceClient maintenanceClient;

    @InjectMocks
    private ReportsService reportsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetTechnicianSummary_Success() {
        TechnicianDTO tech = new TechnicianDTO();
        tech.name = "John Doe";
        tech.skillSet = "Electrical";

        WorkLogDTO log1 = new WorkLogDTO();
        log1.setStartTime(Date.from(Instant.parse("2023-01-01T10:00:00Z")));
        log1.setEndTime(Date.from(Instant.parse("2023-01-01T12:00:00Z")));

        WorkLogDTO log2 = new WorkLogDTO();
        log2.setStartTime(Date.from(Instant.parse("2023-01-02T09:00:00Z")));
        log2.setEndTime(Date.from(Instant.parse("2023-01-02T11:30:00Z")));

        when(technicianClient.getTechnicianById(1L)).thenReturn(tech);
        when(workOrderClient.getWorkLogsByTechnician(1L)).thenReturn(List.of(log1, log2));

        Map<String, Object> result = reportsService.getTechnicianSummary(1L);

        assertEquals("John Doe", result.get("technician"));
        assertEquals("Electrical", result.get("skillSet"));
        assertEquals(2, result.get("totalWorkLogs"));
        assertTrue((Double) result.get("averageTimeSpentHours") > 1.9);
    }

    @Test
    void testGetTechnicianSummary_TechnicianNotFound() {
        when(technicianClient.getTechnicianById(99L)).thenReturn(null);
        assertThrows(TechnicianNotFoundException.class, () -> reportsService.getTechnicianSummary(99L));
    }

    @Test
    void testGetAssetMaintenanceHistory_Success() {
        AssetDTO asset = new AssetDTO();
        asset.assetId = 1L;

        WorkOrderDTO wo = new WorkOrderDTO();
        wo.workOrderId = 101L;
        wo.planId = 201L;
        wo.scheduledDate = new Date();
        wo.status = "Completed";

        when(assetClient.getAssetById(1L)).thenReturn(asset);
        when(workOrderClient.getWorkOrdersByAssetId(1L)).thenReturn(List.of(wo));

        Map<String, Object> result = reportsService.getAssetMaintenanceHistory(1L);

        assertEquals(1L, result.get("assetId"));
        List<?> history = (List<?>) result.get("maintenanceHistory");
        assertEquals(1, history.size());
    }

    @Test
    void testGetAssetMaintenanceHistory_AssetNotFound() {
        when(assetClient.getAssetById(999L)).thenReturn(null);
        assertThrows(AssetNotFoundException.class, () -> reportsService.getAssetMaintenanceHistory(999L));
    }

    @Test
    void testGetUpcomingSchedule_Success() {
        WorkOrderDTO wo = new WorkOrderDTO();
        wo.workOrderId = 301L;
        wo.planId = 401L;
        wo.scheduledDate = new Date();
        wo.status = "Scheduled";

        MaintenancePlanDTO plan = new MaintenancePlanDTO();
        plan.planId = 401L;
        plan.assetId = 501L;
        plan.frequency = "Monthly";

        AssetDTO asset = new AssetDTO();
        asset.assetId = 501L;
        asset.name = "Pump A";
        asset.location = "Plant 1";

        when(workOrderClient.getUpcomingWorkOrders(6, 2025)).thenReturn(List.of(wo));
        when(maintenanceClient.getMaintenancePlan(401L)).thenReturn(plan);
        when(assetClient.getAssetById(501L)).thenReturn(asset);

        Map<String, Object> result = reportsService.getUpcomingSchedule(6, 2025);

        assertEquals(6, result.get("month"));
        assertEquals(2025, result.get("year"));
        List<?> upcoming = (List<?>) result.get("upcomingMaintenance");
        assertEquals(1, upcoming.size());
    }
}
