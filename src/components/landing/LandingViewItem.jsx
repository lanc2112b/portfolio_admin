import { useState, useEffect, useContext } from "react"; //
import { useParams, useNavigate, useLocation } from "react-router-dom";

import useApiPrivate from "../../hooks/useApiPrivate";

import { MessageContext } from "../../contexts/Message";

import LandingContentForm from "./LandingContentForm";
import SpinnerSmall from "../uiparts/SpinnerSmall";

const LandingViewItem = () => {

    const { id } = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const apiPrivate = useApiPrivate();

    const { setMessage } = useContext(MessageContext);

    const [item, setItem] = useState({});
    const [formParts, setFormParts] = useState({
        area_title: '',
        area_content_title: '',
        area_content: '',
        area_content_image: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = `Viewing #${item?.id} ${item?.area_title}`;
    }, [item]);

    useEffect(() => {

        setLoading(true);
        const controller = new AbortController();

        const getLandingPageItem = async () => {

            try {
                const response = await apiPrivate.get(`/api/admin/landings/${id}/view`, {
                    signal: controller.signal
                });

                setItem({ ...response?.data?.item });
                setFormParts({
                    area_title: response?.data?.item?.area_title,
                    area_content_title: response?.data?.item?.area_content_title,
                    area_content: response?.data?.item?.area_content,
                    area_content_image: response?.data?.item?.area_content_image,
                });

                setLoading(false);

            } catch (error) {

                //console.log(error);
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
             }
        }

        getLandingPageItem();

        return () => {
            controller.abort();
        };
        
    }, [id, setMessage, apiPrivate, location, navigate]);

    const backHandler = () => {

        navigate("/landing-content");
    }

    if (loading)
        return <SpinnerSmall />

    return (
        <>
            <section id="list-landingpage-content">
                <div id="edit-bar" className="w-full my-2 flex flex-row justify-end px-3">
                    <button type="button" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-3 hover:animate-pulse rounded-full shadow-md me-3" onClick={backHandler}>
                        <i className="me-3 fa-solid fa-left-long"></i>
                        Content List
                    </button>
                    {/* <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded-full shadow-md" onClick={toggleExpanded}>
                        {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                        Edit
                    </button> */}
                </div>
                <p className="hidden"> Editing: {item.id}</p> {/** TODO: Until the public FE exists, and a view of the FP exists */}
                <LandingContentForm expanded={true} formMode={'edit'} id={id} formParts={formParts} setFormParts={setFormParts} loading={loading} />
            </section>
        </>
    )
}

export default LandingViewItem;