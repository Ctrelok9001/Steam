package com.example.purchase_service;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;
import java.util.Map;

@Service
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final ExternalServiceClient externalServiceClient;

    public PurchaseService(PurchaseRepository purchaseRepository, ExternalServiceClient externalServiceClient) {
        this.purchaseRepository = purchaseRepository;
        this.externalServiceClient = externalServiceClient;
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public Optional<Purchase> getById(Long id) {
        return purchaseRepository.findById(id);
    }

    public Purchase createPurchase(Long userId, Long gameId) {
        return purchaseRepository.save(new Purchase(userId, gameId));
    }

    public Purchase updatePurchase(Long id, Long userId, Long gameId) {
        return purchaseRepository.findById(id)
                .map(p -> {
                    p.setUserId(userId);
                    p.setGameId(gameId);
                    return purchaseRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Purchase not found"));
    }

    public void deletePurchase(Long id) {
        purchaseRepository.deleteById(id);
    }

    @CircuitBreaker(name = "externalCalls", fallbackMethod = "detailsFallback")
    public Map<String, Object> getPurchaseDetails(Long id) {
        Purchase p = purchaseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase not found"));

        Map<String, Object> game = externalServiceClient.getGame(p.getGameId());
        Map<String, Object> user = externalServiceClient.getUser(p.getUserId());

        return Map.of("purchase", p, "game", game, "user", user);
    }

    public Map<String, Object> detailsFallback(Long id, Throwable t) {
        Purchase p = purchaseRepository.findById(id).orElse(null);
        return Map.of(
                "purchase", p,
                "game", Map.of("unavailable", true),
                "user", Map.of("unavailable", true),
                "reason", t.toString()
        );
    }
}
