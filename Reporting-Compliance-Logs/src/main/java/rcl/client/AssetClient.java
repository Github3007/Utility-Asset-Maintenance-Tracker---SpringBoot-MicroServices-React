package rcl.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import rcl.dto.AssetDTO;

@FeignClient(name="Asset-Registration-hierarchy-managment")
public interface AssetClient {

	@GetMapping("/api/assets/{id}")
	public AssetDTO getAssetById(@PathVariable("id") Long assetId);
}
