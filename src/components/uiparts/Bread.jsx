//import toast from "react-hot-toast";
const Bread = ({ msgObj }) => {
    
    /* <button className="my-2 py-1 px-3 rounded-full bg-green-300 font-semibold text-green-800 hover:text-green-100 hover:bg-green-700" onClick={() => toast.dismiss(tid)}>
        Dismiss
    </button> */

    return (

        <>
            <div className="w-96 p-4 shadow-md shadow-green-900 rounded-md bg-green-200 bg-opacity-95">
                <h2 className="font-semibold">{msgObj.title}</h2>
                <hr className="border-green-400 my-3"/>
                <p>{msgObj.msg}</p>

            </div>
        </>
    )
}

export default Bread;