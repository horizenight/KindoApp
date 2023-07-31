package demo;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class PlaceModelAssembler implements RepresentationModelAssembler<PlaceModel, EntityModel<PlaceModel>> {

    @Override
    public EntityModel<PlaceModel> toModel(PlaceModel place) {

        return EntityModel.of(place, //
                linkTo(methodOn(PlaceController.class).one(place.getId())).withSelfRel(),
                linkTo(methodOn(PlaceController.class).all()).withRel("addPlace"));
    }
}