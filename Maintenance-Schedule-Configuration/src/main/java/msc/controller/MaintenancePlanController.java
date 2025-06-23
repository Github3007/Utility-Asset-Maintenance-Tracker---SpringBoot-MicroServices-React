package msc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import msc.model.MaintenancePlan;
import msc.service.MaintenancePlanService;
import msc.serviceImpl.MaintenancePlanServiceImpl;


@RestController
@RequestMapping("/api/maintenance-plans")
public class MaintenancePlanController {

    @Autowired
    private MaintenancePlanService maintenancePlanService;

    @PostMapping
    public MaintenancePlan createPlan(@RequestBody MaintenancePlan plan,@RequestParam Long assetId) {
        return maintenancePlanService.createPlan(plan,assetId);
    }

    @GetMapping("/assetId/{assetId}")
    public List<MaintenancePlan> getPlansByAssetId(@PathVariable Long assetId) {
        return maintenancePlanService.getPlansByAssetId(assetId);
    }
    
    @GetMapping("/getAll")
    public List<MaintenancePlan> getAllMaintenancePlans() {
        return maintenancePlanService.getAllPlans();
    }
    
    @GetMapping("/{id}")
    public MaintenancePlan getPlans(@PathVariable long id ) {
        return maintenancePlanService.getPlanById(id);
    }

    @PutMapping("/{id}")
    public  MaintenancePlan updatePlan(@PathVariable Long id, @RequestBody MaintenancePlan plan) {
        return maintenancePlanService.updatePlan(id, plan);
    }
    
    @DeleteMapping("/delete")
    public void deleteMaintenancePlan(@RequestParam Long id) {
    	maintenancePlanService.deletePlan(id);
    }
    
    @DeleteMapping("/deleteAll")
    public void deleteAllMaintenancePlans() {
    	maintenancePlanService.deleteAllPlans();
    }
}

