package msc.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="maintenancePlan")
public class MaintenancePlan {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long planId;
	private Long assetId;
	private String frequency; 
	
	@OneToMany(mappedBy = "maintenancePlan", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("maintenancePlan")
//	@JsonManagedReference
//	@JsonBackReference
	private List<Task> taskList;
	
	
	public Long getPlanId() {
		return planId;
	}
	public void setPlanId(Long planId) {
		this.planId = planId;
	}
	public Long getAssetId() {
		return assetId;
	}
	public void setAssetId(Long assetId) {
		this.assetId = assetId;
	}
	public String getFrequency() {
		return frequency;
	}
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}
	public List<Task> getTaskList() {
		return taskList;
	}
	public void setTaskList(List<Task> taskList) {
		this.taskList = taskList;
		if(taskList!=null) {
			for(Task task:taskList) {
				task.setMaintenancePlan(this);
			}
		}
	}
	
}
