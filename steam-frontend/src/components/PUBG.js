import React, { useState, useEffect } from "react";
import "../GamePage.css";

import pubg1 from "../assets/pubg/1.jpg";
import pubg2 from "../assets/pubg/2.jpg";
import pubg3 from "../assets/pubg/3.jpg";
import pubg4 from "../assets/pubg/4.jpg";
import logo from "../assets/pubg/logo.jpg";
import trailer from "../assets/pubg/trailer.mp4";


function PUBG() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 10;

    const screenshots = [pubg1, pubg2, pubg3, pubg4];

    const prevSlide = () =>
        setCurrent((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrent((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));

    useEffect(() => {
        fetch(`http://localhost:8081/games/${gameId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка загрузки игры");
                return res.json();
            })
            .then((data) => setGame(data))
            .catch((err) => console.error("Ошибка загрузки игры:", err));
    }, []);

    const handleBuy = async () => {
        const userIdStr = localStorage.getItem("userId");
        if (!userIdStr) {
            alert("⚠️ Пожалуйста, войдите в аккаунт перед покупкой.");
            return;
        }

        const userId = parseInt(userIdStr);

        try {
            const response = await fetch("http://localhost:8081/purchases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, gameId }),
            });

            if (response.ok) {
                alert("✅ Игра успешно добавлена в вашу библиотеку!");
            } else {
                const errText = await response.text();
                alert(`❌ Ошибка при покупке: ${errText}`);
            }
        } catch (error) {
            console.error("Ошибка покупки:", error);
            alert("⚠️ Не удалось выполнить покупку. Проверьте сервер.");
        }
    };

    return (
        <div className="game-page">
            <div className="game-hero">
                <video className="game-trailer" controls autoPlay muted loop>
                    <source src={trailer} type="video/mp4"/>
                    Ваш браузер не поддерживает видео.
                </video>
            </div>

            <h1 className="game-title">{game ? game.title : "PUBG: BATTLEGROUNDS"}</h1>

            <div className="game-container">
                <div className="game-media">
                    <div className="carousel-wrapper">
                        <div className="carousel">
                            <button className="carousel-btn top" onClick={prevSlide}>▲</button>
                            <img className="carousel-image" src={screenshots[current]} alt={`screenshot-${current}`} />
                            <button className="carousel-btn bottom" onClick={nextSlide}>▼</button>
                        </div>
                    </div>
                </div>

                <div className="game-details">
                    <img className="game-logo" src={logo} alt="PUBG logo" />
                    <p className="game-description">
                        <strong>БАТТЛ-РОЯЛ ОТ PUBG CORPORATION.</strong><br />
                        Сражайтесь до последнего на огромной карте, собирайте оружие и экипировку, выживайте и становитесь последним оставшимся игроком или командой.
                    </p>

                    <div className="tags">
                        <span>🎮 Шутер</span>
                        <span>⚔️ Баттл-рояль</span>
                        <span>🌍 Мультиплеер</span>
                        <span>🤝 Командные бои</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2017 г.</p>
                    <p><strong>Разработчик:</strong> PUBG Corporation</p>
                    <p><strong>Издатель:</strong> Krafton</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "Бесплатно"}</span>
                        <button className="buy-button" onClick={handleBuy}>Скачать</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    PUBG: BATTLEGROUNDS — это масштабный баттл-рояль с динамичными боями, стратегией выживания, большим открытым миром и поддержкой командной игры.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 7 64-bit</p>
                        <p>Processor: Intel Core i5-4430 / AMD FX-6300</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: NVIDIA GeForce GTX 960 / AMD Radeon R7 370</p>
                        <p>Storage: 30 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10 64-bit</p>
                        <p>Processor: Intel Core i5-6600K / AMD Ryzen 5 1600</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: NVIDIA GeForce GTX 1060 / AMD RX 580</p>
                        <p>Storage: 30 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PUBG;
