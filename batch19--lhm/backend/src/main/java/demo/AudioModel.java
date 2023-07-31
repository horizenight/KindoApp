package demo;

import lombok.Getter;
import lombok.Setter;


import jakarta.persistence.*;

import java.util.UUID;
import java.util.Objects;

@Entity
@Table(name = "audio")
@Getter
@Setter
public class AudioModel {
    @Id
    private UUID id;
    private byte[] audio;

    AudioModel() {}
    AudioModel(UUID id, byte[] audio) {
        this.id = id;
        this.audio = audio;
    }

    public UUID getId() {
        return this.id;
    }
    public byte[] getAudio() { return this.audio; }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setAudio(byte[] audio) { this.audio = audio; }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.audio);
    }

    @Override
    public String toString() {
        return "Audio{" + "id=" + this.id + ", audio='" + this.audio + '}';
    }
}