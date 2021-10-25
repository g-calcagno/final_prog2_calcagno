package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Veterinaries")
@Getter
@Setter
public class Veterinary {
    @Id
    @SequenceGenerator(name = "veterinary_sequence", sequenceName = "veterinary_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "veterinary_sequence")
    private Long id;

    private String name;
    private String lastname;
    private String enrollment;

    public Veterinary() {

    }

    public Veterinary(String name, String lastname, String enrollment) {
        this.name = name;
        this.lastname = lastname;
        this.enrollment = enrollment;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(String enrollment) {
        this.enrollment = enrollment;
    }

    public Veterinary setear(Veterinary veterinary) {
        this.name = veterinary.getName();
        this.lastname = veterinary.getLastname();
        this.enrollment = veterinary.getEnrollment();
        return veterinary;
    }

    // ToString
    @Override
    public String toString() {
        return "Veterinario{" +
                "id=" + id +
                ", nombre='" + name + '\'' +
                ", apellido='" + lastname + '\'' +
                ", matricula=" + enrollment +
                '}';
    }
}
