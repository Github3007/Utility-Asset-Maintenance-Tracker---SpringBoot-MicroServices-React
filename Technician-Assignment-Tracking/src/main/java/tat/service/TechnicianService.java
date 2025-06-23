package tat.service;
import java.util.List;

import tat.model.Technician;

public interface TechnicianService {
    Technician saveTechnician(Technician technician);
//  Assignment assignTechnicianToWorkOrder(Long technicianId, Long workOrderId);
//  List<Assignment> getAssignmentsByTechnicianId(Long technicianId);
    List<Technician> getTechniciansByRegion(String region);
    Technician getTechnicianById(Long id);
	List<Technician> getAllTechnicians();
    
}
