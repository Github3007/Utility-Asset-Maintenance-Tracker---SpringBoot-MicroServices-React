package arhm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import arhm.model.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location,Long>{
	
	//Location findByAsset_AssetId(Long assetId);

}


