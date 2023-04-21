import { useContext } from "react";
import { MessageContext } from "../../contexts/Message";

const ErrorMessage = () => {

    const { message, setMessage } = useContext(MessageContext);

    const dismissHandler = () => {
        setMessage({
            msgType: null,
            showMsg: null,
            title: null,
            msg: null,
            dismiss: null,
        })
    }

    if (message?.msgType !== 'error')
        return;

    return (
        <>
            <div className={`${message?.showMsg ? 'flex' : 'hidden'}  justify-between bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`} role="alert">
                <div>
                    <h2 className=" mb-2 font-bold text-xl">Halt: {message?.title}</h2>
                    <p className="w-full block mb-3 md:inline">{message?.msg}</p>
                    <button className="ms-0 md:ms-6 py-1 px-3 text-white bg-red-400 hover:bg-red-500 rounded-full font-semibold" onClick={dismissHandler}>
                        Dismiss
                    </button>
                </div>

                <div className="text-lg">
                    <span onClick={dismissHandler}>
                        <i className="fa-regular fa-circle-xmark" role="button"></i>
                    </span>
                </div>
            </div>
        </>
    )
}

export default ErrorMessage;