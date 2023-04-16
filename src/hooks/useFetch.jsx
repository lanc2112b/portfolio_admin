import { useState, useContext } from "react";  //, useContext
//import { MessageContext } from "../contexts/Message";
import { UserContext } from "../contexts/User";

// Pass URL
const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  //const { setMessage } = useContext(MessageContext);
  const { setUser } = useContext(UserContext);

  //console.log(error, 'error message')
  const handleGoogle = async (response) => {
    setLoading(true);
    setError("");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);

        //console.log(res.status);

        return res.json();
      })
      .then((data) => {
        //if (data.user.accounts) {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          setUser({
            user: {
              firstName: data.first_name,
              lastName: data.last_name,
              picture: data.photo_url,
              email: data.email,
              token: data.access_token,
              refresh: data.refresh_at,
            }
          });
            // setUser(data?.user); //Doesn't persist past reload / replace
          //window.location.reload();
          window.location.replace('/')
        }

        throw new Error(data?.message || data); //TODO: FIX This!!!!
      })
      .catch((error) => {
        setError(error?.message);
        //console.log(error)
        //const errorColour = (error?.message === 'Login was successful' ? 'success' : 'warning');
        //const messageHeader = (error?.message === 'PlaidPal Error: User already exists' ? 'Error: ' : 'Success: ');
        //const extraText = (error?.message === 'PlaidPal Error: User already exists' ? '. Please use Log In' : '');
          console.log(error)
          /* setMessage({
            msgType: "info",
            showMsg: true,
            variant: errorColour,
            title: messageHeader,
            msg: error?.message + extraText,
          }) */
      });
  };
  
  return { loading, error, handleGoogle };
};

export default useFetch;
