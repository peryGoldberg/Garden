import axios from 'axios';
let baseUrl="https://projectnode-feg7.onrender.com/api/"

export const getAllorders = (token) => {
    return axios.get(`${baseUrl}order/`,{
        headers: {
                   "x-access-token": token
               }
            });
}

export const  addorder= (order,token) => {
    return axios.post(`${baseUrl}order/`,order,{
        headers: {
                   "x-access-token": token
               }
            });
}

export const deleteorderById = (id) => {
    return axios.delete(`${baseUrl}order/`);
}

export const  getAllOrderByUserId= (id) => {
    return axios.get(`${baseUrl}order/`);
}

export const  updateorderSetOff= (login) => {
    return axios.put(`${baseUrl}order/`);
}
   