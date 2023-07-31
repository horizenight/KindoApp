package demo;

import lombok.Getter;
import lombok.Setter;


import jakarta.persistence.*;

import java.util.UUID;
import java.util.Objects;

@Entity
@Table(name = "place")
@Getter
@Setter
public class PlaceModel {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String description;
    private String image_url;
    private String image_caption;
    private String lat;
    private String lng;
    private int visit_count;

    private String category;

    private String short_description;
    private String teaser;

    PlaceModel() {}
    PlaceModel(UUID id, String name, String description, String image_url, String image_caption, String lat, String lng, int visit_count, String short_description, String category, String teaser) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image_url = image_url;
        this.image_caption = image_caption;
        this.lat = lat;
        this.lng = lng;
        this.visit_count = visit_count;
        this.short_description = short_description;
        this.category = category;
        this.teaser = teaser;
    }

    public UUID getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {return this.description;}

    public String getImage_url() {
        return this.image_url;
    }

    public String getImage_caption() {
        return this.image_caption;
    }

    public String getLat() {
        return this.lat;
    }

    public String getLng() {
        return this.lng;
    }

    public int getVisit_count() {
        return this.visit_count;
    }

    public String getShort_description() { return this.short_description; }

    public String getCategory() { return this.category; }

    public String getTeaser() { return this.teaser; }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description){ this.description = description;}

    public void setLat(String lat) {
        this.lat = lat;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public void setImage_caption(String image_caption) {
        this.image_caption = image_caption;
    }

    public void setVisit_count(int visit_count) {
        this.visit_count = visit_count;
    }

    public void setShort_description(String short_description) { this.short_description = short_description; }

    public void setCategory(String category) { this.category = category; }

    public void setTeaser(String teaser) { this.teaser = teaser; }





    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name, this.description, this.image_url, this.image_caption, this.lat, this.lng, this.short_description, this.category, this.teaser);
    }

    @Override
    public String toString() {
        return "Place{" + "id=" + this.id + ", name='" + this.name + '\'' + ", description='" + this.description + '\'' + ", image_url='" + this.image_url + ", image_caption='" + this.image_caption
                + '\'' + ", lat='" + this.lat + '\'' + ", lng='" + this.lng + ", short_description='" + this.short_description + ", category='" + this.category + ", teaser='" + this.teaser+ '}';
    }
}