import React, { useState, useEffect } from "react";
import "../GamePage.css";

import elden1 from "../assets/elden-ring/screenshot1.jpg";
import elden2 from "../assets/elden-ring/screenshot2.jpg";
import elden3 from "../assets/elden-ring/screenshot3.jpg";
import elden4 from "../assets/elden-ring/screenshot4.jpg";
import trailer from "../assets/elden-ring/trailer.mp4";

function EldenRing() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 7;

    const screenshots = [elden1, elden2, elden3, elden4];

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

            <h1 className="game-title">{game ? game.title : "ELDEN RING"}</h1>

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
                        src="https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg"
                        alt="Elden Ring logo"
                    />
                    <p className="game-description">
                        <strong>НОВЫЙ ФЭНТЕЗИЙНЫЙ РОЛЕВОЙ БОЕВИК ОТ FROM SOFTWARE И GEORGE R. R. MARTIN.</strong><br />
                        В огромном открытом мире Междуземья сражайся с могущественными врагами, исследуй древние руины и стань Владыкой Элден.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ RPG</span>
                        <span>🌍 Открытый мир</span>
                        <span>🔥 Souls-like</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 25 фев. 2022 г.</p>
                    <p><strong>Разработчик:</strong> FromSoftware, Inc.</p>
                    <p><strong>Издатель:</strong> Bandai Namco Entertainment</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "2999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    ELDEN RING — это самое масштабное и проработанное творение FromSoftware.
                    Погрузись в эпическую историю, созданную при участии Джорджа Мартина, и стань свидетелем падения мира, разорванного войной и амбициями.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i5-8400 / AMD Ryzen 3 3300X</p>
                        <p>Memory: 12 GB RAM</p>
                        <p>Graphics: GTX 1060 / RX 580 (4GB)</p>
                        <p>Storage: 60 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 11</p>
                        <p>Processor: Intel i7-8700K / AMD Ryzen 5 3600X</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: RTX 3060 / RX 6700 XT</p>
                        <p>Storage: 60 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EldenRing;
