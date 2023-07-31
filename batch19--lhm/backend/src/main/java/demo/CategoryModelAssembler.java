package demo;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class CategoryModelAssembler implements RepresentationModelAssembler<CategoryModel, EntityModel<CategoryModel>> {

    @Override
    public EntityModel<CategoryModel> toModel(CategoryModel category) {

        return EntityModel.of(category, //
                linkTo(methodOn(CategoryController.class).one(category.getId())).withSelfRel(),
                linkTo(methodOn(CategoryController.class).all()).withRel("addCategory"));
    }
}