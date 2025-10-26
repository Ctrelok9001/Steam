import React, { useState, useEffect } from "react";
import "../GamePage.css";

import apex1 from "../assets/apex-legends/1.jpg";
import apex2 from "../assets/apex-legends/2.jpg";
import apex3 from "../assets/apex-legends/3.jpg";
import apex4 from "../assets/apex-legends/4.jpg";
import logo from "../assets/apex-legends/logo.jpg";
import trailer from "../assets/apex-legends/trailer.mp4";

function ApexLegends() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 1;

    const screenshots = [apex1, apex2, apex3, apex4];

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

            <h1 className="game-title">{game ? game.title : "APEX LEGENDS"}</h1>

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
                    <img className="game-logo" src={logo} alt="Apex Legends logo" />
                    <p className="game-description">
                        <strong>БЕСПЛАТНЫЙ БАТТЛ-РОЯЛ ОТ RESPWAN ENTERTAINMENT.</strong><br />
                        Выбирайте героев с уникальными способностями, сражайтесь в командных матчах и используйте тактику, чтобы стать последней выжившей командой.
                    </p>

                    <div className="tags">
                        <span>🎮 Шутер</span>
                        <span>⚔️ Баттл-рояль</span>
                        <span>🌍 Мультиплеер</span>
                        <span>🤝 Командные бои</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2019 г.</p>
                    <p><strong>Разработчик:</strong> Respawn Entertainment</p>
                    <p><strong>Издатель:</strong> Electronic Arts</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "Бесплатно"}</span>
                        <button className="buy-button" onClick={handleBuy}>Скачать</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    APEX LEGENDS — командный баттл-рояль с уникальными героями, динамичными боями, возможностью комбинировать способности и стратегическим геймплеем.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 7 64-bit</p>
                        <p>Processor: Intel Core i3-6300 3.8GHz / AMD FX-4350</p>
                        <p>Memory: 6 GB RAM</p>
                        <p>Graphics: NVIDIA GeForce GT 640 / Radeon HD 7730</p>
                        <p>Storage: 22 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10 64-bit</p>
                        <p>Processor: Intel i5 3570K / AMD Ryzen 5 1500X</p>
                        <p>Memory: 8 GB RAM</p>
                        <p>Graphics: GTX 970 / RX 480</p>
                        <p>Storage: 22 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApexLegends;
