package wom.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import wom.dto.TechnicianDTO;

@FeignClient(name="Technician-Assignment-Tracking")
public interface TechnicianClient {
	
	@GetMapping("/api/technicians/{id}")
    TechnicianDTO getTechnicianById(@PathVariable long id );
}
