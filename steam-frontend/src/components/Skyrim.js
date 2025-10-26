import React, { useState, useEffect } from "react";
import "../GamePage.css";

import skyrim1 from "../assets/skyrim/1.jpg";
import skyrim2 from "../assets/skyrim/2.jpg";
import skyrim3 from "../assets/skyrim/3.jpg";
import skyrim4 from "../assets/skyrim/4.jpg";
import logo from "../assets/skyrim/logo.jpg";
import trailer from "../assets/skyrim/trailer.mp4";

function Skyrim() {
    const [game, setGame] = useState(null);
    const [current, setCurrent] = useState(0);

    const gameId = 13;

    const screenshots = [skyrim1, skyrim2, skyrim3, skyrim4];

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

            <h1 className="game-title">{game ? game.title : "THE ELDER SCROLLS V: SKYRIM"}</h1>

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
                    <img className="game-logo" src={logo} alt="Skyrim logo" />
                    <p className="game-description">
                        <strong>ЭПИЧЕСКАЯ РОЛЕВАЯ ИГРА ОТ BETHESDA.</strong><br />
                        Исследуйте огромный открытый мир Скайрима, выполняйте квесты, сражайтесь с драконами и создавайте уникального героя.
                    </p>

                    <div className="tags">
                        <span>🎮 RPG</span>
                        <span>⚔️ Экшен</span>
                        <span>🌍 Открытый мир</span>
                        <span>🐉 Фэнтези</span>
                    </div>

                    <p><strong>Дата выхода:</strong> 2011 г.</p>
                    <p><strong>Разработчик:</strong> Bethesda Game Studios</p>
                    <p><strong>Издатель:</strong> Bethesda Softworks</p>

                    <div className="buy-section">
                        <span className="price">{game ? `${game.price}₽` : "1499₽"}</span>
                        <button className="buy-button" onClick={handleBuy}>Купить</button>
                    </div>
                </div>
            </div>

            <div className="extra-info">
                <h2>Об игре</h2>
                <p>
                    SKYRIM — это открытый мир с богатой фэнтезийной вселенной, глубокими квестами, драконами и эпическими сражениями. Станьте Драконорожденным и спасите мир.
                </p>
                <h2>Системные требования</h2>
                <div className="requirements">
                    <div>
                        <h3>Минимальные</h3>
                        <p>OS: Windows 7</p>
                        <p>Processor: Dual Core 2.0 GHz</p>
                        <p>Memory: 2 GB RAM</p>
                        <p>Graphics: DirectX 9.0c compatible</p>
                        <p>Storage: 6 GB</p>
                    </div>
                    <div>
                        <h3>Рекомендуемые</h3>
                        <p>OS: Windows 10</p>
                        <p>Processor: Quad-core 2.6 GHz</p>
                        <p>Memory: 4 GB RAM</p>
                        <p>Graphics: DirectX 11 compatible</p>
                        <p>Storage: 6 GB SSD</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Skyrim;
