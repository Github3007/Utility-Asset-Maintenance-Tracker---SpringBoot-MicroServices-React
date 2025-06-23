package msc.service;

import java.util.List;

import msc.model.Task;

public interface TaskService {
	Task addTaskToPlan(Long planId, Task task);
    Task updateTask(Long taskId, Task updatedTask);
    void deleteTask(Long taskId);
    List<Task> getTasksByPlanId(Long planId);
    Task getTaskById(Long taskId);
}
