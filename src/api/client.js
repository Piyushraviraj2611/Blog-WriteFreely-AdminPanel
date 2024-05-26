import axios from "axios";

const client = axios.create({ baseURL: "https://blog-writefreely-backend.onrender.com/api/v1" });
// const client = axios.create({ baseURL: "http://localhost:4848/api/v1"});
export default client;
