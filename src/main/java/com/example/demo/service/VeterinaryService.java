package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.ClientDTO;
import com.example.demo.model.Veterinary;
import com.example.demo.model.VeterinaryDTO;
import com.example.demo.repository.IClientRepository;
import com.example.demo.repository.IVeterinaryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class VeterinaryService implements IVeterinaryService {
    @Autowired
    IVeterinaryRepository veterinaryRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void createVeterinary(VeterinaryDTO vet) {
        saveVeterinary(vet);
    }

    @Override
    public Veterinary buscar(String enrollment) {
        return veterinaryRepository.buscar(enrollment).get();
    }

    @Override
    public VeterinaryDTO readVeterinary(Long id) throws Exception {
        Optional<Veterinary> found = veterinaryRepository.findById(id);
        if(found.isPresent())
            return mapper.convertValue(found, VeterinaryDTO.class);
        else
            throw new Exception("Veterinary not exist");
    }

    @Override
    public void updateVeterinary(VeterinaryDTO vet) {
        saveVeterinary(vet);
    }

    private void saveVeterinary(VeterinaryDTO vet) {
        Veterinary newVeterinary = mapper.convertValue(vet, Veterinary.class);
        veterinaryRepository.save(newVeterinary);
    }

    @Override
    public void deleteVeterinary(Long id) {
        veterinaryRepository.deleteById(id);
    }

    @Override
    public Collection<Veterinary> getAll() {
        List<Veterinary> allVeterinaries = veterinaryRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        Set<VeterinaryDTO> allVeterinariesDTO = new HashSet<VeterinaryDTO>();
        for(Veterinary veterinary: allVeterinaries)
            allVeterinariesDTO.add(mapper.convertValue(veterinary,VeterinaryDTO.class));

        return allVeterinaries;
    }

//    @Override
//    public Set<VeterinaryDTO> getVeterinariesWithLastnameLike(String lastname) {
//        Set<Veterinary> allVeterinaries = veterinaryRepository.getVeterinaryByLastnameLike(lastname);
//        Set<VeterinaryDTO> allVeterinariesDTO = new HashSet<VeterinaryDTO>();
//        for(Veterinary veterinary: allVeterinaries)
//            allVeterinariesDTO.add(mapper.convertValue(veterinary,VeterinaryDTO.class));
//
//        return allVeterinariesDTO;
//    }
}
