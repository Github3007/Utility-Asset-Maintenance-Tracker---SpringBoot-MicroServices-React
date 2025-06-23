package wom.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import jakarta.servlet.http.HttpServletRequest;
import wom.clients.PlanClient;
import wom.dto.PlanDTO;
import wom.exception.PlanNotFoundException;
import wom.exception.WorkOrderNotFoundException;
import wom.model.WorkLog;
//import arhm.model.Asset;
import wom.model.WorkOrder;
import wom.repository.WorkOrderRepository;
import wom.service.WorkOrderService;

@Service
public class WorkOrderServiceImpl implements WorkOrderService{

	@Autowired
	private WorkOrderRepository workOrderRepository;
	
	@Autowired
	private PlanClient planClient;


	@Override
	public WorkOrder createWorkOrder(WorkOrder workOrder, long planId){
		PlanDTO plan= planClient.getPlanById(planId);
		
		if(plan ==null){
			throw new PlanNotFoundException("Maintainance Plan not found with Id");
		
		}
		workOrder.setPlanId(planId);
		return workOrderRepository.save(workOrder);
	}

	@Override
	public List<WorkOrder> getWorkOrdersByStatus(String status){
	    List<WorkOrder> workOrders = workOrderRepository.findByStatus(status);
	    
	    if (workOrders.isEmpty()) {
	       throw new WorkOrderNotFoundException("No workOrders with status");
	    }
	    
	    return workOrders;
	}	
		
	@Override
	public WorkOrder updateStatus(long workOrderId, WorkOrder workOrder) {
		// TODO Auto-generated method stub
		WorkOrder existingWorkOrder= workOrderRepository.findById(workOrderId).orElse(null);
		if (existingWorkOrder==null) {
			throw new WorkOrderNotFoundException("WorkOrder not found");
		}
		existingWorkOrder.setStatus(workOrder.getStatus());

		return workOrderRepository.save(existingWorkOrder);	
	}
	
	@Override
	public List<WorkOrder> getAllWorkOrders() {
		// TODO Auto-generated method stub
		return workOrderRepository.findAll();
	}

	public WorkOrder getWorkOrderById(long workOrderId) {
		// TODO Auto-generated method stub
		return workOrderRepository.findById(workOrderId).orElse(null);
	}

	@Override
	public List<WorkOrder> getWorkOrdersByPlanId(long planId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<WorkOrder> getWorkOrdersByAssetId(long assetId) {
		// TODO Auto-generated method stub
		List<PlanDTO> planDTO =  planClient.getPlanByAssetId(assetId);
		List<WorkOrder> result = new ArrayList<>();
		for(PlanDTO plandto :planDTO) {
			long planId = plandto.getPlanId();
			List<WorkOrder> currentList = workOrderRepository.findByPlanId(planId);
			if(currentList != null) {
				result.addAll(currentList);
			}
		}
		
		return result;
		
	}

	@Override
	public List<WorkOrder> getUpcomingWorkOrders(int month, int year) {
	
		return workOrderRepository.findByMonthAndYear(month, year);
	}




	

	
	
}
