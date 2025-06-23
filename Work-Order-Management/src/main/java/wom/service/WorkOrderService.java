package wom.service;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import wom.exception.PlanNotFoundException;
import wom.exception.WorkOrderNotFoundException;
import wom.model.WorkOrder;

public interface WorkOrderService {

	
	WorkOrder createWorkOrder(WorkOrder workOrder, long planId);
    List<WorkOrder> getWorkOrdersByStatus(String Status);
    List<WorkOrder> getWorkOrdersByPlanId(long planId);
	WorkOrder updateStatus(long WorkOrderId, WorkOrder workOrder);
	List<WorkOrder> getAllWorkOrders();
	List<WorkOrder> getWorkOrdersByAssetId( long assetId);
	WorkOrder getWorkOrderById( long workOrderId);
	List<WorkOrder> getUpcomingWorkOrders(int month, int year);
}
