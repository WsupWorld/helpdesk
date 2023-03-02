import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export function RoleCheck({ Component, allowedRole }) {
    const sessionId = useSelector((state) => state.sessionId);
    const [test, setTest] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSession = async () => {
            const response = await axios.post(
                "172.30.18.42/apps/helpDeskAPI/role_check.php",
                {
                    sessionId: sessionId,
                    role: allowedRole,
                }
            );
            const data = await response.data;
            setTest(data.success)
            if (!data.success) {
                navigate("/");
            }
        };
        fetchSession();
    }, []);
    if (test) {
       return <div>{Component}</div>
    }
}
