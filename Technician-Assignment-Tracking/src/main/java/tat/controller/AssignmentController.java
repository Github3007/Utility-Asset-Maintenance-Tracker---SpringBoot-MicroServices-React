package tat.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tat.model.Assignment;
import tat.service.AssignmentService;

import java.util.List;


@RestController
@RequestMapping("/api/technicians/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentService assignmentService;

    @PostMapping
    public Assignment assignTechnician(@RequestParam Long technicianId, @RequestParam Long workOrderId) {
    	try {
        return assignmentService.assignTechnicianToWorkOrder(technicianId, workOrderId);
    	}catch(Exception e) {
    		return null;
    	}
    }

    @GetMapping
    public List<Assignment> getAssignmentsByTechnician(@RequestParam Long technicianId) {
        return assignmentService.getAssignmentsByTechnicianId(technicianId);
    }
}
