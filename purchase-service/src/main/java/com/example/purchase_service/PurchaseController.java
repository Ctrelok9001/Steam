package com.example.purchase_service;

import com.example.purchase_service.dto.PurchaseRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.purchase_service.Purchase;

import java.util.List;

@RestController
@RequestMapping("/purchases")
@Tag(name = "Purchases", description = "API для управления покупками")
public class PurchaseController {

    private static final Logger log = LoggerFactory.getLogger(PurchaseController.class);

    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @Operation(summary = "Создать покупку", description = "Создает новую покупку по userId и gameId")
    @PostMapping
    public ResponseEntity<Purchase> create(@RequestBody PurchaseRequest request) {
        log.info("Создание покупки: userId={}, gameId={}", request.getUserId(), request.getGameId());
        return ResponseEntity.ok(purchaseService.createPurchase(request.getUserId(), request.getGameId()));
    }

    @Operation(summary = "Получить все покупки")
    @GetMapping
    public ResponseEntity<List<Purchase>> getAll() {
        log.info("Запрос списка всех покупок");
        return ResponseEntity.ok(purchaseService.getAllPurchases());
    }

    @Operation(summary = "Получить покупку по ID")
    @GetMapping("/{id}")
    public ResponseEntity<Purchase> getById(@PathVariable Long id) {
        log.info("Запрос покупки id={}", id);
        return ResponseEntity.of(purchaseService.getById(id));
    }

    @Operation(summary = "Обновить покупку")
    @PutMapping("/{id}")
    public ResponseEntity<Purchase> update(@PathVariable Long id,
                                           @RequestBody PurchaseRequest request) {
        log.info("Обновление покупки id={} новыми данными: userId={}, gameId={}", id, request.getUserId(), request.getGameId());
        return ResponseEntity.ok(purchaseService.updatePurchase(id, request.getUserId(), request.getGameId()));
    }

    @Operation(summary = "Удалить покупку")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        log.warn("Удаление покупки id={}", id);
        purchaseService.deletePurchase(id);
        return ResponseEntity.ok("Purchase " + id + " deleted.");
    }

    @Operation(summary = "Детали покупки")
    @GetMapping("/{id}/details")
    public ResponseEntity<?> details(@PathVariable Long id) {
        log.info("Запрос деталей покупки id={}", id);
        return ResponseEntity.ok(purchaseService.getPurchaseDetails(id));
    }
}
