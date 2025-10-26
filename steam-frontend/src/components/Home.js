import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";

function Home() {
    const featuredGames = [
        { id: 1, title: "Cyberpunk 2077", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", link: "/cyberpunk-2077" },
        { id: 2, title: "Elden Ring", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", link: "/elden-ring" },
        { id: 3, title: "Red Dead Redemption 2", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg", link: "/rdr2" },
        { id: 4, title: "Baldur’s Gate 3", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg", link: "/bg3" },
    ];

    const categories = {
        "Новинки": [
            { id: 14, title: "Starfield", price: "3499₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1716740/header.jpg", link: "/starfield" },
            { id: 15, title: "Black Myth: Wukong", price: "3999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/header.jpg", link: "/black-myth-wukong" },
            { id: 16, title: "Dragon’s Dogma 2", price: "3499₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2054970/header.jpg", link: "/dragons-dogma-2" },
            { id: 17, title: "Elden Ring", price: "2999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg", link: "/elden-ring" }
        ],
        "Экшен": [
            { id: 5, title: "DOOM Eternal", price: "1999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/782330/header.jpg", link: "/doom-eternal" },
            { id: 6, title: "God of War", price: "2499₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg", link: "/god-of-war" },
            { id: 7, title: "Resident Evil 4 Remake", price: "2999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg", link: "/resident-evil-4" },
            { id: 18, title: "Sekiro: Shadows Die Twice", price: "1999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg", link: "/sekiro" }
        ],
        "Ролевые игры": [
            { id: 8, title: "The Witcher 3", price: "899₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg", link: "/witcher-3" },
            { id: 9, title: "Skyrim", price: "1499₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/72850/header.jpg", link: "/skyrim" },
            { id: 10, title: "Call of Duty: Modern Warfare 3", price: "2999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/header.jpg", link: "/mw3" },
            { id: 19, title: "Cyberpunk 2077", price: "1999₽", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg", link: "/cyberpunk-2077" }
        ],
        "Онлайн-шутеры": [
            { id: 11, title: "Counter-Strike 2", price: "Бесплатно", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg", link: "/counter-strike-2" },
            { id: 12, title: "Apex Legends", price: "Бесплатно", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg", link: "/apex-legends" },
            { id: 13, title: "PUBG: BATTLEGROUNDS", price: "Бесплатно", image: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg", link: "/pubg" },
        ]
    };

    return (
        <div className="steam-home">
            <header className="steam-header">
                <div className="logo">Steam</div>
                <nav>
                    <span className="active">МАГАЗИН</span>
                    <span>БИБЛИОТЕКА</span>
                    <span>СООБЩЕСТВО</span>
                </nav>
            </header>

            <div className="categories">
                {Object.entries(categories).map(([category, games]) => (
                    <section key={category} className="category-section">
                        <h3>{category}</h3>
                        <div className="games-grid">
                            {games.map((game) => (
                                <div key={game.id} className="game-card">
                                    <Link to={game.link}>
                                        <img src={game.image} alt={game.title} />
                                    </Link>
                                    <div className="game-info">
                                        <h4>{game.title}</h4>
                                        <p>{game.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Home;
