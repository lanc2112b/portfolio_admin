import { apiAuth } from "./axiosAuth";

export const postLogin = (credential) => {

  return apiAuth.post(`/api/admin/users/login`, { credential })
    .then((results) => {
      //console.log(results)
      return results.data;
    });

}