const SpinnerSmall = () => {

    return (
        <>
            <div className="flex flex-row justify-center items-center my-4">
                <div className="w-10 h-10 border-4 border-t-transparent border-blue-800 border-dashed rounded-full animate-spin-slower me-3">
                </div>
                <p className="text-xl font-semibold text-blue-800">Loading...</p>
            </div>
        </>
    )
}

export default SpinnerSmall;