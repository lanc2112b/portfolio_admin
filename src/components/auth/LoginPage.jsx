import { useEffect, useState, useContext } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import { UserContext } from '../../contexts/User';
import { MessageContext } from '../../contexts/Message';
import { postLogin } from '../../api/ApiConsumer';
import SpinnerSmall from "../uiparts/SpinnerSmall";

const LoginPage = () => {

    const { setUser } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    useEffect(() => {
        document.title = 'Login';
    });

    const [googleCredential, setGoogleCredential] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => { 

        if (googleCredential) {
            setLoading(true);
            postLogin(googleCredential)
                .then((result) => {

                    setUser(result.user);
                    setLoading(false);
                    console.log(result);
            
                })
                .catch((error) => {
                    setLoading(false);

                    /** split this down into 
                     * errors by status code
                     * 
                     * user not found -> to register
                     * bad request invalid tokens user etc
                     * forbidden -> try again 
                     */
                    setMessage({
                        msgType: 'error',
                        showMsg: true,
                        title: 'Login Failed',
                        msg: 'If this message persists, please contact the administrator, if you are the administrator, fix the issue please.',
                        dismiss: true,
                    });
                    console.log(error);
                })
        }

    }, [googleCredential, setMessage, setUser]);

    if (loading)
        return <SpinnerSmall />

    return (
        <>
            <section id="login-page" className="w-full flex flex-col grow items-center p-8">
                <h2 className="my-4 font-semibold text-lg text-zinc-600">Login</h2>
                <hr className="w-60 mx-auto border-zinc-500 border-1 mb-4" />
                <GoogleLoginButton setGoogleCredential={setGoogleCredential}/>
                <ul className="mt-6 fa-ul">
                    <li><span className="fa-li text-red-500"><i className="fa-solid fa-user-shield"></i></span>Valid Google User</li>
                </ul>
            </section>
        </>
    )

}

export default LoginPage;