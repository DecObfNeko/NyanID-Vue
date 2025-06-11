import config from '@/config/configenv.d.ts';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const login = async (email, password) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/login`,
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

export const verify2FA = async (code, token) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/login/2fa`,
            headers: {
                'Content-Type': 'application/json',
                "verifyCode":   code, 
                "Token": token
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

export const getPublicUserInfo = async (UUID) => {
    try {
        const response = await axios ({
            method: 'get',
            url: `${config.apiUrl}/api/zako/v2/userinfo/`+UUID,
            changOrigin: true,
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

export const ForGotPwd = async (email) => {
    try {
        const response = await axios ({
            method: 'get',
            url: `${config.apiUrl}/api/zako/v1/forgetpwd?email=${email}`,
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

export const BindMCAccount = async (code,LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/userdata`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',
            },
            data: {
                "action": 3,
                "code": code
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

export const ResetPwd = async (email, code, passwd) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/forgetpwd`,
            data: {
                "email" : email,
                "code": code,
                "password": passwd 
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

export const getServerInfo = async () => {
    try {
        const response = await axios.get(`${config.apiUrl}/api/zako/v2/server`);
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        console.error('Error fetching server info:', error);
        return {
            status: error.response ? error.response.status : 500,
            data: error
        };
    }
};

export const SetNickName = async (nickname,LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/userdata`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',
            },
            data: {
                "action": 0,
                "nickname": nickname
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

export const SetSign = async (description,LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/userdata`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',
            },
            data: {
                "action": 2,
                "description": description
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

export const SetUserName = async (Username,LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/userdata`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',
            },
            data: {
                "action": 1,
                "username": Username
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

export const SwitchEnableGIFAvatar = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/userdata`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',
            },
            data: {
                "action": 4
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

export const getUserInfo = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'get',
            url: `${config.apiUrl}/api/zako/v1/userinfo`,
            changOrigin: true,
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

export const getUserDevices = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'get',
            url: `${config.apiUrl}/api/zako/v1/user/devices`,
            changOrigin: true,
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

export const getUserViolationHistory = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'get',
            url: `${config.apiUrl}/api/zako/v1/user/violation/history`,
            changOrigin: true,
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

export const verification = async (token) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/register/verification`,
            data: {
                "code": token
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

export const OpenYggdrasilAccount = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/yggdrasil/open/account`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',

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

export const Open2fa = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/user/2fa/open2fa`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',

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

export const Close2fa = async (LoginToken) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v1/user/2fa/close2fa`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'Ud',

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

export const SearchUser = async (value : string) => {
    try {
        const response = await axios ({
            method: 'post',
            url: `${config.apiUrl}/api/zako/v2/searchuser`,
            changOrigin: true,
            data: {
                "value": value,
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

export const DeleteDevice = async (LoginToken,value : string) => {
    try {
        const response = await axios ({
            method: 'delete',
            url: `${config.apiUrl}/api/zako/v1/user/devices`,
            changOrigin: true,
            headers: {
                'Authorization': `Bearer ${LoginToken}`,
                'Event': 'De',
            },
            data: {
                "value": value,
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