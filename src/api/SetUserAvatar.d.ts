import config from '@/config/configenv.d.ts';
import axios from 'axios';

export const SetAvatar = async (uuid, avatar) => {
    try {
        const response = await axios ({
            method: 'put',
            url: `${config.apiUrl}/api/zako/v1/userdata`,
            headers: {
                "Event": "Ua",
                "Authorization": `Bearer ${uuid}`,
                'Content-Type': 'multipart/form-data', // 确保设置正确的 Content-Type
            },
            data: avatar // 直接发送 FormData 对象
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
