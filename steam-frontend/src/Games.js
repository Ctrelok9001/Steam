import React, { useEffect, useState } from "react";
import "./Admin.css";

function Games() {
    const [games, setGames] = useState([]);
    const [form, setForm] = useState({ title: "", price: "" });
    const [editingId, setEditingId] = useState(null);

    const loadGames = () => {
        fetch("http://localhost:8081/games")
            .then((res) => res.json())
            .then((data) => setGames(data))
            .catch((err) => console.error("Ошибка загрузки игр:", err));
    };

    useEffect(() => {
        loadGames();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const gameData = { ...form, price: parseFloat(form.price) };

        if (editingId) {
            fetch(`http://localhost:8081/games/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gameData),
            }).then(() => {
                setForm({ title: "", price: "" });
                setEditingId(null);
                loadGames();
            });
        } else {
            fetch("http://localhost:8081/games", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(gameData),
            }).then(() => {
                setForm({ title: "", price: "" });
                loadGames();
            });
        }
    };

    const deleteGame = (id) => {
        fetch(`http://localhost:8081/games/${id}`, { method: "DELETE" })
            .then(() => loadGames());
    };

    const editGame = (game) => {
        setForm({ title: game.title, price: game.price });
        setEditingId(game.id);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Каталог игр</h1>

            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="text"
                    placeholder="Название"
                    className="form-control mb-2"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Цена"
                    className="form-control mb-2"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <button className="btn btn-success" type="submit">
                    {editingId ? "Обновить" : "Добавить"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ title: "", price: "" });
                        }}
                    >
                        Отмена
                    </button>
                )}
            </form>

            <table className="table table-striped table-hover">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {games.map((g) => (
                    <tr key={g.id}>
                        <td>{g.id}</td>
                        <td>{g.title}</td>
                        <td>{g.price} ₽</td>
                        <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => editGame(g)}
                            >
                                Редактировать
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteGame(g.id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Games;
