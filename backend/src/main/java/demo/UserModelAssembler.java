package demo;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class UserModelAssembler implements RepresentationModelAssembler<UserModel, EntityModel<UserModel>> {

    @Override
    public EntityModel<UserModel> toModel(UserModel user) {

        return EntityModel.of(user, //
                linkTo(methodOn(UserController.class).one(user.getId())).withSelfRel(),
                linkTo(methodOn(UserController.class).all()).withRel("addUser"));
    }
}