import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const PrivateRoute = ({ component: Component, role,  ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const sessionId = useSelector((state) => state.sessionId);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.post(
                    "172.30.18.42/apps/helpDeskAPI/check_session.php",
                    {
                        sessionId: sessionId,
                    }
                );
                const data = await response.data;
                // console.log(sessionId);
                console.log(data);
                switch (data['role']) {
                    case 'Admin':
                        console.log('go');
                        navigate('/Admin')
                        break;
                    case 'user':
                        navigate('/User')
                        break;
                    case 'call center':
                        navigate('/CallCenter')
                        break;
                    default:
                        navigate('/')
                        break;
                }
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchSession();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
};
