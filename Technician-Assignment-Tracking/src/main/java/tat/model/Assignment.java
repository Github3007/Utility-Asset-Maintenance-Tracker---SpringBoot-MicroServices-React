package tat.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Data

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assignment")
public class Assignment {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name = "assignment_id", nullable = false)
	private long assignmentId;

	@Column(name = "work_order_id", nullable = false)
	private long workOrderId;
	
//	@Column(name = "technician_id", nullable = false)
//	private long technicianId;
	
	@ManyToOne
	@JsonIgnoreProperties("assignment")
	@JoinColumn(name = "technician_id")
	private Technician technician;
	
//	@ManyToOne
//	@joinColumn(name = "work_order_id")
//	private WorkOrder workOrder;
	
	
}
