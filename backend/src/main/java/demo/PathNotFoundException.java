package demo;
import java.util.UUID;
class PathNotFoundException extends RuntimeException {

    PathNotFoundException(UUID id) {
        super("Could not find path " + id);
    }
}