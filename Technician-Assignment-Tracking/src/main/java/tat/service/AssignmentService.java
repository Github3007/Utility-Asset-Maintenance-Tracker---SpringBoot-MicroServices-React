package tat.service;

import java.util.List;

import tat.model.Assignment;

public interface AssignmentService {
    Assignment assignTechnicianToWorkOrder(Long technicianId, Long workOrderId) throws Exception;
    List<Assignment> getAssignmentsByTechnicianId(Long technicianId);
}
