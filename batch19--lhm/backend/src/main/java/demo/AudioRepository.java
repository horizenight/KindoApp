package demo;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AudioRepository extends JpaRepository<AudioModel, UUID> {
}