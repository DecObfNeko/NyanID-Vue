import config from '@/config/configenv.d.ts';
import axios from 'axios';

export const getUserInfo = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'get',
            url: `${config}/api/zako/v1/userinfo`,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Gi',
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