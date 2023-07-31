package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.hateoas.*;
import java.util.UUID;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Collections;

@RestController
public class AudioController {

    private AudioRepository audioRepository;
    private final AudioModelAssembler assembler;
    @Autowired
    public AudioController(AudioRepository audioRepository, AudioModelAssembler assembler) {
        this.audioRepository = audioRepository;
        this.assembler = assembler;
    }

    @GetMapping("/audios/{id}")
    @CrossOrigin()
    AudioModel one(@PathVariable UUID id) {

        return audioRepository.findById(id)
                .orElseThrow(() -> new AudioNotFoundException(id));
    }

    @GetMapping("/api/audios/all")
    Iterable<AudioModel> all() {
        return audioRepository.findAll();
    }
    
    @GetMapping("/getSound/{id}")
    @CrossOrigin()
    public ResponseEntity<String> getAudio(@PathVariable UUID id) {
    AudioModel audioData = audioRepository.findById(id).orElse(null);
    if (audioData == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    byte[] audio = audioData.getAudio();
    if (audio == null) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    ObjectMapper objectMapper = new ObjectMapper();
    String jsonResponse;
    try {
        jsonResponse = objectMapper.writeValueAsString(Collections.singletonMap("audioData", audio));
    } catch (JsonProcessingException e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return ResponseEntity.ok(jsonResponse);
    }

    @PutMapping("/editAudio/{id}")
    ResponseEntity<?> editAudio(@RequestBody AudioModel newAudio, @PathVariable UUID id) {

        AudioModel updatedAudio = audioRepository.findById(id) //
                .map(audio -> {
                    audio.setAudio(newAudio.getAudio());
                    return audioRepository.save(audio);
                }) //
                .orElseGet(() -> {
                    newAudio.setId(id);
                    return audioRepository.save(newAudio);
                });

        EntityModel<AudioModel> entityModel = assembler.toModel(updatedAudio);

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @PostMapping("/addAudio")
    @CrossOrigin()
    ResponseEntity<?> newAudio(@RequestBody AudioModel newAudio) {

        EntityModel<AudioModel> entityModel = assembler.toModel(audioRepository.save(newAudio));

        return ResponseEntity //
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

}