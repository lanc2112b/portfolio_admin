import axios from "axios";

const api = axios.create({
  /* baseURL: "http://localhost:3000/api/", */
  baseURL: `${process.env.REACT_APP_API_URL}/`,

});

export const getContactItems = (token) => {
  //["Authorization"] = `Bearer ${token}`;
  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.get(`/api/admin/contacts/index`, headers )
    .then((results) => {
      //console.log(results)
      return results.data;
    });
  
};

export const getPortfolioItems = () => {

  return api.get(`/api/portfolios/index`)
    .then((results) => {
      //console.log(results)
      return results.data;
    });

};