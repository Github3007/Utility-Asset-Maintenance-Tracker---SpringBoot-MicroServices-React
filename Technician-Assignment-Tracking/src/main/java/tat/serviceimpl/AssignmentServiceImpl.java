package tat.serviceimpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tat.client.WorkOrderClient;
import tat.dto.WorkOrderDto;
import tat.model.Assignment;
import tat.model.Technician;
import tat.repository.AssignmentRepository;
import tat.repository.TechnicianRepository;
import tat.service.AssignmentService;

import java.util.List;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private TechnicianRepository technicianRepository;
    
    @Autowired
    private WorkOrderClient workOrderClient;

    @Override
    public Assignment assignTechnicianToWorkOrder(Long technicianId, Long workOrderId) throws Exception {
        Technician technician = technicianRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        WorkOrderDto workOrderDto=workOrderClient.getWorkOrderById(workOrderId);
        if(workOrderDto==null) {
        	throw new Exception("Work Order not found");
        }
        
        Assignment assignment = new Assignment();
        assignment.setTechnician(technician);
        assignment.setWorkOrderId(workOrderId);

        return assignmentRepository.save(assignment);
    }

    @Override
    public List<Assignment> getAssignmentsByTechnicianId(Long technicianId) {
        return assignmentRepository.findByTechnicianTechnicianId(technicianId);
    }
}
