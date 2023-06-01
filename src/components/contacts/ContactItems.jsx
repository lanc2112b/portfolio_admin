import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useApiPrivate from "../../hooks/useApiPrivate";

import SpinnerSmall from "../uiparts/SpinnerSmall";
import Paginator from "../uiparts/Paginator";
import LimitFilter from "../uiparts/LimitFilter";
import ContactItemsList from "./ContactItemsList";

const ContactItems = () => {

    useEffect(() => {
        document.title = 'View Messages';
    });

    const navigate = useNavigate();
    const location = useLocation();
    const apiPrivate = useApiPrivate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rowCount, setRowCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [modalFill, setModalFill] = useState({})

    const modalHandler = (index) => {
        
        if (isNaN(index))
            return;
        
        setShowModal(!showModal);

        const fillItem = list.find((element) => {
            return element.id === index;
        })

        setModalFill({ ...fillItem });
                 
    }

    const closeModalHandler = () => {
        setModalFill({});
        setShowModal(!showModal);
    }

    if (limit > rowCount && page > 1)
        setPage(1);

    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        const getContactItems = async () => {
            try {

                const response = await apiPrivate.get(`/api/admin/contacts/index?page=${page}&limit=${limit}`, {
                    signal: controller.signal
                });

                setList(response.data[1]);
                setRowCount(response.data[0].total_rows);
                setLoading(false);
            } catch (error) {
                
                setLoading(false);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getContactItems();

        return () => {
            controller.abort();
        };
    }, [apiPrivate, location, navigate, limit, page]);

    if (loading)
        return <SpinnerSmall />

    return (
        <>  
            <LimitFilter setLimit={setLimit} limit={limit} />
            <ContactItemsList list={list} modalHandler={modalHandler} />
            <Paginator rowCount={rowCount} page={page} limit={limit} setPage={setPage} />
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none mx-1" onClick={() => setShowModal(false)} >
                        <div className="relative w-full my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg p-5 shadow-lg relative flex flex-col w-full bg-zinc-800 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between pb-3 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-2xl font-semibold text-slate-50">
                                        #{modalFill.id}{' '}{modalFill.name}
                                    </h3>
                                    <button
                                        className="ml-auto bg-transparent border-0 text-slate-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-slate-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <dl className=" text-slate-200 text-lg">
                                        <dt className="font-semibold">Email:</dt>
                                        <dd>{modalFill.email}</dd>
                                        <dt className="font-semibold mt-2">Subject:</dt>
                                        <dd>{modalFill.subject}</dd>
                                        <dt className="font-semibold mt-2">Query:</dt>
                                        <dd>{modalFill.query}</dd>
                                        <dt className="font-semibold mt-2">Source:</dt>
                                        <dd>{modalFill.source}</dd>
                                        <dt className="font-semibold mt-2">Notifification Sent:</dt>
                                        <dd>{modalFill.notified ? <i className="fa-regular fa-circle-check text-lime-600"></i> : <i className="fa-regular fa-circle-xmark text-orange-600"></i>}</dd>
                                    </dl>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-5 pe-0 border-t border-solid border-slate-200 rounded-b">
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
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    )
}

export default ContactItems;