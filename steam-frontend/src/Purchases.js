import React, { useEffect, useState } from "react";
import "./Admin.css";

function Purchases() {
    const [purchases, setPurchases] = useState([]);
    const [form, setForm] = useState({ userId: "", gameId: "" });
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [editingId, setEditingId] = useState(null); // id редактируемой покупки

    const loadPurchases = () => {
        fetch("http://localhost:8081/purchases")
            .then((res) => res.json())
            .then((data) => setPurchases(data))
            .catch((err) => console.error("Ошибка загрузки покупок:", err));
    };

    useEffect(() => {
        loadPurchases();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            fetch(
                `http://localhost:8081/purchases/${editingId}?userId=${form.userId}&gameId=${form.gameId}`,
                { method: "PUT" }
            ).then(() => {
                setForm({ userId: "", gameId: "" });
                setEditingId(null);
                loadPurchases();
            });
        } else {
            fetch(
                `http://localhost:8081/purchases?userId=${form.userId}&gameId=${form.gameId}`,
                { method: "POST" }
            ).then(() => {
                setForm({ userId: "", gameId: "" });
                loadPurchases();
            });
        }
    };

    const deletePurchase = (id) => {
        fetch(`http://localhost:8081/purchases/${id}`, { method: "DELETE" })
            .then(() => loadPurchases());
    };

    const loadDetails = (id) => {
        fetch(`http://localhost:8081/purchases/${id}/details`)
            .then((res) => res.json())
            .then((data) => setSelectedDetails(data))
            .catch((err) => console.error("Ошибка загрузки деталей:", err));
    };

    const editPurchase = (p) => {
        setForm({ userId: p.userId, gameId: p.gameId });
        setEditingId(p.id);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Покупки</h1>

            <form onSubmit={handleSubmit} className="mb-3">
                <input
                    type="number"
                    placeholder="User ID"
                    className="form-control mb-2"
                    value={form.userId}
                    onChange={(e) => setForm({ ...form, userId: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Game ID"
                    className="form-control mb-2"
                    value={form.gameId}
                    onChange={(e) => setForm({ ...form, gameId: e.target.value })}
                />
                <button className="btn btn-success" type="submit">
                    {editingId ? "Обновить" : "Создать"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ userId: "", gameId: "" });
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
                    <th>User ID</th>
                    <th>Game ID</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {purchases.map((p) => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.userId}</td>
                        <td>{p.gameId}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => loadDetails(p.id)}
                            >
                                Подробнее
                            </button>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => editPurchase(p)}
                            >
                                Редактировать
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deletePurchase(p.id)}
                            >
                                Удалить
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedDetails && (
                <div className="card mt-4">
                    <div className="card-body">
                        <h5 className="card-title">
                            Детали покупки #{selectedDetails.purchase.id}
                        </h5>
                        <p>
                            <strong>Пользователь:</strong> {selectedDetails.user.name} (
                            {selectedDetails.user.email})
                        </p>
                        <p>
                            <strong>Игра:</strong> {selectedDetails.game.title} —{" "}
                            {selectedDetails.game.price} ₽
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Purchases;
