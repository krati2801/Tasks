import axios from 'axios';

const BASEURL = process.env.REACT_APP_API_URL;

class ApiHandler {
    constructor() {
        this.baseURL = BASEURL;
    }

    handleFormData = (data) => {
        let formData = new FormData();
        for (let prop in data) {
            if (Array.isArray(data[prop])) {
                formData.append(prop, JSON.stringify(data[prop]));
            } else {
                formData.append(prop, data[prop]);
            }
        }
        return formData;
    }

    post(url, data) {
        let formData = this.handleFormData(data);

        let axiosUrl = this.baseURL + url;
        return new Promise((resolve, reject) => {
            axios.post(axiosUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
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
            axios.put(axiosUrl, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
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