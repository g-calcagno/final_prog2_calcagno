package com.example.demo.service;

import com.example.demo.model.Turno;
import com.example.demo.model.TurnoDTO;
import com.example.demo.repository.IClientRepository;
import com.example.demo.repository.ITurnoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TurnoService implements ITurnoService {
    private final ITurnoRepository turnoRepository;

    @Autowired
    ObjectMapper mapper;


    @Autowired
    public TurnoService(ITurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    /* Buscar todos los turnos */
    @Override
    public List<Turno> listar() {
        return turnoRepository.findAll();
    }

    /* Guardar un nuevo turno */
    @Override
    public Turno guardar(Turno turno) {
        if (turno != null) {
            return turnoRepository.save(turno);
        }
        return new Turno();
    }

//    @Override
//    public void createTurno(Turno tur) {
//        saveTurno(tur);
//    }
//
    @Override
    public TurnoDTO readTurno(Long id) throws Exception {
        Optional<Turno> found = turnoRepository.findById(id);
        if(found.isPresent())
            return mapper.convertValue(found, TurnoDTO.class);
        else
            throw new Exception("Turno not exist");
    }
//
    @Override
    public void updateTurno(Turno tur) {
        guardar(tur);
    }
//
//    private void saveTurno(Turno tur) {
//        try {
//            Turno newTurno = mapper.convertValue(tur, Turno.class);
//            turnoRepository.save(newTurno);
//        } catch (Exception e) {
//            System.out.println("Something went wrong.");
//        }
//    }
//
    @Override
    public void deleteTurno(Long id) {
        turnoRepository.deleteById(id);
    }
//
//    @Override
//    public Collection<Turno> getAll() {
//        List<Turno> allTurnos = turnoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
////        Set<TurnoDTO> allTurnosDTO = new HashSet<>();
////        for(Turno turno: allTurnos)
////            allTurnosDTO.add(mapper.convertValue(turno,TurnoDTO.class));
//
//        return allTurnos;
//    }

//    @Override
//    public Set<TurnoDTO> getTurnoWithOwnerLike(String owner) {
//        Set<Turno> allTurnos = turnoRepository.getTurnoByOwnerLike(owner);
//        Set<TurnoDTO> allTurnosDTO = new HashSet<>();
//        for(Turno turno: allTurnos)
//            allTurnosDTO.add(mapper.convertValue(turno,TurnoDTO.class));
//
//        return allTurnosDTO;
//    }
}
