import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

const get = async (path, options = {}) => {
    const responsive = await request.get(path, options);
    return responsive.data;
};

export { get };
export default request;
