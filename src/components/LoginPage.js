import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSessionId } from "../actions/SessionActions.js";
import { useNavigate } from "react-router-dom";
import "../Style/LoginPage.css";

export function LoginForm() {
    // State variables to store input values
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "172.30.18.42/apps/helpDeskAPI/login.php",
                {
                    username: username,
                    password: password,
                }
            );
            const data = await response.data;
            if (data.status === 1) {
                alert("Login successfull!");
                dispatch(setSessionId(data["sessionId"]));
                navigate("/Auth");
            } else if (data.status === 0) {
                console.log(data.message);
                alert("Invlaid login");
            } else {
                console.log(data);
                alert("Error");
            }
        } catch (error) {
            console.error(error);
            alert("Error");
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <button type="submit">Log In</button>
        </form>
    );
}
