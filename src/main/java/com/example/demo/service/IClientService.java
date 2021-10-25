package com.example.demo.service;

import com.example.demo.model.Client;
import com.example.demo.model.ClientDTO;

import java.util.Collection;
import java.util.Set;

public interface IClientService {
    void createClient(ClientDTO cli);
    ClientDTO readClient(Long id) throws Exception;
    void updateClient(ClientDTO cli);
    void deleteClient(Long id);

    Client buscar(String name_dog);

    Collection<Client> getAll();
    //Set<ClientDTO> getClientsWithOwnerLike(String owner);
}
