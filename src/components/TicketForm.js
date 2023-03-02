import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../Style/TicketForm.css"
export const TicketForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const sessionId = useSelector((state) => state.sessionId);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "172.30.18.42/apps/helpDeskAPI/create_ticket.php",
                { title, description, sessionId }
            );
            alert("Done");
            setTitle("");
            setDescription("");
        } catch (error) {
            // handle error from API
        }
    };

    return (
        <div className="ticket-form-container">
            <form onSubmit={handleSubmit} className="ticket-form">
                <div className="form-field">
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <button type="submit">Create Ticket</button>
            </form>
        </div>
    );
};
