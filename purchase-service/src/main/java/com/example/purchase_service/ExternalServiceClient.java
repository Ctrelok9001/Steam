package com.example.purchase_service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ExternalServiceClient {

    @Autowired
    private RestTemplate restTemplate;

    @CircuitBreaker(name = "gameService", fallbackMethod = "gameFallback")
    public Map<String, Object> getGame(Long gameId) {
        return restTemplate.getForObject("http://GAME-SERVICE/games/" + gameId, Map.class);
    }

    public Map<String, Object> gameFallback(Long gameId, Throwable t) {
        System.err.println("gameFallback вызван для gameId=" + gameId + " причина: " + t.toString());
        return Map.of(
                "id", gameId,
                "unavailable", true
        );
    }

    @CircuitBreaker(name = "userService", fallbackMethod = "userFallback")
    public Map<String, Object> getUser(Long userId) {
        return restTemplate.getForObject("http://USER-SERVICE/users/" + userId, Map.class);
    }

    public Map<String, Object> userFallback(Long userId, Throwable t) {
        System.err.println("userFallback вызван для userId=" + userId + " причина: " + t.toString());
        return Map.of(
                "id", userId,
                "unavailable", true
        );
    }
}
