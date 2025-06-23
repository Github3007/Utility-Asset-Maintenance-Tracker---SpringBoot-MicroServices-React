package arhm.controlller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import arhm.model.Asset;
import arhm.model.Location;
import arhm.service.AssetService;



@RestController
@RequestMapping("/api/assets")
public class AssetController {
	
	@Autowired
	private AssetService assetService;
	
	
	@GetMapping("/test")
	public String result() {
		return "I got it";
	}

	@PostMapping
	public Asset createAsset(@RequestBody Asset asset) {
		return assetService.createAsset(asset);
	}
	
	@GetMapping
	public List<Asset> getAllAssets(){
		return assetService.getAllAssets();
	}
	
	@GetMapping("/{id}")
	public Asset getAssetById(@PathVariable Long id) {
		return assetService.getAssetById(id);
	}
	
      
	  @PutMapping("/{id}")
      public Asset updateAssetById(@PathVariable("id") Long assetId,@RequestBody Asset asset) throws Exception  {
		 
    	 return assetService.updateAsset(assetId, asset);
		 
        }
	  
	  @GetMapping("/location")
	  public List<Asset> getAssetByRegion(@RequestParam String region){
		  
		  return assetService.getAssetsByRegion(region);
	  }
	  @GetMapping("/alllocations")
		public List<Location> getAllLocation(){
			return assetService.getAllLocation();
		}
		
	  
	  @PostMapping("/location/{assetId}")
	  public Location registerLocation(@PathVariable Long assetId,@RequestBody Location location)  {
		  return assetService.registerLocation(assetId,location);
	  }




	

}
