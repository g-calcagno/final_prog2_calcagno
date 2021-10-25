package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Clients")
@Getter
@Setter
public class Client {
    @Id
    @SequenceGenerator(name = "client_sequence", sequenceName = "client_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "client_sequence")
    private Long id;

    private String owner;
    private String name_dog;
    private String race_dog;

    public Client() {

    }

    public Client(String owner, String name_dog, String race_dog) {
        this.owner = owner;
        this.name_dog = name_dog;
        this.race_dog = race_dog;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public String getOwner() {
        return owner;
    }

    public void setNameDog(String name_dog) {
        this.name_dog = name_dog;
    }

    public String getNameDog() {
        return name_dog;
    }

    public String getRaceDog() {
        return race_dog;
    }

    public void setRaceDog(String race_dog) {
        this.race_dog = race_dog;
    }

    public Client getAllInfo(Client client) {
        this.owner = client.getOwner();
        this.name_dog = client.getNameDog();
        this.race_dog = client.getRaceDog();
        return client;
    }
}
