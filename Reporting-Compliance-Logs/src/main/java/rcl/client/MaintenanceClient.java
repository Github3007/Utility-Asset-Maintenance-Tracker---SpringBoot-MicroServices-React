package rcl.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import rcl.dto.MaintenancePlanDTO;

@FeignClient(name="Maintenance-Schedule-Configuration")
public interface MaintenanceClient {
	
	@GetMapping("/api/maintenance-plans/{planId}")
	MaintenancePlanDTO getMaintenancePlan(@PathVariable("planId") Long planId);

}
