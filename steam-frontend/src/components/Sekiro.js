import React, { useState, useEffect } from "react";
import "../GamePage.css";

import sek1 from "../assets/sekiro/1.jpg";
import sek2 from "../assets/sekiro/2.jpg";
import sek3 from "../assets/sekiro/3.jpg";
import sek4 from "../assets/sekiro/4.jpg";
import logo from "../assets/sekiro/logo.jpg";
import trailer from "../assets/sekiro/trailer.mp4";

function Sekiro() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 12;

    const screenshots = [sek1, sek2, sek3, sek4];

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

            <h1 className="game-title">{game ? game.title : "SEKIRO: SHADOWS DIE TWICE"}</h1>

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
                    <img className="game-logo" src={logo} alt="Sekiro logo" />
                    <p className="game-description">
                        <strong>ЭКШЕН-РОЛЕВАЯ ИГРА ОТ FROM SOFTWARE.</strong><br />
                        Станьте волком с Одиноким и исследуйте жестокий мир Сен, сражайтесь с самураями и мифическими существами в ожесточенных боях на мечах.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ RPG</span>
                        <span>🌍 Открытый мир</span>
                        <span>🗡️ Самураи</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2019 г.</p>
                    <p><strong>Разработчик:</strong> FromSoftware</p>
                    <p><strong>Издатель:</strong> Activision</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "1999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    SEKIRO — это хардкорный экшен с упором на мастерство боя, исследование древней Японии и тактическое сражение с опасными противниками.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i3-4170 / AMD FX-8300</p>
                        <p>Memory: 4 GB RAM</p>
                        <p>Graphics: GTX 750 Ti / Radeon HD 7950</p>
                        <p>Storage: 25 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i5-8400 / AMD Ryzen 5 1600</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 970 / RX 480</p>
                        <p>Storage: 25 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sekiro;
