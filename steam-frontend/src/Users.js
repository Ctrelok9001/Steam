import React, { useEffect, useState } from "react";
import "./Admin.css";

function Users() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email: "" });
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadUsers = () => {
        setLoading(true);
        setError("");
        fetch("http://localhost:8081/users")
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при загрузке пользователей");
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const method = editingId ? "PUT" : "POST";
        const url = editingId ? `http://localhost:8081/users/${editingId}` : "http://localhost:8081/users";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при сохранении пользователя");
                return res.json();
            })
            .then(() => {
                setForm({ name: "", email: "" });
                setEditingId(null);
                loadUsers();
            })
            .catch((err) => setError(err.message));
    };

    const deleteUser = (id) => {
        setError("");
        fetch(`http://localhost:8081/users/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Ошибка при удалении");
                loadUsers();
            })
            .catch((err) => setError(err.message));
    };

    const editUser = (user) => {
        setForm({ name: user.name, email: user.email });
        setEditingId(user.id);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-primary">Пользователи</h1>

            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <div className="alert alert-info">Загрузка...</div>}

            <form onSubmit={handleSubmit} className="mb-3 d-flex flex-column flex-md-row gap-2">
                <input
                    type="text"
                    placeholder="Имя"
                    className="form-control"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <button className={`btn ${editingId ? "btn-warning" : "btn-success"}`} type="submit">
                    {editingId ? "Обновить" : "Добавить"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ name: "", email: "" });
                        }}
                    >
                        Отмена
                    </button>
                )}
            </form>

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th className="text-center">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td className="text-center">
                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => editUser(u)}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => deleteUser(u.id)}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && !loading && (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                Пользователи не найдены
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
