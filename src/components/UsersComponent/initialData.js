import React from 'react'
import { get } from '../../httprequest/httprequest';

let initialData;

try {
    const url = process.env.REACT_APP_API_BASE_URL;
    initialData = await get(`${url}/users`);
}
catch(error) {
    console.log("Servidor de data no iniciado")
}

export default initialData