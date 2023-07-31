package demo;

import lombok.Getter;
import lombok.Setter;


import jakarta.persistence.*;

import java.util.UUID;
import java.util.Objects;

@Entity
@Table(name = "path")
@Getter
@Setter
public class PathModel {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;
    private String headline;
    private String[] places;

    PathModel() {}
    PathModel(UUID id, String name, String description, String headline, String[] places) {
        this.id = id;
        this.name = name;
        this.headline = headline;
        this.description = description;
        this.places = places;
    }

    public UUID getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {return this.description;}

    public String getHeadline() {return this.headline;}

    public String[] getPlaces() {
        return this.places;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description){ this.description = description;}

    public void setHeadline(String headline){ this.headline = headline;}

    public void setPlaces(String[] places) {
        this.places = places;
    }


    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name, this.description, this.headline, this.places);
    }

    @Override
    public String toString() {
        return "Place{" + "id=" + this.id + ", name='" + this.name + '\'' + ", description='" + this.description + '\'' + ", headline='" + this.headline + '\'' + ", places='" + this.places
                + '}';
    }
}