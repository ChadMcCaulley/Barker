import axios from "axios";  // smaller library then jquery, great for json requests

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
            .then(res => {
                return resolve(res.data)
            })
            .catch(err => {
                return reject(err.response.data.error);
            })
    });
}