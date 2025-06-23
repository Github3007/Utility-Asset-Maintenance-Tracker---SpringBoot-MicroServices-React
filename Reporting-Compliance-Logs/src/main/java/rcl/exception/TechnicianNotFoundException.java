package rcl.exception;

public class TechnicianNotFoundException extends RuntimeException {
    public TechnicianNotFoundException(Long id) {
        super("Technician not found with ID: " + id);
    }
}
