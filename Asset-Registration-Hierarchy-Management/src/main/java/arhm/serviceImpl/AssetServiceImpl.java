package arhm.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import arhm.model.Asset;
import arhm.model.Location;
import arhm.repository.AssetRepository;
import arhm.repository.LocationRepository;
import arhm.service.AssetService;
@Service
public class AssetServiceImpl implements AssetService {
	
	@Autowired
	private AssetRepository assetRepository;
	@Autowired
	private LocationRepository locationRepository;

	@Override
	public Asset createAsset(Asset asset) {
		
		return assetRepository.save(asset);
	}

//	@Override
//	public Asset updateAsset(Long assetId, Asset asset) throws Exception {
//		
//		Asset asset1= assetRepository.findById(assetId).orElse(null);
//		if (asset1==null) {
//			throw new Exception("Asset not found");
//		}
//		asset.setAssetId(assetId);
//		return assetRepository.save(asset);
//	}
	
	@Override
	public Asset updateAsset(Long assetId, Asset asset) {
	    Asset asset1 = assetRepository.findById(assetId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found"));
	    
	    asset.setAssetId(assetId);
	    return assetRepository.save(asset);
	}


	@Override
	public List<Asset> getAllAssets() {
		
		return assetRepository.findAll();
	}
	
	@Override
	public List<Location> getAllLocation() {
		
		return locationRepository.findAll();
	}
	
	@Override
	public Asset getAssetById(Long assetId) {
		
		return assetRepository.findById(assetId)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found"));
	}

	@Override
	public List<Asset> getAssetsByRegion(String region) {
		
		return assetRepository.findByRegion(region);
	}

	@Override
	public Location registerLocation(Long assetId, Location location) {
		Asset asset=assetRepository.findById(assetId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found"));
//		 if (asset == null) {
//		        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Asset not found");
//		    }
		location.setAsset(asset);
		return locationRepository.save(location);
		
		
	}

}
