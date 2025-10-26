package com.example.game_service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@Tag(name = "Games", description = "API для управления каталогом игр")
public class GameController {

    private static final Logger log = LoggerFactory.getLogger(GameController.class);

    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @Operation(summary = "Создать игру", description = "Добавляет новую игру в каталог")
    @PostMapping
    public Game createGame(@RequestBody Game game) {
        log.info("Создание новой игры: title={}, price={}", game.getTitle(), game.getPrice());
        return gameRepository.save(game);
    }

    @Operation(summary = "Получить все игры", description = "Возвращает список всех игр")
    @GetMapping
    public List<Game> getAllGames() {
        log.info("Запрос списка всех игр");
        return gameRepository.findAll();
    }

    @Operation(summary = "Получить игру по ID", description = "Возвращает игру по её идентификатору")
    @GetMapping("/{id}")
    public Game getGameById(@PathVariable Long id) {
        log.info("Запрос игры по id={}", id);
        return gameRepository.findById(id).orElse(null);
    }

    @Operation(summary = "Обновить игру", description = "Изменяет название и цену игры по ID")
    @PutMapping("/{id}")
    public Game updateGame(@PathVariable Long id, @RequestBody Game updatedGame) {
        log.info("Обновление игры id={} новыми данными: title={}, price={}",
                id, updatedGame.getTitle(), updatedGame.getPrice());
        return gameRepository.findById(id)
                .map(game -> {
                    game.setTitle(updatedGame.getTitle());
                    game.setPrice(updatedGame.getPrice());
                    return gameRepository.save(game);
                })
                .orElseThrow(() -> {
                    log.error("Игра с id={} не найдена", id);
                    return new RuntimeException("Game not found");
                });
    }

    @Operation(summary = "Удалить игру", description = "Удаляет игру по идентификатору")
    @DeleteMapping("/{id}")
    public String deleteGame(@PathVariable Long id) {
        log.warn("Удаление игры id={}", id);
        gameRepository.deleteById(id);
        return "Game " + id + " deleted.";
    }
}
