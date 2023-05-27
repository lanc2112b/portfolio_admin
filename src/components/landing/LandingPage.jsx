import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { MessageContext } from "../../contexts/Message";
import { getLandingPageItems, deleteLandingItem } from "../../api/ApiConsumer";
import { toast } from "react-hot-toast";
import Bread from "../uiparts/Bread";
import LandingListTableHead from "./LandingListTableHead";
import LandingListTableRow from "./LandingListTableRow";
import LandingContentForm from "./LandingContentForm";
import SpinnerSmall from "../uiparts/SpinnerSmall";

const LandingPage = () => {

    useEffect(() => {
        document.title = 'Admin Panel';
    });

    const { user } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    const [apiError, setApiError] = useState(false);

    const [areaList, setAreaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {

        setLoading(true);

        getLandingPageItems()
            .then((results) => {
                setAreaList(results);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });


    }, [])

    const setListHandler = (result) => {
        setAreaList((currentList) => [...currentList, result]);
    };

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const deleteModalHandler = (value) => {
        setShowModal(true);
        setDeleteId(value);
    }

    const deleteHandler = (value) => {
        //console.log(value, deleteId, 'values match?');
        //do delete: 
        deleteLandingItem(user.token, value)
            .then((result) => {
                if (result === 204) {
                    //setList();
                    const filtered = areaList.filter((element) => {
                        return element.id !== value;
                    });

                    setAreaList(filtered);
                    toast.custom(<Bread msgObj={{
                        title: 'Deleted',
                        msg: 'Content successfully deleted',
                    }} />);
                }
                setApiError(false);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setMessage({
                        msgType: 'error',
                        showMsg: true,
                        title: 'Login Expired or Invalid',
                        msg: 'Your login has expired or is invalid, please try logging in again',
                        dismiss: false,
                    });
                } else {
                    setMessage({
                        msgType: 'error',
                        showMsg: true,
                        title: 'Something Went Wrong',
                        msg: 'If this message persists, please contact the administrator, if you are the administrator, fix the issue please.',
                        dismiss: false,
                    });
                }

                setApiError(true);
            });
        setShowModal(false);
        setDeleteId(null);

    }

    const closeModalHandler = () => {
        setShowModal(false);
    }


    if (apiError)
        return (<></>);

    if (loading)
        return <SpinnerSmall />;


    return (
        <>
            <section id="list-landingpage-content">

                <div className="w-full flex justify-end py-2 px-3">
                    <button type="button" className="bg-green-500 text-white font-semibold rounded-full focus:bg-green-600 hover:bg-green-600 px-3 py-1 shadow-md" onClick={toggleExpanded}>
                        {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                        Add
                    </button>
                </div>
                <LandingContentForm expanded={expanded} formMode={'add'} setListHandler={setListHandler} />
                <div className="w-full shadow-md">
                    <table className="w-full border-separate border-spacing-y-1">
                        <LandingListTableHead />
                        <tbody>
                            {areaList.map((element) => {
                                return (<tr key={element.id}><LandingListTableRow element={element} deleteModalHandler={deleteModalHandler} /></tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                {/**  Add content / FP preview here. Demonstrates which section is to be edited */}
            </section>

            <div className={`${showModal ? '' : 'hidden'} fixed inset-0 z-50 justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none mx-1`}>
                <div className="relative w-full my-6 mx-auto max-w-xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg p-5 shadow-lg relative flex flex-col w-full bg-zinc-50 outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between pb-3 border-b border-solid border-zinc-800 rounded-t">
                            <h3 className="text-2xl font-semibold text-red-600">
                                <i className="fa-solid fa-hand me-4"></i> Stop!
                            </h3>
                            <button
                                className="ml-auto bg-transparent border-0 text-slate-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                            >
                                <span className="bg-transparent text-zinc-800 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            Are you sure you want to delete this area content item? This action cannot be reversed.
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-5 pe-0 border-t border-solid border-zinc-800 rounded-b">
                            <button
                                className=" text-zinc-800 font-bold uppercase text-sm px-3 py-1 outline-none focus:outline-none me-3 mb-1"
                                type="button"
                                onClick={closeModalHandler}
                            >
                                Close
                            </button>
                            <button
                                className="text-slate-50 bg-red-500 active:bg-red-600 hover:bg-red-600 font-bold uppercase text-sm px-3 py-1 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => deleteHandler(deleteId)}
                            >
                                Yes, Delete!
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${showModal ? '' : 'hidden'} opacity-25 fixed inset-0 z-40 bg-black`}></div>
        </>
    )

}
export default LandingPage;