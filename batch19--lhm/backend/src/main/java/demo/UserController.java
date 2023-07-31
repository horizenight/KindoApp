package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.*;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Arrays;

@RestController
public class UserController {

    private UserRepository userRepository;
    private final UserModelAssembler assembler;

    @Autowired
    public UserController(UserRepository userRepository, UserModelAssembler assembler) {
        this.userRepository = userRepository;
        this.assembler = assembler;
    }

    @GetMapping("/users/{id}")
    @CrossOrigin()
    UserModel one(@PathVariable UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/api/user/all")
    @CrossOrigin()
    Iterable<UserModel> all() {
        return userRepository.findAll();
    }

    // GET methods for individual fields

    @GetMapping("/users/{id}/name")
    @CrossOrigin()
    String getName(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(UserModel::getName)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/users/{id}/visited_places")
    @CrossOrigin()
    UUID[] getVisitedPlaces(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(UserModel::getVisitedPlaces)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/users/{id}/favourite_category")
    @CrossOrigin()
    String[] getFavouriteCategory(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(UserModel::getFavourite_category)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/users/{id}/live_location")
    @CrossOrigin()
    String[] getLiveLocation(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(UserModel::getLive_location)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    @GetMapping("/users/{id}/recommendation")
    @CrossOrigin()
    UUID[] getRecommendation(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(UserModel::getRecommendation)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // PUT methods for individual fields

    @PutMapping("/users/{id}/name")
    @CrossOrigin()
    ResponseEntity<?> updateName(@RequestBody String newName, @PathVariable UUID id) {
        UserModel updatedUser = userRepository.findById(id)
                .map(user -> {
                    user.setName(newName);
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    UserModel newUser = new UserModel();
                    newUser.setId(id);
                    newUser.setName(newName);
                    return userRepository.save(newUser);
                });

        EntityModel<UserModel> entityModel = assembler.toModel(updatedUser);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/users/{id}/visited_places")
    @CrossOrigin()
    ResponseEntity<?> updateVisitedPlaces(@RequestBody UUID[] newVisitedPlaces, @PathVariable UUID id) {
        UserModel updatedUser = userRepository.findById(id)
                .map(user -> {
                    user.setVisitedPlaces(newVisitedPlaces);
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    UserModel newUser = new UserModel();
                    newUser.setId(id);
                    newUser.setVisitedPlaces(newVisitedPlaces);
                    return userRepository.save(newUser);
                });

        EntityModel<UserModel> entityModel = assembler.toModel(updatedUser);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/users/{id}/favourite_category")
    @CrossOrigin()
    ResponseEntity<?> updateFavouriteCategory(@RequestBody String[] newFavouriteCategory, @PathVariable UUID id) {
        UserModel updatedUser = userRepository.findById(id)
                .map(user -> {
                    user.setFavourite_category(newFavouriteCategory);
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    UserModel newUser = new UserModel();
                    newUser.setId(id);
                    newUser.setFavourite_category(newFavouriteCategory);
                    return userRepository.save(newUser);
                });

        EntityModel<UserModel> entityModel = assembler.toModel(updatedUser);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/users/{id}/live_location")
    @CrossOrigin()
    ResponseEntity<?> updateLiveLocation(@RequestBody String[] newLiveLocation, @PathVariable UUID id) {
        UserModel updatedUser = userRepository.findById(id)
                .map(user -> {
                    user.setLive_location(newLiveLocation);
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    UserModel newUser = new UserModel();
                    newUser.setId(id);
                    newUser.setLive_location(newLiveLocation);
                    return userRepository.save(newUser);
                });

        EntityModel<UserModel> entityModel = assembler.toModel(updatedUser);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/users/{id}/recommendation")
    @CrossOrigin()
    ResponseEntity<?> updateRecommendation(@RequestBody UUID[] newRecommendation, @PathVariable UUID id) {
        UserModel updatedUser = userRepository.findById(id)
                .map(user -> {
                    user.setRecommendation(newRecommendation);
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    UserModel newUser = new UserModel();
                    newUser.setId(id);
                    newUser.setRecommendation(newRecommendation);
                    return userRepository.save(newUser);
                });

        EntityModel<UserModel> entityModel = assembler.toModel(updatedUser);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }
}
