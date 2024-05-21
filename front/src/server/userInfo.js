import { useEffect, useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUserInfo(response.data);
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
                console.error(error);
            }
        };

        fetchUserInfo();
    }, []);
    const logout = () => {
        localStorage.removeItem('token');
        setUserInfo(null);
        setIsLoggedIn(false);
        navigate("/");
    };

    return { userInfo, isLoggedIn, logout };
};

export default useUserInfo;
