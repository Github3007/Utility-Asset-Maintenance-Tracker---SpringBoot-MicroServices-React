package msc.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import msc.model.MaintenancePlan;

import java.util.List;

@Repository
public interface MaintenancePlanRepository extends JpaRepository<MaintenancePlan, Long> {
		
	List<MaintenancePlan> findByAssetId(Long assetId);
}
