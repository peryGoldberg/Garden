import axios from 'axios';
let baseUrl="https://projectnode-feg7.onrender.com/api/"

export const login = (login) => {
    return axios.post(`${baseUrl}user/login/`,login,{
        headers: {
                   "x-access-token": localStorage.getItem("currentToken")
               }
    });
}

export const addUser = (user) => {
    return axios.post(`${baseUrl}user/`,user,{
        headers: {
                   "x-access-token": localStorage.getItem("currentToken")
               }
    });
}

export const getAllUsers = () => {
    return axios.get(`${baseUrl}user/`);
}



