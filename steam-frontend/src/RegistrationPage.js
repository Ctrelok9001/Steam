import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function RegistrationPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8081/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(` Пользователь ${data.name} успешно зарегистрирован!`);
                setName("");
                setEmail("");
                setPassword("");

                setTimeout(() => navigate("/login"), 1500);
            } else {
                let errorText;
                try {
                    const errJson = await response.json();
                    errorText = errJson.message || JSON.stringify(errJson);
                } catch {
                    errorText = await response.text();
                }
                setMessage(` Ошибка регистрации: ${errorText || "Неизвестная ошибка"}`);
            }
        } catch (error) {
            setMessage(" Ошибка соединения с сервером");
        }
    };

    return (
        <div className="registration-container">
            <h2>Создание аккаунта Steam</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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

                <button type="submit">Создать аккаунт</button>
            </form>

            {message && <p>{message}</p>}

            <div className="auth-link">
                <p>Уже есть аккаунт?</p>
                <button onClick={() => navigate("/login")}>Войти</button>
            </div>
        </div>
    );
}

export default RegistrationPage;
