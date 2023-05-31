import { useNavigate } from "react-router-dom";

const Forbidden = () => {

    const navigate = useNavigate();
    
    const redirectHandler = () => {
        navigate("/");
    }

    return (
        <>
            <section id="error-404">
                <div className="error-hero-404 w-full flex flex-col items-center justify-center p-6 ">
                    <div className="bg-opacity-60 bg-zinc-700 w-full sm:w-8/12 flex justify-center items-center flex-col p-6 text-white">
                        <h2 className="text-2xl font-semibold mb-5">403 Forbidden</h2>
                        <p className="mb-5">Unfortunately you're forbidden from accessing the page you were trying to access! We're sure that this is just an oversight on your part and you perhaps forgot to log in? </p>
                        <button type="button" className="bg-cyan-500 hover:bg-cyan-600 py-1 px-3 rounded-full shadow-lg font-semibold text-slate-50" onClick={redirectHandler}>
                            <i className="animate-spin fa-regular fa-compass me-3"></i>
                            Login
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Forbidden;
