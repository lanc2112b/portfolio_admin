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

export const getPortfolioItem = (id) => {

  return api.get(`/api/portfolios/${id}/view`)
    .then((result) => {
      //console.log(results)
      return result.data.item;
    });

};


export const postPortfolioItem = (formObj, token) => {

  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.post(`/api/admin/portfolios/add`, formObj, headers)
    .then((result) => {
      console.log(result)
      return result.data;
    });

};

export const patchPortfolioItem = (formObj, token, id) => {

  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.patch(`/api/admin/portfolios/${id}/update`, formObj, headers)
    .then((result) => {
      console.log(result)
      return result.data;
    });

};