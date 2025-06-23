package tat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tat.model.Technician;

@Repository
public interface TechnicianRepository extends JpaRepository<Technician, Long> {
	List<Technician> findByRegion(String region);
}
