import config from '@/config/configenv.d.ts';
import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config}/api/zako/v1/login`,
            data: {
                "email": email,
                "pwd": password
            },
            headers: {
                'Content-Type': 'application/json',
                "LoginForWeb":"true" 
            }
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error('Error fetching server info:', error);
        return {
            status: error.response ? error.response.status : 500,
            data: error.response ? error.response.data : { message: 'Server not available' }
        };
    }
};
    