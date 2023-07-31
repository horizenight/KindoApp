package demo;
import java.util.UUID;
class CategoryNotFoundException extends RuntimeException {

    CategoryNotFoundException(UUID id) {
        super("Could not find category " + id);
    }
}