import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com",
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

//es importante por seguridad, no exponer la api key en el front, por eso se hace en el back y se llama desde el front