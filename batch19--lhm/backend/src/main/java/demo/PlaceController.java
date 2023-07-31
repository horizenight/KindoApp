package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.*;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@RestController
public class PlaceController {

    private PlaceRepository placeRepository;
    private final PlaceModelAssembler assembler;
    @Autowired
    public PlaceController(PlaceRepository placeRepository, PlaceModelAssembler assembler) {
        this.placeRepository = placeRepository;
        this.assembler = assembler;
    }

    @GetMapping("/places/{id}")
    @CrossOrigin()
    PlaceModel one(@PathVariable UUID id) {

        return placeRepository.findById(id)
                .orElseThrow(() -> new PlaceNotFoundException(id));
    }
    @GetMapping("/api/place/all")
    @CrossOrigin()
   List<Map<String, Object>> all() {
    Iterable<PlaceModel> places = placeRepository.findAll();

    List<Map<String, Object>> placeDTOs = new ArrayList<>();
    for (PlaceModel place : places) {
        Map<String, Object> placeDTO = new TreeMap<>();
        placeDTO.put("id", place.getId());
        placeDTO.put("name", place.getName());
        placeDTO.put("description", place.getDescription());
        placeDTO.put("imageUrl", place.getImage_url());
        placeDTO.put("imageCaption", place.getImage_caption());
        placeDTO.put("lat", place.getLat());
        placeDTO.put("lng", place.getLng());
        placeDTO.put("visitCount", place.getVisit_count());
        placeDTO.put("category", place.getCategory());
        placeDTO.put("shortDescription", place.getShort_description());
        placeDTO.put("teaser", place.getTeaser());

        placeDTOs.add(placeDTO);
    }

    return placeDTOs;
}

    @PostMapping("/addplace")
    @CrossOrigin()
    ResponseEntity<?> addPlace(@RequestBody PlaceModel newPlace) {
        PlaceModel savedPlace = placeRepository.save(newPlace);

        EntityModel<PlaceModel> entityModel = assembler.toModel(savedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PostMapping("/addImageUrl")
    @CrossOrigin()
    ResponseEntity<?> addImageUrl(@RequestBody PlaceModel newPlace) {
        PlaceModel savedPlace = placeRepository.save(newPlace);

        EntityModel<PlaceModel> entityModel = assembler.toModel(savedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }



    @DeleteMapping("/removePlace/{id}")
    @CrossOrigin()
    ResponseEntity<?> deletePlace(@PathVariable UUID id) {
        placeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getDescription/{id}")
    @CrossOrigin()
    ResponseEntity<String> getDescription(@PathVariable UUID id) {
        PlaceModel place = placeRepository.findById(id).orElseThrow(() -> new PlaceNotFoundException(id));
        String description = place.getDescription();
        return ResponseEntity.ok(description);
    }

    @GetMapping("/getImageUrl/{id}")
    @CrossOrigin()
    ResponseEntity<String> getImageUrl(@PathVariable UUID id) {
        PlaceModel place = placeRepository.findById(id).orElseThrow(() -> new PlaceNotFoundException(id));
        String imageUrl = place.getImage_url();
        return ResponseEntity.ok(imageUrl);
    }

    @GetMapping("/getTeaser/{id}")
    @CrossOrigin()
    ResponseEntity<String> getTeaser(@PathVariable UUID id) {
        PlaceModel place = placeRepository.findById(id).orElseThrow(() -> new PlaceNotFoundException(id));
        String teaser = place.getTeaser();
        return ResponseEntity.ok(teaser);
    }

    @PutMapping("/editShortDescription/{id}")
    @CrossOrigin()
    ResponseEntity<?> replacePlace(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setShort_description(newPlace.getShort_description());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editDescription/{id}")
    @CrossOrigin()
    ResponseEntity<?> replaceDesc(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setDescription(newPlace.getDescription());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editCategory/{id}")
    @CrossOrigin()
    ResponseEntity<?> editCategory(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setCategory(newPlace.getCategory());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editTeaser/{id}")
    @CrossOrigin()
    ResponseEntity<?> editTeaser(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setTeaser(newPlace.getTeaser());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editVisitCount/{id}")
    @CrossOrigin()
    ResponseEntity<?> editVisitCount(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id)
                .map(place -> {
                    place.setVisit_count(newPlace.getVisit_count());
                    return placeRepository.save(place);
                })
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editImageUrl/{id}")
    @CrossOrigin()
    ResponseEntity<?> editImageUrl(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setImage_url(newPlace.getImage_url());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editImageCaption/{id}")
    @CrossOrigin()
    ResponseEntity<?> editImageCaption(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setImage_caption(newPlace.getImage_caption());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PutMapping("/editPlace/{id}")
    @CrossOrigin()
    ResponseEntity<?> editPlace(@RequestBody PlaceModel newPlace, @PathVariable UUID id) {

        PlaceModel updatedPlace = placeRepository.findById(id) //
                .map(place -> {
                    place.setName(newPlace.getName());
                    place.setDescription(newPlace.getDescription());
                    place.setLng(newPlace.getLng());
                    place.setLat(newPlace.getLat());
                    place.setImage_url(newPlace.getImage_url());
                    place.setImage_caption(newPlace.getImage_caption());
                    place.setCategory(newPlace.getCategory());
                    place.setTeaser(newPlace.getTeaser());
                    return placeRepository.save(place);
                }) //
                .orElseGet(() -> {
                    newPlace.setId(id);
                    return placeRepository.save(newPlace);
                });

        EntityModel<PlaceModel> entityModel = assembler.toModel(updatedPlace);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

}