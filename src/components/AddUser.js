import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Style/AddUser.css'
export function AddUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cni, setCni] = useState("");
    const [role, setRole] = useState("user");
    const navigate = useNavigate();
    const sessionId = useSelector((state) => state.sessionId);
    useEffect(() => {
        if (!sessionId) {
            navigate("/");
        }
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "172.30.18.42/apps/helpDeskAPI/create_account.php",
                {
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                    CNI: cni,
                    role: role,
                    sessionId: sessionId,
                }
            );
            console.log(response);
            if (response.data.status) {
                alert("User created successfully!");
            } else {
                console.log(response.data.message);
                alert("Error creating user");
            }
        } catch (error) {
            console.error(error);
            alert("Error");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cni">CNI:</label>
                <input
                    type="text"
                    id="cni"
                    value={cni}
                    onChange={(e) => setCni(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="call center">Call Center</option>
                    <option value="fournisseur">Fournisseur</option>
                    <option value="aproximity team">Aproximity Team</option>
                </select>
            </div>
            <button type="submit">Create User</button>
        </form>
    );
}
