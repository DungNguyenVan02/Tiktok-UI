import axios from 'axios';
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

const get = async (path, options = {}) => {
    const responsive = await request.get(path, options);
    return responsive.data;
};

export { get };
export default request;
