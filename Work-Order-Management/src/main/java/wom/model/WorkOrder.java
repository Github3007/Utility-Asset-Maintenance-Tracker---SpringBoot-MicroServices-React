package wom.model;


import java.util.Date;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrder {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long workOrderId;
	@NotNull(message="planId cannot be null")
	private long planId;
	@NotNull(message="Scheduled Date cannot be null")
	@Future(message = "ScheduledDate must be in the future")
	private Date scheduledDate;
	@Pattern(regexp = "Open|In Progress|Completed", message = "Status must be either 'Open', 'In Progress', or 'Completed'")
	private String status;

}
