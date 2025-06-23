package rcl.dto;

import java.util.Date;

import lombok.Data;
@Data
public class WorkLogDTO {
	public Long workOrderId;
	public Long technicianId;
	public Date startTime;
	public Date endTime;
	

}
