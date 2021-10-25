package com.example.demo.controller;

import com.example.demo.model.Veterinary;
import com.example.demo.model.VeterinaryDTO;
import com.example.demo.service.IVeterinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/veterinaries")
public class VeterinaryController {
    @Autowired
    IVeterinaryService veterinaryService;

    @PostMapping()
    public ResponseEntity<?> addVeterinary(@RequestBody VeterinaryDTO vet) {
        veterinaryService.createVeterinary(vet);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public VeterinaryDTO getVeterinary(@PathVariable Long id) throws Exception {
        return veterinaryService.readVeterinary(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyVeterinary(@RequestBody VeterinaryDTO vet) {
        veterinaryService.updateVeterinary(vet);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeVeterinary(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        veterinaryService.deleteVeterinary(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

    @GetMapping("/list")
    public Collection<Veterinary> listVeterinaries() {
        return veterinaryService.getAll();
    }

//    @GetMapping("/getLastnameLike")
//    public Set<VeterinaryDTO> listVeterinaryWithLastnameLike(@RequestParam String lastname) {
//        return veterinaryService.getVeterinariesWithLastnameLike(lastname);
//    }
}
