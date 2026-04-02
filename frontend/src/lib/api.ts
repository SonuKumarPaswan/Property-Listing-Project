import axios from "axios";

    const api = axios.create({
        baseURL: "http://localhost:8085/api",
    }); 

    export  default api;
    
