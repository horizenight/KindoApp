package demo;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

@Component
class AudioModelAssembler implements RepresentationModelAssembler<AudioModel, EntityModel<AudioModel>> {

    @Override
    public EntityModel<AudioModel> toModel(AudioModel audio) {

        return EntityModel.of(audio, //
                linkTo(methodOn(AudioController.class).one(audio.getId())).withSelfRel(),
                linkTo(methodOn(AudioController.class).all()).withRel("addAudio"));
    }
}