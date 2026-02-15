package com.example.gestionaleRistorante.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Prenotazione {
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String cliente;
    private String data;
    private String ora;
    private int persone;
    // --- COSTRUTTORI ---
    public Prenotazione() {}
    public Prenotazione(String cliente, String data, String ora, int persone) {
        this.cliente = cliente;
        this.data = data;
        this.ora = ora;
        this.persone = persone;
    }
    // --- GETTER E SETTER ---
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getCliente() {
        return cliente;
    }
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
    public String getOra() {
        return ora;
    }
    public void setOra(String ora) {
        this.ora = ora;
    }
    

}
