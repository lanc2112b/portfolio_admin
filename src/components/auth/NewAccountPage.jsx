import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import { postRegister } from '../../api/authRoutes';
import { MessageContext } from '../../contexts/Message';

import SpinnerSmall from "../uiparts/SpinnerSmall";
import GoogleRegisterButton from './GoogleRegisterButton';

const NewAccountPage = () => {

    const { setUser, persist, setPersist } = useAuth();
    const { setMessage } = useContext(MessageContext);

    const [loading, setLoading] = useState(false);
    const [googleCredential, setGoogleCredential] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        document.title = 'Register';
    });

    const togglePersist = () => {

        setPersist(prev => !prev);
    }

    useEffect(() => {

        localStorage.setItem("persist", persist);
    }, [persist]);

    useEffect(() => {

        if (googleCredential) {
            setLoading(true);
            postRegister(googleCredential)
                .then((result) => {

                    setUser(result.user);
                    setLoading(false);
                    navigate(from, { replace: true });
                })
                .catch((error) => {

                    setLoading(false);
                    if (error.response.status === 409) {

                        setMessage({
                            msgType: 'error',
                            showMsg: true,
                            title: 'Registration Failed',
                            msg: 'User already exists, try logging in',
                            dismiss: true,
                        });
                    } else if (error.response.status === 401) { 

                        setMessage({
                            msgType: 'error',
                            showMsg: true,
                            title: 'Registration Failed',
                            msg: 'Invalid or expired token, please try again',
                            dismiss: true,
                        });
                    } else {

                        setMessage({
                            msgType: 'error',
                            showMsg: true,
                            title: 'Registration Failed',
                            msg: 'Something went wrong, if this error persists, please contact the administrator',
                            dismiss: true,
                        });
                    }
                    //console.log(error);
                })
        }

    }, [googleCredential, setMessage, setUser, from, navigate]);

    if (loading)
        return <SpinnerSmall />

    return (
        <>
            <section id="registration-page" className="w-full flex flex-col grow items-center p-8">
                <h2 className="my-4 font-semibold text-lg text-zinc-600">Register</h2>
                <hr className="w-60 mx-auto border-zinc-500 border-1 mb-4" />
                <GoogleRegisterButton setGoogleCredential={setGoogleCredential} />
                <div className="flex items-center mt-3">
                    <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} className="rounded text-cyan-500 me-2" />
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

export default NewAccountPage;