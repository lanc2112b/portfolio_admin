import axios from "axios";

export const api = axios.create({

  baseURL: `${process.env.REACT_APP_API_URL}/`,
});

export const apiPrivate = axios.create({
  
  baseURL: `${process.env.REACT_APP_API_URL}/`,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,

});
