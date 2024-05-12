import axios from "./axios";

export const getAllUsers = async () => {
    try {


        const response = await axios.get("/api/users/get-users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            method: 'GET'
        });
        return response.data;
    } catch (err) {
        console.log("Error to get users", err);
        throw new Error;
    }
}
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post('/api/users/login', { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Request failed with status code:', error.response.status);
            console.error('Response data:', error.response.data);
            throw new Error('Failed to login: ' + error.response.data.error);
        } else if (error.request) {

            console.error('No response received:', error.request);
            throw new Error('Failed to login: No response received');
        } else {
            console.error('Error setting up the request:', error.message);
            throw new Error('Failed to login: ' + error.message);
        }
    }
}
export const registerUser = async (username, email, password) => {
    try {
        const response = await axios.post('/api/users/register', { username, email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Request failed with status code:', error.response.status);
            console.error('Response data:', error.response.data);
            throw new Error('Failed to register: ' + error.response.data.error);
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('Failed to register: No response received');
        }
    }
}
export const removeUser = async (ids) => {
    try {
        const response = await axios.delete('/api/users/delete', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            data: { ids }
        },
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Request failed with status code:', error.response.status);
            console.error('Response data:', error.response.data);
            throw new Error('Failed to remove: ' + error.response.data.error);
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('Failed to remove: No response received');
        } else {
            console.error('Error setting up the request:', error.message);
            throw new Error('Failed to remove:' + error.message);
        }
    }
}
export const blockUsers = async (ids) => {
    try {
        const response = await axios.put('/api/users/block',
            { ids },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error blocking users:', error);
        throw new Error('Failed to block users');
    }
};
export const unblockUsers = async (ids) => {
    try {
        const response = await axios.put('/api/users/unblock', { ids }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error unblocking users:', error);
        throw new Error;
    }
}
export const addAdmin = async (ids) => {
    try {
        const response = await axios.put('/api/users/add-admin', { ids }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error adding admin:', error);
        throw new Error;
    }
}
export const removeAdmin = async (ids) => {
    try {
        const response = await axios.put('/api/users/remove-admin', { ids }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response.data;
    } catch (error) {
        console.log('Error removing admin:', error);
        throw new Error;
    }
}