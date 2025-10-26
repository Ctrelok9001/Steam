package com.example.game_service;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "games")
public class Game {

    @Id
    private Long id;

    @NotBlank
    private String title;

    @Positive
    private double price;

    public Game() {}

    public Game(Long id, String title, double price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
