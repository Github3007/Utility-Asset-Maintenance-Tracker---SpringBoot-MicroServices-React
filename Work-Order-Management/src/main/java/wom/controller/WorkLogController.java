package wom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import wom.model.WorkLog;
import wom.serviceImpl.WorkLogServiceImpl;


@RestController
@RequestMapping("/api/work-orders")
public class WorkLogController {
	
	@Autowired
	WorkLogServiceImpl workLogService;
	
	@PostMapping("/worklogs")
	public WorkLog createWorkLog(@RequestBody WorkLog workLog, @RequestParam long workOrderId,@RequestParam long technicianId) {
		
			return workLogService.createWorkLog(workLog,workOrderId,technicianId);
	}
	
	@GetMapping("/work-logs/workOrderId/{workOrderId}")
	List<WorkLog> getWorkLogsByWorkOrder(@PathVariable Long workOrderId){
		return workLogService.getWorkLogsByWorkOrderId(workOrderId);
		
	}
	
	//select wl from worklog where wl.workorderid=?1
			
	@GetMapping("/work-logs/technicianId/{technicianId}")
	List<WorkLog> getWorkLogsByTechnician(@PathVariable Long technicianId){
		return workLogService.getWorkLogsByTechnicianId(technicianId);
}
	
	@GetMapping("/worklogs")
	public List<WorkLog> getAllWorkLogs(){
		return workLogService.getAllWorkLogs();
	}

}
