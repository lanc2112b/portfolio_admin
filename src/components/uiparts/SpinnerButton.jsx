const SpinnerButton = ({buttonText}) => {
    return (
        <>
            <button type="button" className="bg-indigo-500 rounded-full py-2 px-3 m-2 font-semibold text-white" disabled>
                <i className="animate-spin fa-solid fa-spinner me-2"></i>
                <span >{buttonText}</span>
            </button>
        </>
    )
}

export default SpinnerButton;