import config from '@/config/configenv.d.ts';
import axios from 'axios';

export const register = async (uname, password, email) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/register`,
            data: {
                "uname": uname,
                "pwd": password,
                "e": email,
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Error fetching server info:', error);
        return {
            status: error.response ? error.response.status : 500,
            data: error.response ? error.response.data : { message: 'Server not available' }
        };
    }
};
    