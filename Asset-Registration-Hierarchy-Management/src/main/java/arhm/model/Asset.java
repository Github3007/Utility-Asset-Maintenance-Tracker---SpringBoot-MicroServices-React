package arhm.model;
 
import java.time.LocalDate;
 
import com.fasterxml.jackson.annotation.JsonBackReference;
 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assetId;
    private String name;
    private String type;
    private LocalDate installationDate;
    private String status;
 
    @OneToOne(mappedBy = "asset", cascade = CascadeType.ALL)
    @JsonBackReference
    private Location location;
}
 
 