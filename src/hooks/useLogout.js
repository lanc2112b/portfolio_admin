import { api } from "../api/api";
import useAuth from "./useAuth";

const useLogout = () => {

  const { setUser } = useAuth();

  const logout = async () => {

    setUser({});

    try {

      await api.get('/api/admin/users/logout',
        { withCredentials: true }
      );
    } 
    catch (error) {

      //console.log(error);
    }
  }

  return logout;
}

export default useLogout;