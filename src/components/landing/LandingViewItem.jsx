import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getLandingPageItem } from "../../api/ApiConsumer";
import { MessageContext } from "../../contexts/Message";
import LandingContentForm from "./LandingContentForm";
import SpinnerSmall from "../uiparts/SpinnerSmall";

const LandingViewItem = () => {

    const { id } = useParams();

    const { setMessage } = useContext(MessageContext);

    const [item, setItem] = useState({});
    const [formParts, setFormParts] = useState({
        area_title: '',
        area_content_title: '',
        area_content: '',
        area_content_image: '',
    });

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getLandingPageItem(id)
            .then((result) => {
                setItem({ ...result });

                setFormParts({
                    area_title: result?.area_title,
                    area_content_title: result?.area_content_title,
                    area_content: result?.area_content,
                    area_content_image: result?.area_content_image,
                });

                setLoading(false);
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
                setLoading(false);
                setApiError(true);
            })

    }, [id, setMessage]);

    if (apiError)
        return (<></>);

    if (loading)
        return <SpinnerSmall />

    return (
        <>
            <section id="list-landingpage-content">
                <p className="hidden"> Editing: {item.id}</p> {/** TODO: Until the public FE exists, and a view of the FP exists */}
                <LandingContentForm expanded={true} formMode={'edit'} id={id} formParts={formParts} setFormParts={setFormParts} loading={loading} />

            </section>
        </>
    )

}

export default LandingViewItem;