package arhm.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import arhm.model.Asset;
@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {

     @Query("select a from Asset a where a.location.region=?1")
     List<Asset> findByRegion(String region);


}
