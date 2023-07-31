package demo;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "person")
@Getter
@Setter
public class PersonModel {
    @Id
    @GeneratedValue
    private UUID id;

    private String email;
    private String first_name;
    private String last_name;
}
