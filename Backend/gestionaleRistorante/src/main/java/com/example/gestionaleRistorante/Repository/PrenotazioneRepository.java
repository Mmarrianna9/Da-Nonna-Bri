package com.example.gestionaleRistorante.Repository;
import com.example.gestionaleRistorante.Entity.Prenotazione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrenotazioneRepository extends JpaRepository<Prenotazione, Long> {

}
