package com.example.gestionaleRistorante.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestionaleRistorante.Entity.Piatto;

public interface PiattoRepository  extends JpaRepository<Piatto,Long>{
    

}
