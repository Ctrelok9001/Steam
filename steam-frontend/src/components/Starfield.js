import React, { useState, useEffect } from "react";
import "../GamePage.css";

import star1 from "../assets/starfield/1.jpg";
import star2 from "../assets/starfield/2.jpeg";
import star3 from "../assets/starfield/3.jpg";
import star4 from "../assets/starfield/4.jpg";
import logo from "../assets/starfield/logo.jpg";
import trailer from "../assets/starfield/trailer.mp4";

function Starfield() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 14;

    const screenshots = [star1, star2, star3, star4];

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

            <h1 className="game-title">{game ? game.title : "STARFIELD"}</h1>

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
                        alt="Starfield logo"
                    />
                    <p className="game-description">
                        <strong>ЭПИЧЕСКАЯ КОСМИЧЕСКАЯ RPG ОТ BETHESDA.</strong><br />
                        Исследуйте огромную галактику, создавайте экипаж, участвуйте в космических сражениях и открывайте неизведанные миры.
                    </p>

                    <div className="tags">
                        <span>🎮 Экшен</span>
                        <span>⚔️ RPG</span>
                        <span>🌌 Открытый космос</span>
                        <span>🛰️ Sci-Fi</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2025 г.</p>
                    <p><strong>Разработчик:</strong> Bethesda Game Studios</p>
                    <p><strong>Издатель:</strong> Bethesda Softworks</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "3499₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    STARFIELD — это масштабная космическая RPG с открытым миром, богатой историей и исследованием планет.
                    Станьте капитаном собственного корабля и исследуйте бескрайние просторы галактики.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Intel i5-10600K / AMD Ryzen 5 3600</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: GTX 1660 / RX 5600 XT</p>
                        <p>Storage: 60 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 11</p>
                        <p>Processor: Intel i7-10700K / AMD Ryzen 7 5800X</p>
                        <p>Memory: 16 GB RAM</p>
                        <p>Graphics: RTX 3060 / RX 6700 XT</p>
                        <p>Storage: 60 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Starfield;
