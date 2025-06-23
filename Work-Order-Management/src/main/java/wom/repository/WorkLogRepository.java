package wom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;

import wom.model.WorkLog;

public interface WorkLogRepository extends JpaRepository<WorkLog, Long> {

	List<WorkLog> findByTechnicianId(long technicianId);
	List<WorkLog> findByWorkOrder_WorkOrderId(long workOrderId);
}
