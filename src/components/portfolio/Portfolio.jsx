import { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import useApiPrivate from "../../hooks/useApiPrivate";

import { MessageContext } from "../../contexts/Message";

import Bread from "../uiparts/Bread";
import SpinnerSmall from "../uiparts/SpinnerSmall";
import Paginator from "../uiparts/Paginator";
import LimitFilter from "../uiparts/LimitFilter";
import PortfolioItemsList from "./PortfolioItemsList";

const Portfolio = () => {

    const { setMessage } = useContext(MessageContext);

    const navigate = useNavigate();
    const location = useLocation();
    const apiPrivate = useApiPrivate();

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [rowCount, setRowCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        document.title = `Viewing Project Items`;
    }, []);

    useEffect(() => {

        const controller = new AbortController();
        setLoading(true);

        const getPortfolioItems = async () => {

            try { 

                const response = await apiPrivate.get(`/api/admin/portfolios/index`, {
                    signal: controller.signal
                });

                setList(response.data[1]);
                setRowCount(response.data[0].total_rows);
            } catch (error) {   
                
                if (error.response.status === 401) {

                    setLoading(false);
                    navigate('/login', { state: { from: location }, replace: true });
                } else {

                    setMessage({
                        msgType: 'error',
                        showMsg: true,
                        title: 'Something Went Wrong',
                        msg: 'If this message persists, please contact the administrator, if you are the administrator, fix the issue please.',
                        dismiss: false,
                    });
                }
            } finally {
                
                setLoading(false);
            }

        }
        
        getPortfolioItems();
        
        return () => {
            controller.abort();
        };

    }, [ setMessage, apiPrivate, location, navigate]);

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const deleteModalHandler = (value) => {
        setShowModal(true);
        setDeleteId(value);
    }

    const deleteHandler = async (value) => {

        try { 

            const response = await apiPrivate.delete(`/api/admin/portfolios/${value}/delete`);

            if (response.status === 204) {

                const filtered = list.filter((element) => {
                    return element.id !== value;
                });

                setList(filtered);

                const msg = {
                    type: 'success',
                    title: 'Deleted',
                    msg: 'Portfolio item successfully deleted',
                }

                toast.custom(t => (<Bread msgObj={msg} t={t} />));
            }
            

        } catch (error) {

            if (error.response.status === 401) {

                navigate('/login', { state: { from: location }, replace: true });
            } else {
                setMessage({
                    msgType: 'error',
                    showMsg: true,
                    title: 'Something Went Wrong',
                    msg: 'If this message persists, please contact the administrator, if you are the administrator, fix the issue please.',
                    dismiss: false,
                });
            }
            
        } finally {

            setLoading(false);
            setShowModal(false);
            setDeleteId(null); 
        }
        
    }

    const closeModalHandler = () => {
        setShowModal(false);
    }

    const setListHandler = (value) => {

        setList([ ...list, value ]);

    }

    if (loading)
        return <SpinnerSmall />
    
    return (
        <>
            <div className="w-full flex justify-end py-2 px-3">
                <button type="button" className="bg-green-500 text-white font-semibold rounded-full focus:bg-green-600 hover:bg-green-600 px-3 py-1 shadow-md" onClick={toggleExpanded}>
                    {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                    Add
                </button>
            </div>
            <LimitFilter setLimit={setLimit} limit={limit} />
            <PortfolioItemsList list={list} setListHandler={setListHandler} expanded={expanded} deleteModalHandler={deleteModalHandler} />
            <Paginator rowCount={rowCount} page={page} limit={limit} setPage={setPage} />
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
                                    × {/**  TODO: Add font awesome icon! */}
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            Are you sure you want to delete this portfolio item? This action cannot be reversed. 
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
    );
}

export default Portfolio;