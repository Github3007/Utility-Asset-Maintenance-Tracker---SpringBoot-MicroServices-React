package wom.model;

import java.util.Date;

import javax.validation.constraints.NotNull;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkLog {
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long workLogId;
	@NotNull(message="Start time cannot be null")
	private Date startTime;
	@NotNull(message="End time cannot be null")
	private Date endTime;
	
	private long technicianId;
	
	@ManyToOne
	@JoinColumn(name="workOrderId")
	private WorkOrder workOrder;
	
}
