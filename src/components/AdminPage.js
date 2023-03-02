import React, { useState } from "react";
import { Tickets } from "./Tickets";
import { AddUser } from "./AddUser";
import "../Style/UserPage.css";

export const AdminPage = () => {
    const [selectedComponent, setSelectedComponent] = useState("AddUser");

    const handleMenuItemClick = (menuItem) => {
        setSelectedComponent(menuItem);
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div
                    className={`sidebar-menu-item ${
                        selectedComponent === "AddUser" ? "active" : ""
                    }`}
                    onClick={() => handleMenuItemClick("AddUser")}
                >
                    Add user
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
                {selectedComponent === "AddUser" && <AddUser />}
            </div>
        </div>
    );
};
