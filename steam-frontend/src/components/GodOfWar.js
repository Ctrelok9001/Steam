import React, { useState, useEffect } from "react";
import "../GamePage.css";

import gow1 from "../assets/god-of-war/1.jpg";
import gow2 from "../assets/god-of-war/2.jpg";
import gow3 from "../assets/god-of-war/3.jpg";
import gow4 from "../assets/god-of-war/4.jpg";
import logo from "../assets/god-of-war/logo.jpg";
import trailer from "../assets/god-of-war/trailer.mp4";

function GodOfWar() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 8;

    const screenshots = [gow1, gow2, gow3, gow4];

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

            <h1 className="game-title">{game ? game.title : "GOD OF WAR"}</h1>

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
                    <img
                        className="game-logo"
                        src={logo}
                        alt="God of War logo"
                    />
                    <p className="game-description">
                        <strong>ЭПИЧЕСКИЙ РОЛЕВОЙ БОЕВИК ОТ SANTA MONICA STUDIO.</strong><br />
                        Следуйте за Кратосом и Атреем в их путешествии по мифологии, сражайтесь с богами и мифическими существами, исследуя суровые северные земли.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ RPG</span>
                        <span>🌍 Открытый мир</span>
                        <span>🛡️ Мифология</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2022 г.</p>
                    <p><strong>Разработчик:</strong> Santa Monica Studio</p>
                    <p><strong>Издатель:</strong> Sony Interactive Entertainment</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "2499₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    GOD OF WAR — это эпическая RPG с глубокой историей, богатой боевой системой и захватывающими мифологическими приключениями.
                    Сражайтесь с богами и монстрами, раскрывайте тайны мира и переживайте эмоциональную историю Кратоса и Атрея.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i5-6600 / AMD Ryzen 5 1600</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 970 / RX 480</p>
                        <p>Storage: 70 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 11</p>
                        <p>Processor: Intel i7-7700K / AMD Ryzen 7 2700X</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: RTX 2060 / RX 5700 XT</p>
                        <p>Storage: 70 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GodOfWar;
