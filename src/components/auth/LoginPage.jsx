import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { postLogin } from '../../api/authRoutes';
import { MessageContext } from '../../contexts/Message';

import GoogleLoginButton from './GoogleLoginButton';
import SpinnerSmall from "../uiparts/SpinnerSmall";

const LoginPage = () => {

    const { setUser, persist, setPersist } = useAuth();
    const { setMessage } = useContext(MessageContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        document.title = 'Login';
    });

    const [googleCredential, setGoogleCredential] = useState(null);
    const [loading, setLoading] = useState(false);

    const togglePersist = () => {

        setPersist(prev => !prev);
    }

    useEffect(() => {

        localStorage.setItem("persist", persist);    
    }, [persist]);


    useEffect(() => { 

        if (googleCredential) {
            setLoading(true);
            postLogin(googleCredential)
                .then((result) => {

                    setUser(result.user);
                    setLoading(false);
                    navigate(from, { replace: true });
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

    }, [googleCredential, setMessage, setUser, from, navigate]);

    if (loading)
        return <SpinnerSmall />

    return (
        <>
            <section id="login-page" className="w-full flex flex-col grow items-center p-8">
                <h2 className="my-4 font-semibold text-lg text-zinc-600">Login</h2>
                <hr className="w-60 mx-auto border-zinc-500 border-1 mb-4" />
                <GoogleLoginButton setGoogleCredential={setGoogleCredential} />
                <div className="flex items-center mt-3">
                    <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} className="rounded text-cyan-500 me-2"/>
                    <label htmlFor='persist'>Remember me? </label>
                </div>
                <ul className="mt-6 fa-ul">
                    <li><span className="fa-li text-red-500"><i className="fa-solid fa-triangle-exclamation"></i></span><h4 className="font-semibold">Required: </h4></li>
                    <li><span className="fa-li text-red-500"><i className="fa-solid fa-user-shield"></i></span>Valid Google User</li>
                </ul>
            </section>
        </>
    )

}

export default LoginPage;