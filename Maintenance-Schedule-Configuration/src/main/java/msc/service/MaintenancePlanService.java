package msc.service;

import java.util.List;

import msc.model.MaintenancePlan;

public interface MaintenancePlanService {
	
    MaintenancePlan createPlan(MaintenancePlan plan,Long assetId);
    List<MaintenancePlan> getPlansByAssetId(Long assetId);
    MaintenancePlan updatePlan(Long planId, MaintenancePlan updatedPlan);
    void deletePlan(Long planId);
    MaintenancePlan getPlanById(Long planId);
    List<MaintenancePlan> getAllPlans();
    void deleteAllPlans();
}

