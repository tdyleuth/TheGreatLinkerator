import React from 'react';
import axious from 'axios'

const BASE_URL = "http://localhost:3000/api/links"

export default function DeleteBookmark() {

const token 

const headers = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ token }`} 
        }
    
    
    const data = await axios.delete(BASE_URL + '/:linkId', headers)

    console.log(data)


}