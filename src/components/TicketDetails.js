import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/TicketForm.css";
export const TicketDetails = ({ ticketId }) => {
    const [ticket, setTicket] = useState(null);

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.post(
                    "172.30.18.42/apps/helpDeskAPI/ticket.php",
                    {
                        sessionId,
                        ticketId,
                    }
                );
                console.log(response);
                setTicket(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTicket();
    }, []);

    if (!ticket) {
        return null;
    }

    return (
        <div>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            {/* Display other ticket details here */}
        </div>
    );
};
