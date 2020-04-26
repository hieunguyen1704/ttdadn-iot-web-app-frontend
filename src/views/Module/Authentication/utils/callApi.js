import axios from 'axios'

const callApi = (endpoint, method = 'GET', data = null) => {
    const res = axios({
        method: method,
        headers: { 'Content-Type': 'application/json' },
        data: data,
        url: endpoint,
    })
    return res;
}
export default callApi;