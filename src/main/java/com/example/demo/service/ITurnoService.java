package com.example.demo.service;

import com.example.demo.model.Turno;
import com.example.demo.model.TurnoDTO;

import java.util.Collection;
import java.util.List;

public interface ITurnoService {
    //void createTurno(Turno tur);
    TurnoDTO readTurno(Long id) throws Exception;
    void updateTurno(Turno tur);
    void deleteTurno(Long id);
    Turno guardar(Turno tur);

    List<Turno> listar();
    //Collection<Turno> getAll();
//    Set<TurnoDTO> getClientsWithOwnerLike(String owner);
}
