import React, { useState } from "react";
import {Tickets} from "./Tickets";
import { TicketForm } from "./TicketForm";
import "../Style/UserPage.css"

export const UserPage = () => {
    const [selectedComponent, setSelectedComponent] = useState("ticketForm");

    const handleMenuItemClick = (menuItem) => {
        setSelectedComponent(menuItem);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div
                    className={`sidebar-menu-item ${
                        selectedComponent === "ticketForm" ? "active" : ""
                    }`}
                    onClick={() => handleMenuItemClick("ticketForm")}
                >
                    Ticket Form
                </div>
                <div
                    className={`sidebar-menu-item ${
                        selectedComponent === "ticketList" ? "active" : ""
                    }`}
                    onClick={() => handleMenuItemClick("ticketList")}
                >
                    Ticket List
                </div>
            </div>
            <div className="content">
                {selectedComponent === "ticketList" && <Tickets />}
                {selectedComponent === "ticketForm" && <TicketForm />}
            </div>
        </div>
    );
}
