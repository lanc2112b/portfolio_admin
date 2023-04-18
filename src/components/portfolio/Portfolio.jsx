import { useEffect, useState, useContext } from "react";

import { getPortfolioItems } from "../../api/ApiConsumer";

import { UserContext } from "../../contexts/User";
import PortfolioItemsList from "./PortfolioItemsList";

const Portfolio = () => {

    const { user } = useContext(UserContext);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

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
            <PortfolioItemsList list={list} expanded={expanded} />
        </>
    );
}

export default Portfolio;