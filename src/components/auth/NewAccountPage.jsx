import { useEffect } from 'react';
import NewAccountButton from './NewAccountButton';

const NewAccountPage = () => {

    useEffect(() => {
        document.title = 'Register';
    })

    return (
        <>
            <section id="registration-page" className="w-full flex flex-col grow items-center p-8">
                <h2 className="my-4 font-semibold text-lg text-zinc-600">Register</h2>
                <hr className="w-60 mx-auto border-zinc-500 border-1 mb-4" />
                <NewAccountButton />
                <ul className="mt-6 fa-ul">
                    <li><span className="fa-li text-red-500"><i className="fa-solid fa-user-shield"></i></span>Valid Google User</li>
                </ul>
            </section>
        </>
    )

}

export default NewAccountPage;