package demo;
import java.util.UUID;
class PlaceNotFoundException extends RuntimeException {

    PlaceNotFoundException(UUID id) {
        super("Could not find place " + id);
    }
}