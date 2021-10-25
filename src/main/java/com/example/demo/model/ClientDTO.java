package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Getter
@Setter
public class ClientDTO {
    private Long id;

    private String owner;
    private String name_dog;
    private String race_dog;
}
