package demo;
import java.util.UUID;
class AudioNotFoundException extends RuntimeException {

    AudioNotFoundException(UUID id) {
        super("Could not find audio " + id);
    }
}