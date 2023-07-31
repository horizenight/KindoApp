package demo;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PathRepository extends JpaRepository<PathModel, UUID> {
}