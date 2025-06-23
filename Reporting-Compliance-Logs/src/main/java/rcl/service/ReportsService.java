package rcl.service;
 
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import rcl.client.AssetClient;
import rcl.client.MaintenanceClient;
import rcl.client.TechnicianClient;
import rcl.client.WorkOrderClient;
import rcl.dto.AssetDTO;
import rcl.dto.MaintenancePlanDTO;
import rcl.dto.TechnicianDTO;
import rcl.dto.WorkLogDTO;
import rcl.dto.WorkOrderDTO;
import rcl.exception.AssetNotFoundException;
import rcl.exception.MaintenancePlanNotFoundException;
import rcl.exception.TechnicianNotFoundException;
 
@Service
public class ReportsService {
	@Autowired
	private TechnicianClient technicianClient;
	@Autowired
	private  WorkOrderClient  workOrderClient;
	@Autowired
	private AssetClient assetClient;
	@Autowired
	private MaintenanceClient maintenanceClient;
 
	
 
	
	public Map<String, Object> getTechnicianSummary(Long technicianId) {
	    TechnicianDTO tech = technicianClient.getTechnicianById(technicianId);
	    if (tech == null) {
	        throw new TechnicianNotFoundException(technicianId);
	    }
	
	    List<WorkLogDTO> logs = workOrderClient.getWorkLogsByTechnician(technicianId);
	
	    double avgHours = logs.stream()
	        .filter(log -> log.getStartTime() != null && log.getEndTime() != null)
	        .mapToDouble(log -> {
	            long minutes = Duration.between(
	                log.getStartTime().toInstant(),
	                log.getEndTime().toInstant()
	            ).toMinutes();
	            return minutes > 0 ? minutes / 60.0 : 0;
	        })
	        .filter(hours -> hours > 0)
	        .average()
	        .orElse(0);
	
	    Map<String, Object> report = new HashMap<>();
	    report.put("technician", tech.name);
	    report.put("skillSet", tech.skillSet);
	    report.put("totalWorkLogs", logs.size());
	    report.put("averageTimeSpentHours", avgHours);
	
	    return report;
	}
 

	public Map<String,Object> getAssetMaintenanceHistory(Long assetId){
	    AssetDTO asset = assetClient.getAssetById(assetId);
	    if (asset == null) {
	        throw new AssetNotFoundException(assetId);
	    }
	
	    List<WorkOrderDTO> workOrders = workOrderClient.getWorkOrdersByAssetId(assetId);
	    List<Map<String,Object>> history = new ArrayList<>();
	
	    for (WorkOrderDTO wo : workOrders) {
	        Map<String,Object> entry = new HashMap<>();
	        entry.put("WorkOrderId", wo.workOrderId);
	        entry.put("PlanId", wo.planId);
	        entry.put("scheduledDate", wo.scheduledDate);
	        entry.put("status", wo.status);
	        history.add(entry);
	    }
	
	    Map<String,Object> report = new HashMap<>();
	    report.put("assetId", assetId);
	    report.put("maintenanceHistory", history);
	    return report;
	}
	
	

	public Map<String, Object> getUpcomingSchedule(int month, int year) {
	    List<WorkOrderDTO> workOrders = workOrderClient.getUpcomingWorkOrders(month, year);
	    List<Map<String, Object>> result = new ArrayList<>();

	    for (WorkOrderDTO wo : workOrders) {
	        MaintenancePlanDTO plan = maintenanceClient.getMaintenancePlan(wo.planId);
	        if (plan == null) {
	            throw new MaintenancePlanNotFoundException(wo.planId);
	        }

	        AssetDTO asset = assetClient.getAssetById(plan.assetId);
	        if (asset == null) {
	            throw new AssetNotFoundException(plan.assetId);
	        }

	        Map<String, Object> entry = new HashMap<>();
	        entry.put("workOrderId", wo.workOrderId);
	        entry.put("scheduledDate", wo.scheduledDate);
	        entry.put("status", wo.status);
	        entry.put("assetName", asset.name);
	        entry.put("location", asset.location);
	        entry.put("planFrequency", plan.frequency);
	        result.add(entry);
	    }

	    Map<String, Object> report = new HashMap<>();
	    report.put("month", month);
	    report.put("year", year);
	    report.put("upcomingMaintenance", result);

	    return report;
	}

 
	
}











