import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { AdminPage } from "./components/AdminPage.js";
import { LoginForm } from "./components/LoginPage.js";
import { RoleCheck } from "./components/RoleCheck.js";
import { UserPage } from "./components/UserPage.js";
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LoginForm />} />
                    <Route
                        exact
                        path="/Admin"
                        element={
                            <RoleCheck
                                Component={<AdminPage />}
                                allowedRole="Admin"
                            />
                        }
                    />
                    <Route
                        exact
                        path="/User"
                        element={
                            <RoleCheck
                                Component={<UserPage />}
                                allowedRole="user"
                            />
                        }
                    />
                    <Route
                        exact
                        path="/Auth"
                        element={<PrivateRoute />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
    