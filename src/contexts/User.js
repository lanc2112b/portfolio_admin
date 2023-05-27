import { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {

  const initial = {
    user: {
      first_name: null,
      last_name: null,
      photo_url: null,
      email: null,
      token: null,
      refresh_at: null,
    },
  };

  const [user, setUser] = useState(initial);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

};
