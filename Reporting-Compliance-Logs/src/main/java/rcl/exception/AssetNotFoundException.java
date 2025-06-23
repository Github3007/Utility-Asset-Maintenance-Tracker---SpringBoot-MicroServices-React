package rcl.exception;

public class AssetNotFoundException extends RuntimeException {
    public AssetNotFoundException(Long id) {
        super("Asset not found with ID: " + id);
    }
}
