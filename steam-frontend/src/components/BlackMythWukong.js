import React, { useState, useEffect } from "react";
import "../GamePage.css";

import wukong1 from "../assets/black-myth-wukong/1.jpg";
import wukong2 from "../assets/black-myth-wukong/2.jpg";
import wukong3 from "../assets/black-myth-wukong/3.jpg";
import wukong4 from "../assets/black-myth-wukong/4.png";
import logo from "../assets/black-myth-wukong/logo.jpg";
import trailer from "../assets/black-myth-wukong/trailer.mp4";

function BlackMythWukong() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 2;

    const screenshots = [wukong1, wukong2, wukong3, wukong4];

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

            <h1 className="game-title">{game ? game.title : "BLACK MYTH: WUKONG"}</h1>

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
                        alt="Black Myth: Wukong logo"
                    />
                    <p className="game-description">
                        <strong>ЭПИЧЕСКИЙ РОЛЕВОЙ БОЕВИК В СТИЛЕ КИТАЙСКОЙ МИФОЛОГИИ.</strong><br />
                        Станьте легендарным Царь Обезьян в динамичных боях, исследуйте мистический мир и сразитесь с мифическими существами в захватывающей истории.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ RPG</span>
                        <span>🌍 Открытый мир</span>
                        <span>🌀 Фэнтези</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2024 г.</p>
                    <p><strong>Разработчик:</strong> Game Science</p>
                    <p><strong>Издатель:</strong> Game Science / My.com</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "3999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    BLACK MYTH: WUKONG — это захватывающая RPG, вдохновлённая китайской мифологией.
                    Погрузитесь в мир магии и легенд, сражайтесь с могучими врагами и раскройте тайны Царства Обезьян.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i5-10400 / AMD Ryzen 5 3600</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: GTX 1660 / RX 5600 XT</p>
                        <p>Storage: 50 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 11</p>
                        <p>Processor: Intel i7-10700K / AMD Ryzen 7 5800X</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: RTX 3060 / RX 6700 XT</p>
                        <p>Storage: 50 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlackMythWukong;
