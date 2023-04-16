import { createContext, useState } from "react";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const initial = {
    msgType: null,
    showMsg: null,
    title: null,
    msg: null,
    dismiss: null,
  };

  const [message, setMessage] = useState(initial);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
