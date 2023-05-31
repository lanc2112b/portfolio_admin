import { useContext } from 'react';
import { MessageContext } from '../../contexts/Message';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ setGoogleCredential }) => {

    const { setMessage } = useContext(MessageContext);

    const handleGoogleResponse = (credential) => {

        setGoogleCredential(credential);
    }

    const handleGoogleError = () => {

        setMessage(
            {
                msgType: 'error',
                showMsg: true,
                title: 'Login Failed',
                msg: 'If this message persists, please contact the administrator, if you are the administrator, fix the issue please.',
                dismiss: true,
            }
        );
    }

    return (
        <>
            <GoogleLogin
                useOneTap={true}
                size="large"
                shape="pill"
                onSuccess={credentialResponse => {
                    handleGoogleResponse(credentialResponse?.credential);
                    //console.log(credentialResponse);
                }}
                onError={() => {
                    handleGoogleError();
                    //console.log('Login Failed');
                }}
            />
        </>
    )


}

export default GoogleLoginButton;