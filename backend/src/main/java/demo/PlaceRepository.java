package demo;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<PlaceModel, UUID> {
}