package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.*;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
public class PathController {

    private PathRepository pathRepository;
    private final PathModelAssembler assembler;
    @Autowired
    public PathController(PathRepository pathRepository, PathModelAssembler assembler) {
        this.pathRepository = pathRepository;
        this.assembler = assembler;
    }

    @GetMapping("/path/{id}")
    @CrossOrigin()
    PathModel one(@PathVariable UUID id) {

        return pathRepository.findById(id)
                .orElseThrow(() -> new PathNotFoundException(id));
    }
    @GetMapping("/api/path/all")
    @CrossOrigin()
    Iterable<PathModel> all() {
        return pathRepository.findAll();
    }

    @PostMapping("/addPath")
    @CrossOrigin()
    ResponseEntity<?> newPath(@RequestBody PathModel newPath) {

        EntityModel<PathModel> entityModel = assembler.toModel(pathRepository.save(newPath));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @DeleteMapping("/removePath/{id}")
    @CrossOrigin()
    ResponseEntity<?> deletePath(@PathVariable UUID id) {
        pathRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/editPath/{id}")
    @CrossOrigin()
    ResponseEntity<?> editPath(@RequestBody PathModel newPath, @PathVariable UUID id) {

        PathModel updatedPath = pathRepository.findById(id) //
                .map(path -> {
                    path.setName(newPath.getName());
                    path.setDescription(newPath.getDescription());
                    path.setHeadline(newPath.getHeadline());
                    path.setPlaces(newPath.getPlaces());
                    return pathRepository.save(path);
                }) //
                .orElseGet(() -> {
                    newPath.setId(id);
                    return pathRepository.save(newPath);
                });

        EntityModel<PathModel> entityModel = assembler.toModel(updatedPath);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }
}