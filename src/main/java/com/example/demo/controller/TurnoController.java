package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/turnos")
public class TurnoController {
//    @Autowired
//    ITurnoService turnoService;
    @Autowired
    private TurnoService turnoService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private VeterinaryService veterinaryService;

    @PostMapping()
    public ResponseEntity<Turno> addTurno(@RequestBody Turno turno) {
        ResponseEntity<Turno> response = null;
        if (turno != null) {
            Client dog = clientService.buscar(turno.getClient().getNameDog());
            turno.setClient(dog);
            Veterinary veterinary = veterinaryService.buscar(turno.getVeterinary().getEnrollment());
            turno.setVeterinary(veterinary);
            response = ResponseEntity.ok(turnoService.guardar(turno));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @GetMapping(value = "/list")
    public ResponseEntity<List<Turno>> listar() {
        return ResponseEntity.ok(turnoService.listar());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeTurno(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        turnoService.deleteTurno(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

    @GetMapping("/{id}")
    public TurnoDTO getTurno(@PathVariable Long id) throws Exception {
        return turnoService.readTurno(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyTurno(@RequestBody Turno turno) {
        ResponseEntity<Turno> response = null;
        if (turno != null) {
            Client dog = clientService.buscar(turno.getClient().getNameDog());
            turno.setClient(dog);
            Veterinary veterinary = veterinaryService.buscar(turno.getVeterinary().getEnrollment());
            turno.setVeterinary(veterinary);
            response = ResponseEntity.ok(turnoService.guardar(turno));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
        //turnoService.updateTurno(tur);
        //return ResponseEntity.ok(HttpStatus.OK);
    }

//    @GetMapping("/list")
//    public Collection<Turno> listTurnos() {
//        return turnoService.getAll();
//    }

//    @GetMapping("/getLastnameLike")
//    public Set<TurnoDTO> listTurnoWithOwnerLike(@RequestParam String owner) {
//        return turnoService.getClientsWithOwnerLike(owner);
//    }
}
