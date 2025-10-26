import React, { useState, useEffect } from "react";
import "../GamePage.css";

import doom1 from "../assets/doom-eternal/1.jpg";
import doom2 from "../assets/doom-eternal/2.jpg";
import doom3 from "../assets/doom-eternal/3.jpg";
import doom4 from "../assets/doom-eternal/4.jpg";
import logo from "../assets/doom-eternal/logo.jpg";
import trailer from "../assets/doom-eternal/trailer.mp4";

function DoomEternal() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 5;

    const screenshots = [doom1, doom2, doom3, doom4];

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

            <h1 className="game-title">{game ? game.title : "DOOM ETERNAL"}</h1>

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
                        alt="Doom Eternal logo"
                    />
                    <p className="game-description">
                        <strong>ЭКШЕН-ШУТЕР ОТ ПЕРВОГО ЛИЦА С НЕВЕРОЯТНОЙ ДИНАМИКОЙ.</strong><br />
                        Встаньте на путь Doom Slayer и уничтожайте армии демонов, исследуйте разрушенные миры и спасите человечество от апокалипсиса.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ Шутер</span>
                        <span>🌍 Открытый уровень</span>
                        <span>🔥 Адреналин</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2020 г.</p>
                    <p><strong>Разработчик:</strong> id Software</p>
                    <p><strong>Издатель:</strong> Bethesda Softworks</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "1999₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    DOOM ETERNAL — это продолжение легендарного шутера, предлагающее безостановочную бойню с множеством видов оружия и эпическими боссами.
                    Исследуйте адские миры, улучшайте свои способности и станьте непреодолимой силой.
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

export default DoomEternal;
