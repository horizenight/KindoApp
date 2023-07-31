package demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@RestController
public class PersonController {

    private PersonRepository personRepository;

    @Autowired
    public PersonController(PersonRepository personRespository) {
        this.personRepository = personRespository;
    }

    @GetMapping("/api/person/all")
    Iterable<PersonModel> all() {
        System.out.println("Testing logging to console");
        return personRepository.findAll();
    }

    @GetMapping("/api/person/{id}")
    PersonModel userById(@PathVariable UUID id) {
        return personRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND));
    }

    @PostMapping("/api/person/save")
    PersonModel save(@RequestBody PersonModel user) {
        return personRepository.save(user);
    }

}