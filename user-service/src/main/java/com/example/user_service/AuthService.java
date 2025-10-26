package com.example.user_service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Пользователь с таким email уже существует");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Неверный email или пароль"));

        System.out.println("DEBUG: rawPassword=" + password);
        System.out.println("DEBUG: encodedPassword=" + user.getPassword());

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Неверный email или пароль");
        }
        return user;
    }

}
