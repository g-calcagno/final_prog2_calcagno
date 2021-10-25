package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Calendar;

@Getter
@Setter
public class TurnoDTO {
    private Long id;

    private Client client;
    private Veterinary veterinary;

    private Timestamp shift_date;
}
