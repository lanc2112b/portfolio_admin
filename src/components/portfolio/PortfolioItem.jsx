import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolioItem } from "../../api/ApiConsumer";
import PortfolioForm from "./PortfolioForm";

const PortfolioItem = () => {

    /* const [itemId, setItemId] = useState(null); */
    const { id } = useParams();

    const [item, setItem] = useState({
        title: '',
        description: '',
        hosted_url: '',
        github_url: '',
        image_url: '',
        video_url: '',
    });

    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPortfolioItem(id)
            .then((result) => {
                setItem(result);
                console.log(item, 'item from set item');
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [id]);

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const backHandler = () => {

        window.location.replace('/portfolio');

    }

    if (loading)
        return (<p>Loading... </p>)
    
    return (
        <>
            <section id="view-portfolio-item">
                <div id="edit-bar" className="w-full my-2 flex flex-row justify-end px-3">
                    <button type="button" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-1 px-3 hover:animate-pulse rounded-full shadow-md me-3" onClick={backHandler}>
                        <i className="me-3 fa-solid fa-left-long"></i>
                        Back
                    </button>
                    <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded-full shadow-md" onClick={toggleExpanded}>
                        {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                        Edit
                    </button>
                </div>

                <PortfolioForm expanded={expanded} useMode={'edit'} item={item} loading={loading} />

                <div className="w-full grid grid-cols-12 gap-4 justify-between">
                    <img src={item.image_url} alt="portfolio item" className="col-span-12 sm:col-span-4 mt-1.5" />
                    <div className="col-span-12 sm:col-span-8">
                        <h3 className="font-semibold text-lg mb-4">{item.title}</h3>

                        <dl className="ms-4">
                            <dt className="font-semibold">View Live: </dt>
                            <dd className="ms-1 mb-2"> <a href={item.hosted_url} target="_blank" rel="noreferrer">{item.hosted_url}</a></dd>
                            <dt className="font-semibold">GitHub: </dt>
                            <dd className="ms-1 mb-2"> <a href={item.github_url} target="_blank" rel="noreferrer">{item.github_url}</a></dd>
                            {item.youtube_url && 
                                (<>
                                <dt className="font-semibold">Video Demo: </dt>
                                <dd className="ms-1 mb-2"> <a href={item.youtube_url} target="_blank" rel="noreferrer">{item.youtube_url}</a></dd>
                            </>)
                            }
                            <dt className="font-semibold">Added: </dt>
                            <dd className="ms-1 mb-2">{item.created_at}</dd>
                            <dt className="font-semibold">Updated: </dt>
                            <dd className="ms-1 mb-2">{item.updated_at}</dd>
                        </dl>
                    </div>
                    <p className="w-auto col-span-12 px-1" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </div>
            </section>
        </>
    )
}

export default PortfolioItem;