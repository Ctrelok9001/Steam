import React, { useState, useEffect } from "react";
import "../GamePage.css";

import re1 from "../assets/resident-evil-4/1.jpg";
import re2 from "../assets/resident-evil-4/2.jpg";
import re3 from "../assets/resident-evil-4/3.jpg";
import re4 from "../assets/resident-evil-4/4.jpg";
import logo from "../assets/resident-evil-4/logo.jpg";
import trailer from "../assets/resident-evil-4/trailer.mp4";

function ResidentEvil4() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 11;

    const screenshots = [re1, re2, re3, re4];

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

            <h1 className="game-title">{game ? game.title : "RESIDENT EVIL 4 REMAKE"}</h1>

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
                    <img className="game-logo" src={logo} alt="Resident Evil 4 Remake logo" />
                    <p className="game-description">
                        <strong>ПЕРЕИЗДАНИЕ ЛЕГЕНДАРНОГО УЖАСТИКА ОТ CAPCOM.</strong><br />
                        Испытайте заново классический хоррор с улучшенной графикой, новыми механиками боя и захватывающей историей Лиона Кеннеди.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ Хоррор</span>
                        <span>🌍 Открытый мир</span>
                        <span>🧟‍♂️ Зомби</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2023 г.</p>
                    <p><strong>Разработчик:</strong> Capcom</p>
                    <p><strong>Издатель:</strong> Capcom</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "2999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    RESIDENT EVIL 4 REMAKE — это переосмысленный хоррор с усовершенствованной боевой системой, улучшенной графикой и глубокой атмосферой страха.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i5-4460 / AMD Ryzen 3 1200</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 970 / RX 480</p>
                        <p>Storage: 50 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i7-6700K / AMD Ryzen 5 2600</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: GTX 1070 / RX Vega 56</p>
                        <p>Storage: 50 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResidentEvil4;
