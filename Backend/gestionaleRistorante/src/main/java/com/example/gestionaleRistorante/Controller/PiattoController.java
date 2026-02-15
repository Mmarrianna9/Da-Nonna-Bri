package com.example.gestionaleRistorante.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionaleRistorante.Entity.Piatto;
import com.example.gestionaleRistorante.Repository.PiattoRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/piatti")
@CrossOrigin(origins = "http://localhost:5173")
public class PiattoController {
@Autowired
    private PiattoRepository piattoRepository;

    // GET: Ottiene tutti i piatti per il Menù
    @GetMapping
    public List<Piatto> getAllPiatti() {
        return piattoRepository.findAll();

}
@PostMapping
    public Piatto createPiatto(@RequestBody Piatto piatto) {
        return piattoRepository.save(piatto);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminaPiatto(@PathVariable Long id) {
        return piattoRepository.findById(id)
                .map(piatto -> {
                    piattoRepository.delete(piatto);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());

  /*   @DeleteMapping("/{id}")
public void eliminaPiatto(@PathVariable Long id) {
    piattoRepository.deleteById(id); */
}
}
