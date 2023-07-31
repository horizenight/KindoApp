package demo;
import java.util.UUID;
class UserNotFoundException extends RuntimeException {

    UserNotFoundException(UUID id) {
        super("Could not find user " + id);
    }
}