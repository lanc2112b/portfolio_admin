const FourOhFour = () => {

    const redirectHandler = () => {
        window.location.replace('/');
    }

    return (
        <>
            <section id="error-404">
                <div className="error-hero-404 w-full flex flex-col items-center justify-center p-6 ">
                    <div className="bg-opacity-60 bg-zinc-700 w-full sm:w-8/12 flex justify-center items-center flex-col p-6 text-white">
                        <h2 className="text-2xl font-semibold mb-5">404 Page Not Found</h2>
                        <p className="mb-5">We're not sure where the page you were looking for has gone, if it even existed in the first place? If it's ended up in this lake, it's gone for good! Maybe head back to safety, navigation may not be your thing, stick to the path and you'll be fine ;) </p>
                        <button type="button" className="bg-cyan-500 hover:bg-cyan-600 py-1 px-3 rounded-full shadow-lg font-semibold text-slate-50" onClick={redirectHandler}>
                            <i className="animate-spin fa-regular fa-compass me-3"></i>
                            Back to Safety
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FourOhFour;
