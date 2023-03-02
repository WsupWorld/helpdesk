import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../Style/Tickets.css"
export const Tickets = () => {
    const [tickets, setTickets] = useState([]);
    const sessionId = useSelector((state) => state.sessionId);
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.post(
                    "172.30.18.42/apps/helpDeskAPI/tickets.php",
                    {
                        sessionId,
                    }
                );
                console.log(response);
                setTickets(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTickets();
    }, [sessionId]);
    if (tickets) {
    return (
        <div>
            <div className="card-container">
                {tickets.map((ticket) => (
                    <div key={ticket.ticket_id} className="card" onClick={() => setSelectedTicketId(ticket.ticket_id)}>
                        <div className="card-header">
                            <h2 className="name">
                                {ticket.last_name} {ticket.first_name}
                                <div>{ticket.date}</div>
                            </h2>
                        </div>
                        <div className="card-body">
                            <h3 className="title">{ticket.title}</h3>
                            <p className="description">{ticket.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    } else {
        <div><h1>vous n'avez pas de tickets</h1></div>
}
};
