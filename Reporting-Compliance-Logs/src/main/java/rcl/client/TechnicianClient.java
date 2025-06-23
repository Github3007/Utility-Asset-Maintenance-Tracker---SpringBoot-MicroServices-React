package rcl.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import rcl.dto.TechnicianDTO;

@FeignClient(name="Technician-Assignment-Tracking")
public interface TechnicianClient {
	
	@GetMapping("/api/technicians/{id}")
	TechnicianDTO getTechnicianById(@PathVariable("id") Long technicianId);

}
