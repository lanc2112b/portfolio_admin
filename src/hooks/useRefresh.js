import { apiPrivate } from "../api/api";
import useAuth from "./useAuth";

const useRefresh = () => {
  
  const { setUser } = useAuth();

  const refresh = async () => {

    const response = await apiPrivate.get('/api/admin/users/refresh');

    setUser(prev => {
      return {
        ...prev,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        photo_url: response.data.photo_url,
        email: response.data.email,
        token: response.data.token,
        expiry: response.data.expiry
      }
    });
    
    return response.data.token;
  }
 
  return refresh;
};

export default useRefresh;