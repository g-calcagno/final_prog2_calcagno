package com.example.demo.repository;

import com.example.demo.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IClientRepository extends JpaRepository<Client, Long> {
    @Query("SELECT o FROM Client o WHERE o.name_dog = ?1")
    Optional<Client> buscar(String name_dog);
//    @Query("from Client c where c.owner like %:owner%")
//    Set<Client> getClientByOwnerLike(@Param("owner") String owner);

}
