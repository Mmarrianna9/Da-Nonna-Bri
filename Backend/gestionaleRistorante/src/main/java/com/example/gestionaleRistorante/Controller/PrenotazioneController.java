package com.example.gestionaleRistorante.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionaleRistorante.Entity.Prenotazione;
import com.example.gestionaleRistorante.Repository.PrenotazioneRepository;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/prenotazioni")
public class PrenotazioneController {

@Autowired
    private PrenotazioneRepository prenotazioneRepository;

    // Prende tutte le prenotazioni (per la Dashboard della Nonna)
    @GetMapping
    public List<Prenotazione> getAllPrenotazioni() {
        return prenotazioneRepository.findAll();
    }

    // Salva una nuova prenotazione (dal form del Cliente)
    @PostMapping
    public Prenotazione createPrenotazione(@RequestBody Prenotazione prenotazione) {
        return prenotazioneRepository.save(prenotazione);
    }

    // Opzionale: permette alla Nonna di cancellare una prenotazione fatta
    @DeleteMapping("/{id}")
    public void eliminaPrenotazione(@PathVariable Long id) {
        prenotazioneRepository.deleteById(id);
    }
}
