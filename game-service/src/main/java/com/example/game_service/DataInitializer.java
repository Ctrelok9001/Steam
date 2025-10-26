package com.example.game_service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final GameRepository gameRepository;

    public DataInitializer(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Override
    public void run(String... args) {
        if (gameRepository.count() == 0) {
            List<Game> games = List.of(
                    new Game(1L, "Apex Legends", 0.0),
                    new Game(2L, "Black Myth: Wukong", 59.99),
                    new Game(3L, "Counter-Strike 2", 0.0),
                    new Game(4L, "Cyberpunk 2077", 49.99),
                    new Game(5L, "Doom Eternal", 39.99),
                    new Game(6L, "Dragon’s Dogma 2", 59.99),
                    new Game(7L, "Elden Ring", 69.99),
                    new Game(8L, "God of War", 49.99),
                    new Game(9L, "Call of Duty: MW3", 69.99),
                    new Game(10L, "PUBG", 0.0),
                    new Game(11L, "Resident Evil 4", 59.99),
                    new Game(12L, "Sekiro: Shadows Die Twice", 49.99),
                    new Game(13L, "Skyrim", 39.99),
                    new Game(14L, "Starfield", 69.99),
                    new Game(15L, "The Witcher 3: Wild Hunt", 29.99)
            );

            gameRepository.saveAll(games);
            System.out.println("✅ Игры успешно добавлены в базу данных!");
        } else {
            System.out.println("ℹ️ Игры уже существуют в базе, пропуск инициализации.");
        }
    }
}
