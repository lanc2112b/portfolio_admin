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

export const getLogItems = (token, page = 1, limit = 10) => {
  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.get(`/api/admin/logs/index?page=${page}&limit=${limit}`, headers)
    .then((results) => {
      return results.data;
    });
};

export const getLandingPageItems = () => {
  //["Authorization"] = `Bearer ${token}`;

  return api.get(`/api/landings/index`)
    .then((results) => {
      //console.log(results)
      return results.data;
    });

};

export const getLandingPageItem = (id) => {
  
  return api.get(`/api/landings/${id}/view`)
    .then((result) => {
      //console.log(results)
      return result.data.item;
    });

}

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
      //console.log(result)
      return result.data.item;
    });

};

export const patchPortfolioItem = (formObj, token, id) => {

  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.patch(`/api/admin/portfolios/${id}/update`, formObj, headers)
    .then((result) => {
      //console.log(result, "in api");
      return result;
    });

};

export const deletePortfolioItem = (token, id) => {
  
  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.delete(`/api/admin/portfolios/${id}/delete`, headers)
    .then((result) => {
      return result.status;
    });
}


export const postLandingItem = (formObj, token) => {

  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.post(`/api/admin/landings/add`, formObj, headers)
    .then((result) => {
      //console.log(result)
      return result.data.item;
    });

};

export const patchLandingItem = (formObj, token, id) => {

  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.patch(`/api/admin/landings/${id}/update`, formObj, headers)
    .then((result) => {
      //console.log(result, "in api");
      return result;
    });

};

export const deleteLandingItem = (token, id) => {

  const headers = { 'headers': { 'Authorization': `Bearer ${token}` } };
  return api.delete(`/api/admin/landings/${id}/delete`, headers)
    .then((result) => {
      return result.status;
    });
}