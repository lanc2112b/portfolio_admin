import { useEffect } from 'react';
import useFetch from "../../hooks/useFetch";
import SpinnerButton from '../uiparts/SpinnerButton';


const NewAccountButton = () => {
    
    const { handleGoogle, loading } = useFetch(   // error   : optional param if needed
        `${process.env.REACT_APP_API_URL}/signup`
    );

    useEffect(() => {

        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle,
            });

            window.google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
                type: "standard",
                //theme: "filled_black",
                // size: "small",
                text: "continue_with",
                shape: "pill",
            });

            // google.accounts.id.prompt()
        }
    }, [handleGoogle]);

    return (
        <>
            {loading ? (
                <>
                    <SpinnerButton buttonText={'Registering user'}/>
                </>
            ) : (
                <div id="signUpDiv" data-text="signup_with"></div>
            )}
        </>
    )
}

export default NewAccountButton;