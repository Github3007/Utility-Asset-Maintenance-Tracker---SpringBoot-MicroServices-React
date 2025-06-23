package tat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tat.model.Assignment;


@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long>{
	List<Assignment> findByTechnicianTechnicianId(Long technicianId);
   
}
