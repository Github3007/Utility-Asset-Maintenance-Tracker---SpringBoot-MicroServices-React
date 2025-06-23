package arhm.Test;

import arhm.model.Asset;
import arhm.model.Location;
import arhm.repository.AssetRepository;
import arhm.repository.LocationRepository;
import arhm.serviceImpl.AssetServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AssetServiceImplTest {

    @InjectMocks
    private AssetServiceImpl assetService;

    @Mock
    private AssetRepository assetRepository;

    @Mock
    private LocationRepository locationRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateAsset() {
        Asset asset = new Asset();
        
        when(assetRepository.save(asset)).thenReturn(asset);

        Asset result = assetService.createAsset(asset);
        assertEquals(asset, result);
    }

    @Test
    void testUpdateAsset_Success() {
        Asset asset = new Asset();
        asset.setAssetId(1L);

        when(assetRepository.findById(1L)).thenReturn(Optional.of(asset));
        when(assetRepository.save(asset)).thenReturn(asset);

        Asset result = assetService.updateAsset(1L, asset);
        assertEquals(asset, result);
    }

    @Test
    void testUpdateAsset_NotFound() {
        when(assetRepository.findById(1L)).thenReturn(Optional.empty());

        Asset asset = new Asset();
        assertThrows(ResponseStatusException.class, () -> assetService.updateAsset(1L, asset));
    }

    @Test
    void testGetAllAssets() {
        List<Asset> assets = Arrays.asList(new Asset(), new Asset());
        when(assetRepository.findAll()).thenReturn(assets);

        List<Asset> result = assetService.getAllAssets();
        assertEquals(2, result.size());
    }

    @Test
    void testGetAssetById_Success() {
        Asset asset = new Asset();
        when(assetRepository.findById(1L)).thenReturn(Optional.of(asset));

        Asset result = assetService.getAssetById(1L);
        assertEquals(asset, result);
    }

    @Test
    void testGetAssetById_NotFound() {
        when(assetRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> assetService.getAssetById(1L));
    }

    @Test
    void testGetAssetsByRegion() {
        List<Asset> assets = Arrays.asList(new Asset(), new Asset());
        when(assetRepository.findByRegion("South")).thenReturn(assets);

        List<Asset> result = assetService.getAssetsByRegion("South");
        assertEquals(2, result.size());
    }

    @Test
    void testRegisterLocation_Success() {
        Asset asset = new Asset();
        asset.setAssetId(1L);
        Location location = new Location();

        when(assetRepository.findById(1L)).thenReturn(Optional.of(asset));
        when(locationRepository.save(any(Location.class))).thenReturn(location);

        Location result = assetService.registerLocation(1L, location);
        assertEquals(location, result);
        assertEquals(asset, location.getAsset());
    }

    @Test
    void testRegisterLocation_AssetNotFound() {
        when(assetRepository.findById(1L)).thenReturn(Optional.empty());
        Location location = new Location();

        assertThrows(ResponseStatusException.class, () -> assetService.registerLocation(1L, location));
    }
}
