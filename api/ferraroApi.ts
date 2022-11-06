import axios from 'axios';


const ferraroApi = axios.create({
    baseURL: '/api'
});

export default ferraroApi;