import config from '@/config/configenv.d.ts';
import axios from 'axios';

export const getServerInfo = async () => {
    try {
        const response = await axios.get(`${config}/api/zako/v2/server`);
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Error fetching server info:', error);
        return {
            status: error.response ? error.response.status : 500,
            data: null
        };
    }
};
