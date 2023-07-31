package demo;

import lombok.Getter;
import lombok.Setter;


import jakarta.persistence.*;

import java.util.UUID;
import java.util.Objects;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserModel {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private UUID[] visited_places;
    private String[] favourite_category;
    private String[] live_location;
    private UUID[] recommendation;

    UserModel() {}
    UserModel(UUID id, String name, UUID[] visited_places, String[] favourite_category, String[] live_location, UUID[] recommendation) {
        this.id = id;
        this.name = name;
        this.visited_places = visited_places;
        this.favourite_category = favourite_category;
        this.live_location = live_location;
        this.recommendation = recommendation;
    }


    public UUID getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public UUID[] getVisitedPlaces() {return this.visited_places;}

    public String[] getFavourite_category() {return this.favourite_category;}

    public String[] getLive_location() {return this.live_location;}

    public UUID[] getRecommendation() {return this.recommendation;}


    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setVisitedPlaces(UUID[] visited_places){ this.visited_places = visited_places;}

    public void setFavourite_category(String[] favourite_category) {
        this.favourite_category = favourite_category;
    }

    public void setLive_location(String[] live_location) {
        this.live_location = live_location;
    }

    public void setRecommendation(UUID[] recommendation) {this.recommendation = recommendation;}



    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name, this.visited_places, this.favourite_category, this.live_location, this.recommendation);
    }

    @Override
    public String toString() {
        return "UserModel{" +
                "id=" + this.id +
                ", name='" + this.name + '\'' +
                ", visited_places=" + this.visited_places +
                ", favourite_category=" + this.favourite_category +
                ", live_location=" + this.live_location +
                ", recommendation=" + this.recommendation +
                '}';
    }
}