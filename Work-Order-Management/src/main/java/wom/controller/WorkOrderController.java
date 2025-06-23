package wom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import wom.exception.PlanNotFoundException;
import wom.model.WorkLog;
import wom.model.WorkOrder;
import wom.serviceImpl.WorkOrderServiceImpl;

@RestController
@RequestMapping("/api/work-orders")
public class WorkOrderController {
	

	
	@Autowired
	WorkOrderServiceImpl workOrderService;
	
	@PostMapping
	public WorkOrder createOrder(@RequestBody WorkOrder workOrder, @RequestParam long planId) {
		
		return workOrderService.createWorkOrder(workOrder, planId);
	}
	
	@GetMapping
	public List<WorkOrder> getAllWorkLogs(){
		return workOrderService.getAllWorkOrders();
	}
	
	@GetMapping("/{workOrderId}")
	public WorkOrder getWorkOrderById(@PathVariable long workOrderId) {
		return workOrderService.getWorkOrderById(workOrderId);
	}
 
	@GetMapping("/assetId/{assetId}")
	List<WorkOrder> getWorkOrdersByAssetId(@PathVariable long assetId){
		return workOrderService.getWorkOrdersByAssetId(assetId);
	}
	
	@GetMapping("/upcoming/month/{month}/year/{year}")
	List<WorkOrder> getUpcomingWorkOrders(@PathVariable int month, @PathVariable int year){
		return workOrderService.getUpcomingWorkOrders(month, year);
	}
	@GetMapping("/bystatus")
	public List<WorkOrder> getWorkOrdersByStatus(@RequestParam String status) {
		
		return workOrderService.getWorkOrdersByStatus(status);
	}
	
	@PutMapping("/{id}")
	public WorkOrder updateStatus(@PathVariable long id, @RequestBody WorkOrder workOrder) throws Exception {
		 return workOrderService.updateStatus(id,workOrder);
	}
}
