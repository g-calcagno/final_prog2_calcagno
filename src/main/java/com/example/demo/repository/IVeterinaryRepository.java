package com.example.demo.repository;

import com.example.demo.model.Veterinary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IVeterinaryRepository extends JpaRepository<Veterinary, Long> {
    @Query("SELECT o FROM Veterinary o WHERE o.enrollment = ?1")
    Optional<Veterinary> buscar(String enrollment);

//    @Query("from Veterinary v where v.lastname like %:lastname%")
//    Set<Veterinary> getVeterinaryByLastnameLike(@Param("lastname") String lastname);
}
