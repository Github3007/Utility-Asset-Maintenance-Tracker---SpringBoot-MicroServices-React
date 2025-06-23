package rcl.exception;

public class MaintenancePlanNotFoundException extends RuntimeException {
    public MaintenancePlanNotFoundException(Long id) {
        super("Maintenance plan not found with ID: " + id);
    }
}
