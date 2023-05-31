import { apiPrivate } from "./api";

export const postLogin = (credential) => {

  return apiPrivate.post(`/api/admin/users/login`, { credential })
    .then((results) => {
      //console.log(results)
      return results.data;
    });

}


export const postRegister = (credential) => {

  return apiPrivate.post(`/api/admin/users/register`, { credential })
    .then((results) => {
      //console.log(results)
      return results.data;
    });

}
/** add registration */