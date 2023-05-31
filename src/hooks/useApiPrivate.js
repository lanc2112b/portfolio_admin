import { useEffect } from "react";

import useRefresh from "./useRefresh";
import useAuth from "./useAuth";

import { apiPrivate } from "../api/api";

const useApiPrivate = () => {

  const refresh = useRefresh();
  const { user } = useAuth();

  useEffect(() => {

    const requestIntercept = apiPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {

          config.headers['Authorization'] = `Bearer ${user?.token}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {

          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiPrivate(prevRequest);
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.response.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [user, refresh]);

  return apiPrivate;
}

export default useApiPrivate;