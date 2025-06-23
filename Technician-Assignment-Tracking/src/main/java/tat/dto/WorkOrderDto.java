package tat.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkOrderDto {
	
	private long workOrderId;
	private long planId;
	private Date scheduledDate;
	private String status;

}
