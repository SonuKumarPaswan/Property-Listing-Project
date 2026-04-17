import axios from "axios";

    const api = axios.create({
        baseURL: "https://mishti-houses.onrender.com/api",
        // baseURL: "http://localhost:8085/api",
    }); 

    export  default api;
    
