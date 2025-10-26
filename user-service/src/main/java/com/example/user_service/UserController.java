package com.example.user_service;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Users", description = "API для управления пользователями")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Operation(summary = "Создать пользователя", description = "Добавляет нового пользователя в базу")
    @PostMapping
    public User createUser(@RequestBody User user) {
        log.info("Создание нового пользователя: name={}, email={}", user.getName(), user.getEmail());
        return userRepository.save(user);
    }

    @Operation(summary = "Получить всех пользователей", description = "Возвращает список всех пользователей")
    @GetMapping
    public List<User> getAllUsers() {
        log.info("Запрос списка всех пользователей");
        return userRepository.findAll();
    }

    @Operation(summary = "Получить пользователя по ID", description = "Возвращает пользователя по идентификатору")
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        log.info("Запрос пользователя по id={}", id);
        return userRepository.findById(id).orElse(null);
    }

    @Operation(summary = "Обновить пользователя", description = "Изменяет имя и email пользователя по ID")
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        log.info("Обновление пользователя id={} новыми данными: name={}, email={}",
                id, updatedUser.getName(), updatedUser.getEmail());
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> {
                    log.error("Пользователь с id={} не найден", id);
                    return new RuntimeException("User not found");
                });
    }

    @Operation(summary = "Удалить пользователя", description = "Удаляет пользователя по идентификатору")
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        log.warn("Удаление пользователя id={}", id);
        userRepository.deleteById(id);
        return "User " + id + " deleted.";
    }
}
