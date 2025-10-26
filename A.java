version: "3.8"

services:
  eureka-server:
    build: ./eureka-server
    container_name: eureka-server
    ports:
      - "8761:8761"
    environment:
      - SPRING_PROFILES_ACTIVE=default
    networks:
      - steam-network

  config-server:
    build: ./config-server
    container_name: config-server
    ports:
      - "8888:8888"
    depends_on:
      - eureka-server
    environment:
      - SPRING_PROFILES_ACTIVE=default
    networks:
      - steam-network

  api-gateway:
    build: ./api-gateway
    container_name: api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - eureka-server
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=default
    networks:
      - steam-network

  user-service:
    build: ./user-service
    container_name: user-service
    ports:
      - "8081:8081"
    depends_on:
      - eureka-server
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=default
    networks:
      - steam-network

  game-service:
    build: ./game-service
    container_name: game-service
    ports:
      - "8082:8082"
    depends_on:
      - eureka-server
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=default
    networks:
      - steam-network

  purchase-service:
    build: ./purchase-service
    container_name: purchase-service
    ports:
      - "8083:8083"
    depends_on:
      - eureka-server
      - config-server
    environment:
      - SPRING_PROFILES_ACTIVE=default
    networks:
      - steam-network

  frontend:
    build: ./steam-frontend
    container_name: steam-frontend
    ports:
      - "3000:80"    # локально открыть http://localhost:3000
    depends_on:
      - api-gateway
    networks:
      - steam-network

networks:
  steam-network:
    driver: bridge
