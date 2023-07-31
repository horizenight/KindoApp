package demo;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class PathModelAssembler implements RepresentationModelAssembler<PathModel, EntityModel<PathModel>> {

    @Override
    public EntityModel<PathModel> toModel(PathModel path) {

        return EntityModel.of(path, //
                linkTo(methodOn(PathController.class).one(path.getId())).withSelfRel(),
                linkTo(methodOn(PathController.class).all()).withRel("addPath"));
    }
}