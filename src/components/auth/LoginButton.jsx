import { useEffect } from 'react';
import useFetch from "../../hooks/useFetch";
import SpinnerButton from '../uiparts/SpinnerButton';

// https://developers.google.com/identity/gsi/web/reference/js-reference

const LoginButton = () => {

    const { handleGoogle, loading } = useFetch(
        `${process.env.REACT_APP_API_URL}/api/admin/users/login`  //FIXME: Needs to be added to .env.local!
    );

    useEffect(() => {

        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });

            window.google.accounts.id.renderButton(document.getElementById("loginDiv"), {
                type: "standard",
                //theme: "filled_black",
                // size: "small",
                text: "signin_with",
                shape: "pill",
            });

            // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    return (
        <>
            {loading ?
                <>
                    <SpinnerButton buttonText={'Logging in'} />
                </>
                : <div id="loginDiv"></div>}

            { }

        </>
    );
};

export default LoginButton;