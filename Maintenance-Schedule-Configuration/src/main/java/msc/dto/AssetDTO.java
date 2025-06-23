package msc.dto;

public class AssetDTO {
    private Long assetId;
    private String name;
    private String type;
    private String status;

    // Constructors
    public AssetDTO() {}

    public AssetDTO(Long assetId, String name, String type, String status) {
        this.assetId = assetId;
        this.name = name;
        this.type = type;
        this.status = status;
    }

    // Getters and Setters
    public Long getAssetId() {
        return assetId;
    }

    public void setAssetId(Long assetId) {
        this.assetId = assetId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
