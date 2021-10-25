package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.ClientDTO;
import com.example.demo.repository.IClientRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ClientService implements IClientService {
    @Autowired
    IClientRepository clientRepository;

    @Autowired
    ObjectMapper mapper;

    @Override
    public void createClient(ClientDTO cli) {
        saveClient(cli);
    }

    @Override
    public ClientDTO readClient(Long id) throws Exception {
        Optional<Client> found = clientRepository.findById(id);
        if(found.isPresent())
            return mapper.convertValue(found, ClientDTO.class);
        else
            throw new Exception("Client not exist");
    }

    @Override
    public Client buscar(String name_dog) {
        return clientRepository.buscar(name_dog).get();
    }

    @Override
    public void updateClient(ClientDTO cli) {
        saveClient(cli);
    }

    private void saveClient(ClientDTO cli) {
        try {
            Client newClient = mapper.convertValue(cli, Client.class);
            clientRepository.save(newClient);
        } catch (Exception e) {
            System.out.println("Something went wrong.");
        }
    }

    @Override
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public Collection<Client> getAll() {
        List<Client> allClients = clientRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        // TODO: ORDENAR PARA EL DTO
        Set<ClientDTO> allClientsDTO = new HashSet<>();
        for(Client client: allClients)
            allClientsDTO.add(mapper.convertValue(client,ClientDTO.class));

        return allClients;
    }

//    @Override
//    public Set<ClientDTO> getClientsWithOwnerLike(String owner) {
//        Set<Client> allClients = clientRepository.getClientByOwnerLike(owner);
//        Set<ClientDTO> allClientsDTO = new HashSet<>();
//        for(Client client: allClients)
//            allClientsDTO.add(mapper.convertValue(client,ClientDTO.class));
//
//        return allClientsDTO;
//    }
}
