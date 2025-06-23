package auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import auth.entity.UserInfo;
import java.util.Optional;
@Repository
public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
	
	@Query("select ui from UserInfo as ui where ui.email=?1")
    Optional<UserInfo> findByEmail(String email);

}
