import axios from "axios";



export const put = async (url, formData, cbResponse) => {

    try {
        const data = await axios.put(url, formData)
        cbResponse(data.data)

    } catch (error) {
        console.log(error);
    }
}

export const postUser = async (url, formData, cbResponse) => {
    try {
        //const data = await axios.post(url, formData)
        const data = await axios.post('http://localhost:3500/users/register', formData)
        cbResponse(data.data)

    } catch (error) {
        console.log("Error generado " + error);
        return error;
    }
}

export const post = async (url, formData, cbResponse) => {
    try {
        const data = await axios.post(url, formData)
        //const data = await axios.post('http://localhost:3500/users/register', formData)
        cbResponse(data.data)

    } catch (error) {
        console.log("Error generado " + error);
        return error;
    }
}

export const get = async (url) => {
    
    const config = {
        headers:{
          'user-token': localStorage.getItem('token'),
        }
      };
    console.log("Header que viaja " + JSON.stringify(config.headers))
    try {
        const data = await axios.get(url,config)
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const del = async (url, formData) => {
    try {
        const data = await axios.delete(url, formData)

    } catch (error) {
        console.log("Error generado " + error);
        return error;
    }
}