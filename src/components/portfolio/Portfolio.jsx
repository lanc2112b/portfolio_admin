import { useEffect, useState, useContext } from "react";

import { getPortfolioItems } from "../../api/ApiConsumer";

import { UserContext } from "../../contexts/User";
import PortfolioItemsList from "./PortfolioItemsList";

const Portfolio = () => {

    const { user } = useContext(UserContext);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setLoading(true);
        //console.log(user, "sending as token");
        getPortfolioItems()
            .then((results) => {
                setList(results);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [user.access_token]);

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const deleteHandler = (value) => {
        console.log(value);
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    if (loading)
        return (<><button type="button" className="text-2xl rounded-full text-cyan-100 bg-slate-500 py-3 px-4" disabled><i className="animate-spin fa-solid fa-spinner me-3"></i> Loading... </button></>)

    return (
        <>
            <div className="w-full flex justify-end py-2 px-3">
                <button type="button" className="bg-green-500 text-white font-semibold rounded-full focus:bg-green-600 hover:bg-green-600 px-3 py-1 shadow-md" onClick={toggleExpanded}>
                    {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                    Add
                </button>
            </div>
            <PortfolioItemsList list={list} expanded={expanded} deleteHandler={deleteHandler} />

            <div className={`${showModal ? '' : 'hidden'} fixed inset-0 z-50 justify-center items-center flex overflow-x-hidden overflow-y-auto outline-none focus:outline-none mx-1`}>
                <div className="relative w-full my-6 mx-auto max-w-3xl">
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
                            Something
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-5 pe-0 border-t border-solid border-zinc-800 rounded-b">
                            <button
                                className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-3 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={closeModalHandler}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${showModal ? '' : 'hidden'} opacity-25 fixed inset-0 z-40 bg-black`}></div>

        </>
    );
}

export default Portfolio;