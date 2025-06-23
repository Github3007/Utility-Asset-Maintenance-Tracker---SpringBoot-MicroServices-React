package wom.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.netflix.discovery.converters.Auto;

import wom.clients.TechnicianClient;
import wom.dto.TechnicianDTO;
import wom.exception.PlanNotFoundException;
import wom.exception.TechnicianNotFoundException;
import wom.exception.WorkOrderNotFoundException;
import wom.model.WorkLog;
import wom.model.WorkOrder;
import wom.repository.WorkLogRepository;
import wom.repository.WorkOrderRepository;
import wom.service.WorkLogService;

@Service
public class WorkLogServiceImpl implements WorkLogService {
	
	@Autowired
	WorkLogRepository wlrepo;
	@Autowired
	TechnicianClient technicianClient;
	@Autowired
	WorkOrderRepository worepo;
	@Override
	public WorkLog createWorkLog(WorkLog workLog,long workOrderId,  long technicianId){
		
		WorkOrder workOrder = worepo.findById(workOrderId).orElse(null);
	    TechnicianDTO technicianDTO = technicianClient.getTechnicianById(technicianId);
	    if(workOrder == null) {
	    	throw new WorkOrderNotFoundException("Work Order not found");
	    }
	    if(technicianDTO == null)
	    {
	    	throw new TechnicianNotFoundException("Technician not found");

	    }
	    workLog.setTechnicianId(technicianId);	
	    workLog.setWorkOrder(workOrder);
		return wlrepo.save(workLog);
	}

	@Override
	public List<WorkLog> getAllWorkLogs() {
		// TODO Auto-generated method stub
		return wlrepo.findAll();
	}

	@Override
	public List<WorkLog> getWorkLogsByTechnicianId(Long technicianId) {
		// TODO Auto-generated method stub
		
		return wlrepo.findByTechnicianId(technicianId);
	}

	@Override
	public List<WorkLog> getWorkLogsByWorkOrderId(Long workOrderId) {
		// TODO Auto-generated method stub
		return wlrepo.findByWorkOrder_WorkOrderId(workOrderId);
	}




}
