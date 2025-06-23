package tat.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import tat.dto.WorkOrderDto;

@FeignClient(name = "WORK-ORDER-MANAGEMENT")
public interface WorkOrderClient {
	
	@GetMapping("/api/work-orders/{workOrderId}")
	WorkOrderDto getWorkOrderById(@PathVariable Long workOrderId);

}
