package com.example.demo.service;
import com.example.demo.model.Client;
import com.example.demo.model.Veterinary;
import com.example.demo.model.VeterinaryDTO;
import org.springframework.data.jdbc.repository.query.Query;

import java.util.Collection;
import java.util.Set;

public interface IVeterinaryService {
    void createVeterinary(VeterinaryDTO vet);
    VeterinaryDTO readVeterinary(Long id) throws Exception;
    void updateVeterinary(VeterinaryDTO vet);

    @Query("delete from Veterinary t where t.id = ?1")
    void deleteVeterinary(Long id);

    Veterinary buscar(String name_dog);

    Collection<Veterinary> getAll();
    //Set<VeterinaryDTO> getVeterinariesWithLastnameLike(String lastname);
}
