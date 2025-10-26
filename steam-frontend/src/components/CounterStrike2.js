import React, { useState, useEffect } from "react";
import "../GamePage.css";

import cs1 from "../assets/cs2/1.jpg";
import cs2 from "../assets/cs2/2.jpg";
import cs3 from "../assets/cs2/3.jpg";
import cs4 from "../assets/cs2/4.jpg";
import logo from "../assets/cs2/logo.jpg";
import trailer from "../assets/cs2/trailer.mp4";

function CounterStrike2() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 3;

    const screenshots = [cs1, cs2, cs3, cs4];

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

            <h1 className="game-title">{game ? game.title : "COUNTER-STRIKE 2"}</h1>

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
                    <img className="game-logo" src={logo} alt="Counter-Strike 2 logo" />
                    <p className="game-description">
                        <strong>ЛЕГЕНДАРНЫЙ МУЛЬТИПЛЕЕРНЫЙ ШУТЕР ОТ VALVE.</strong><br />
                        Сражайтесь в командных боях, используйте тактику и мастерство, чтобы побеждать на различных картах и в режимах игры.
                    </p>

                    <div className="tags">
                        <span>🎮 Шутер</span>
                        <span>⚔️ Тактика</span>
                        <span>🌍 Мультиплеер</span>
                        <span>💣 Командные бои</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2023 г.</p>
                    <p><strong>Разработчик:</strong> Valve</p>
                    <p><strong>Издатель:</strong> Valve</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "Бесплатно"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    COUNTER-STRIKE 2 — это командный шутер с динамичными боями, стратегическим геймплеем и поддержкой соревновательного мультиплеера.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel Core i3-9100 / AMD Ryzen 3 1200</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 1050 / Radeon RX 560</p>
                        <p>Storage: 20 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel Core i5-9600K / AMD Ryzen 5 3600</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: GTX 1660 / Radeon RX 580</p>
                        <p>Storage: 20 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CounterStrike2;
