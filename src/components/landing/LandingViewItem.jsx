import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getLandingPageItem } from "../../api/ApiConsumer";
import LandingContentForm from "./LandingContentForm";

const LandingViewItem = () => {

    const { id } = useParams();

    const [item, setItem] = useState({});
    const [formParts, setFormParts] = useState({
        area_title: '',
        area_content_title: '',
        area_content: '',
        area_content_image: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getLandingPageItem(id)
            .then((result) => {
                setItem({ ...result });
                console.log(result, 'returned result')
                setFormParts({
                    area_title: result?.area_title,
                    area_content_title: result?.area_content_title,
                    area_content: result?.area_content,
                    area_content_image: result?.area_content_image,
                });

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })

    },[]);

    if (loading)
        return (<> <p><button > loading... </button></p></>);

    return (
        <>
            <section id="list-landingpage-content">

                <LandingContentForm expanded={true} formMode={'edit'} id={id} formParts={formParts} setFormParts={setFormParts} loading={loading} />

            </section>
        </>
    )

}

export default LandingViewItem;