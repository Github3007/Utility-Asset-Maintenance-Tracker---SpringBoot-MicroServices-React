package msc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import msc.model.MaintenancePlan;
import msc.model.Task;
import msc.service.TaskService;
import msc.serviceImpl.TaskServiceImpl;


@RestController
@RequestMapping("/api/maintenance-plans/tasks")
public class TaskController {

	@Autowired
	private TaskService taskService;
	
	@PostMapping("/{planId}")
    public Task createTask(@PathVariable Long planId, @RequestBody Task task) {
        return taskService.addTaskToPlan(planId, task);
    }
	
	@GetMapping("/{planId}")
	public List<Task> getTasksByPlanId(@PathVariable Long planId) {
        return taskService.getTasksByPlanId(planId);
    }
	
	@PutMapping("/{taskId}")
	public Task updatePlan(@PathVariable Long taskId, @RequestBody Task task) {
        return taskService.updateTask(taskId, task);
    } 
	
	@DeleteMapping("/delete/{taskId}")
    public void deleteMaintenanceTask(@PathVariable Long taskId) {
    	taskService.deleteTask(taskId);
    }
}
