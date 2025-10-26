import React, { useState, useEffect } from "react";
import "../GamePage.css";

import cp1 from "../assets/cyberpunk-2077/1.jpg";
import cp2 from "../assets/cyberpunk-2077/2.jpg";
import cp3 from "../assets/cyberpunk-2077/3.jpg";
import cp4 from "../assets/cyberpunk-2077/4.jpg";
import logo from "../assets/cyberpunk-2077/logo.jpg";
import trailer from "../assets/cyberpunk-2077/trailer.mp4";

function Cyberpunk2077() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 4;

    const screenshots = [cp1, cp2, cp3, cp4];

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

            <h1 className="game-title">{game ? game.title : "CYBERPUNK 2077"}</h1>

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
                    <img className="game-logo" src={logo} alt="Cyberpunk 2077 logo" />
                    <p className="game-description">
                        <strong>ЭПИЧЕСКАЯ RPG В МИРЕ НА БАЗЕ КИБЕРПАНКА ОТ CD PROJEKT RED.</strong><br />
                        Исследуйте футуристический Найт-Сити, выполняйте миссии, развивайте навыки и принимайте решения, влияющие на судьбы персонажей.
                    </p>

                    <div className="tags">
                        <span>🎮 RPG</span>
                        <span>⚔️ Экшен</span>
                        <span>🌍 Открытый мир</span>
                        <span>🕶️ Киберпанк</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2020 г.</p>
                    <p><strong>Разработчик:</strong> CD Projekt Red</p>
                    <p><strong>Издатель:</strong> CD Projekt</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "1999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    CYBERPUNK 2077 — масштабная RPG с открытым миром, насыщенная квестами, технологиями будущего, киберимплантами и нелинейным сюжетом.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel Core i5-3570K / AMD FX-8310</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 780 / Radeon RX 470</p>
                        <p>Storage: 70 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel Core i7-4790 / AMD Ryzen 3 3200G</p>
                        <p>Memory: 12 GB RAM</p>
                        <p>Graphics: GTX 1060 / Radeon R9 Fury</p>
                        <p>Storage: 70 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cyberpunk2077;
