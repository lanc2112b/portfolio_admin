import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const initial = {
    user: {
      firstName: null,
      lastName: null,
      picture: null,
      email: null,
      token: null,
    },
  };


 // { ***REMOVED*** }

  const [user, setUser] = useState(initial);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

};
