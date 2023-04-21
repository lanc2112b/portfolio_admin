import LoginButton from './LoginButton';

const LoginPage = () => {

    return (
        <>
            <section id="login-page" className="w-full flex flex-col grow items-center p-8">
                <h2 className="my-4 font-semibold text-lg text-zinc-600">Login</h2>
                <hr className="w-60 mx-auto border-zinc-500 border-1 mb-4" />
                <LoginButton />
                <ul className="mt-6 fa-ul">
                    <li><span className="fa-li text-red-500"><i className="fa-solid fa-user-shield"></i></span>Valid Google User</li>
                </ul>
            </section>
        </>
    )

}

export default LoginPage;