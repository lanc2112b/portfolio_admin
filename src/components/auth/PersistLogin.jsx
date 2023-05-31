import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import useRefresh from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";
import SpinnerSmall from "../uiparts/SpinnerSmall";

const PersistLogin = () => {

    const [loading, setLoading] = useState(true);
    
    const refresh = useRefresh();
    const { user, persist } = useAuth();

    useEffect(() => {

        const verifyRefreshToken = async () => {
            
            try {

                await refresh();
            } catch (error) {
                //TODO: Error Handling!
                //console.log(error);
            } finally {

                setLoading(false);
            }
        }
        
        !user?.token && persist ? verifyRefreshToken() : setLoading(false);
    }, [persist, refresh, user?.token]);

    /* useEffect(() => {

        console.log(`is loading: ${loading}`);
        console.log(`access token: ${JSON.stringify(user?.token)}`);
    }, [loading]); */

    return (
        <>
            
            {!persist ?
                <Outlet />
                : loading ?
                    <SpinnerSmall />    
                    :
                    <Outlet />
            }
        </>
    )
}

export default PersistLogin;