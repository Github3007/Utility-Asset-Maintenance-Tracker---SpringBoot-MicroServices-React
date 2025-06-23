package wom.service;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import wom.model.WorkLog;;

public interface WorkLogService {
	
	 WorkLog createWorkLog(WorkLog workLog, long workOrderId,long technicianId);
	 List<WorkLog> getAllWorkLogs();
	 List<WorkLog> getWorkLogsByTechnicianId(Long technicianId);
	 List<WorkLog> getWorkLogsByWorkOrderId(Long workOrderId);

  
}
