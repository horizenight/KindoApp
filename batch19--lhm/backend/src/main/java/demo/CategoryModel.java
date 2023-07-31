package demo;

import lombok.Getter;
import lombok.Setter;


import jakarta.persistence.*;

import java.util.UUID;
import java.util.Objects;

@Entity
@Table(name = "category")
@Getter
@Setter
public class CategoryModel {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String icon;

    CategoryModel() {}
    CategoryModel(UUID id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;

    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public UUID getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getIcon() {
        return this.icon;
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name, this.icon);
    }

    @Override
    public String toString() {
        return "Category{" + "id=" + this.id + ", name='" + this.name + '\'' + ", icon='" + this.icon + '}';
    }
}