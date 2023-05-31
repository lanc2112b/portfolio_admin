import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const handleGoogle = async (response) => {
    setLoading(true);
    setError("");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {

        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          setUser(data?.user); 
          window.location.replace('/')
        }

        throw new Error(data?.message || data); //TODO: FIX This!!!!
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
