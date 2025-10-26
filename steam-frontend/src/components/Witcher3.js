import React, { useState, useEffect } from "react";
import "../GamePage.css";

import witcher1 from "../assets/witcher-3/1.jpg";
import witcher2 from "../assets/witcher-3/2.jpg";
import witcher3 from "../assets/witcher-3/3.jpg";
import witcher4 from "../assets/witcher-3/4.jpg";
import logo from "../assets/witcher-3/logo.png";
import trailer from "../assets/witcher-3/trailer.mp4";

function Witcher3() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 15;

    const screenshots = [witcher1, witcher2, witcher3, witcher4];

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

            <h1 className="game-title">{game ? game.title : "THE WITCHER 3: WILD HUNT"}</h1>

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
                    <img className="game-logo" src={logo} alt="The Witcher 3 logo" />
                    <p className="game-description">
                        <strong>ЭПИЧЕСКАЯ РОЛЕВАЯ ИГРА ОТ CD PROJEKT RED.</strong><br />
                        Вступите в роль Геральта из Ривии, исследуйте огромный открытый мир, сражайтесь с монстрами и принимайте сложные моральные решения.
                    </p>

                    <div className="tags">
                        <span>🎮 RPG</span>
                        <span>⚔️ Экшен</span>
                        <span>🌍 Открытый мир</span>
                        <span>🧙‍♂️ Фэнтези</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2015 г.</p>
                    <p><strong>Разработчик:</strong> CD Projekt Red</p>
                    <p><strong>Издатель:</strong> CD Projekt</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "899₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    THE WITCHER 3 — это масштабная RPG с открытым миром, глубоким сюжетом, исследованием фэнтезийной вселенной и эпическими сражениями.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 7/8/10</p>
                        <p>Processor: Intel Core i5-2500K / AMD Phenom II X4</p>
                        <p>Memory: 6 GB RAM</p>
                        <p>Graphics: GTX 660 / Radeon HD 7870</p>
                        <p>Storage: 35 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel Core i7-3770 / AMD FX-8350</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 770 / Radeon R9 290</p>
                        <p>Storage: 35 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Witcher3;
