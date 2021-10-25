package com.example.demo.controller;

import com.example.demo.model.Client;
import com.example.demo.model.ClientDTO;
import com.example.demo.service.IClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Set;

@RestController
@RequestMapping("/clients")
public class ClientController {
    @Autowired
    IClientService clientService;

    @PostMapping()
    public ResponseEntity<?> addClient(@RequestBody ClientDTO cli) {
        clientService.createClient(cli);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ClientDTO getClient(@PathVariable Long id) throws Exception {
        return clientService.readClient(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modifyClient(@RequestBody ClientDTO cli) {
        clientService.updateClient(cli);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeClient(@PathVariable Long id) {
        ResponseEntity<String> response = null;
        clientService.deleteClient(id);
        response = ResponseEntity.status(HttpStatus.OK).body("Eliminado");
        return response;
    }

    @GetMapping("/list")
    public Collection<Client> listClients() {
        return clientService.getAll();
    }

//    @GetMapping("/getLastnameLike")
//    public Set<ClientDTO> listClientWithOwnerLike(@RequestParam String owner) {
//        return clientService.getClientsWithOwnerLike(owner);
//    }
}
