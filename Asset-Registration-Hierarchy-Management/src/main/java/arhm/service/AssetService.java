package arhm.service;

import java.util.List;

import arhm.model.Asset;
import arhm.model.Location;

public interface AssetService {
	
	 	Asset createAsset(Asset asset);

	    Asset updateAsset(Long assetId, Asset asset) throws Exception;

	    List<Asset> getAllAssets();
	    
	    List<Location> getAllLocation();

      List<Asset> getAssetsByRegion(String region);

	    Asset getAssetById(Long assetId);
	    
	    Location registerLocation(Long assetId,Location location);

}
