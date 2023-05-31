import { useContext } from "react";
import { UserContext } from "../contexts/User";

const useAuth = () => {

  return useContext(UserContext);

}

export default useAuth;