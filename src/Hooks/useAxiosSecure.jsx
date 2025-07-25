import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {


    const axiosSecure = axios.create(
       {
        baseURL:'https://bongo-tour-server.vercel.app'
       }
    )

    return axiosSecure
};

export default useAxiosSecure;