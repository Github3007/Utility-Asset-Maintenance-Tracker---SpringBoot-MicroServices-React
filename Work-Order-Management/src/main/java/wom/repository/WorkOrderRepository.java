package wom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import wom.model.WorkOrder;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long > {
	
	//@Query(value="select wo from WorkOrder wo where wo.status=?1")
	List<WorkOrder> findByStatus(String status);
	List<WorkOrder> findByPlanId(long planId);
	
    @Query("SELECT w FROM WorkOrder w WHERE FUNCTION('MONTH', w.scheduledDate) = :month AND FUNCTION('YEAR', w.scheduledDate) = :year")
    List<WorkOrder> findByMonthAndYear(int month, int year);
	 
}
