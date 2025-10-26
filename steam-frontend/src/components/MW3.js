import React, { useState, useEffect } from "react";
import "../GamePage.css";

import mw31 from "../assets/cod-mw3/1.jpg";
import mw32 from "../assets/cod-mw3/2.jpg";
import mw33 from "../assets/cod-mw3/3.jpg";
import mw34 from "../assets/cod-mw3/4.jpg";
import logo from "../assets/cod-mw3/logo.jpg";
import trailer from "../assets/cod-mw3/trailer.mp4";

function MW3() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 9;

    const screenshots = [mw31, mw32, mw33, mw34];

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

            <h1 className="game-title">{game ? game.title : "CALL OF DUTY: MODERN WARFARE 3"}</h1>

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
                    <img className="game-logo" src={logo} alt="MW3 logo" />
                    <p className="game-description">
                        <strong>ШУТЕР ОТ ПЕРВОГО ЛИЦА ОТ INFINITY WARD И SLEDGEHAMMER GAMES.</strong><br />
                        Продолжение эпической военной серии Call of Duty с кампанией по всему миру, динамическими боями и многопользовательскими сражениями.
                    </p>

                    <div className="tags">
                        <span>🎮 Шутер</span>
                        <span>⚔️ Экшен</span>
                        <span>🌍 Кампания</span>
                        <span>💥 Мультиплеер</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2011 г.</p>
                    <p><strong>Разработчик:</strong> Infinity Ward / Sledgehammer Games</p>
                    <p><strong>Издатель:</strong> Activision</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "2999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    CALL OF DUTY: MODERN WARFARE 3 — это напряженный шутер с динамичной кампанией, захватывающими миссиями и многопользовательскими боями по всему миру.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows XP / Vista / 7</p>
                        <p>Processor: Intel Core 2 Duo E6600 / AMD Phenom X3 8750</p>
                        <p>Memory: 2 GB RAM</p>
                        <p>Graphics: Shader 3.0 compatible</p>
                        <p>Storage: 16 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 7</p>
                        <p>Processor: Intel Core 2 Quad Q9550 / AMD Phenom II X4 940</p>
                        <p>Memory: 4 GB RAM</p>
                        <p>Graphics: DirectX 10 compatible</p>
                        <p>Storage: 16 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MW3;
