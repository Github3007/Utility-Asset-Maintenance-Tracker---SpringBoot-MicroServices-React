package msc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import msc.model.MaintenancePlan;
import msc.model.Task;
import msc.repository.MaintenancePlanRepository;
import msc.repository.TaskRepository;
import msc.service.TaskService;

import msc.exception.ResourceNotFoundException;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private MaintenancePlanRepository maintenancePlanRepository;

    @Override
    public Task addTaskToPlan(Long planId, Task task) {
        MaintenancePlan plan = maintenancePlanRepository.findById(planId)
            .orElseThrow(() -> new ResourceNotFoundException("Plan not found"));
        task.setMaintenancePlan(plan);
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long taskId, Task updatedTask) {
        Task existingTask = taskRepository.findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        existingTask.setDescription(updatedTask.getDescription());
        existingTask.setEstimatedHours(updatedTask.getEstimatedHours());
        return taskRepository.save(existingTask);
    }

    @Override
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    @Override
    public List<Task> getTasksByPlanId(Long planId) {
        return taskRepository.findByMaintenancePlan_PlanId(planId);
    }

    @Override
    public Task getTaskById(Long taskId) {
        return taskRepository.findById(taskId)
            .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }
}

