import axios from 'axios';

const instance = axios.create({
    baseURL: "https://whatsapp-clone-ycf9.onrender.com/api/v1"
});

export default instance;