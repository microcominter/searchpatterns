import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, token, params) => {
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: {
            'Authorization':`Bearer ${token}`
        },
        params: params ? params : null,
    });
}