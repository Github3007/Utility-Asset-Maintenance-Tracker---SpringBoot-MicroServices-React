package msc.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import msc.dto.AssetDTO;

@FeignClient(name = "ASSET-REGISTRATION-HIERARCHY-MANAGMENT")
public interface AssetClient {

    @GetMapping("/api/assets/{id}")
    AssetDTO getAssetById(@PathVariable("id") Long assetId);
}

