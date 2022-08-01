import axios from 'axios';

const BASEURL = process.env.REACT_APP_API_URL;

class ApiHandler {
    constructor() {
        this.baseURL = BASEURL;
    }

    post(url, data) {

        let axiosUrl = this.baseURL + url;
        return new Promise((resolve, reject) => {
            axios.post(axiosUrl, data)
                .then(response => {
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    }

    put(url, data) {
        let axiosUrl = this.baseURL + url;
        return new Promise((resolve, reject) => {
            axios.put(axiosUrl, data)
                .then(response => {
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    }

    delete(url, data) {
        let axiosUrl = this.baseURL + url;
        return new Promise((resolve, reject) => {
            axios.delete(axiosUrl, data)
                .then(response => {
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    }

    get() {
        let axiosUrl = this.baseURL;
        return new Promise((resolve, reject) => {
            axios.get(axiosUrl)
                .then(response => {
                    console.log("res", response)
                    resolve(response)
                }).catch(error => {
                    console.log(error);
                    reject(error)
                })
        })
    }


}

export default ApiHandler;