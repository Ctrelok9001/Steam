import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("userId", data.id);
                localStorage.setItem("userName", data.name);

                setMessage(`Добро пожаловать, ${data.name}!`);

                setTimeout(() => navigate("/home"), 1000);
            } else {
                const errorText = await response.text();
                setMessage(`Ошибка входа: ${errorText}`);
            }
        } catch (error) {
            setMessage("Ошибка соединения с сервером");
        }
    };

    return (
        <div className="login-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Войти</button>
            </form>

            {message && <p>{message}</p>}

            <div style={{ marginTop: "15px" }}>
                <p>Нет аккаунта?</p>
                <button onClick={() => navigate("/register")}>Зарегистрироваться</button>
            </div>
        </div>
    );
}

export default LoginPage;
