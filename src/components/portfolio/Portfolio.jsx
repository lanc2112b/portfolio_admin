import { useEffect, useState, useContext } from "react";

import { getPortfolioItems } from "../../api/ApiConsumer";

import { UserContext } from "../../contexts/User";
import PortfolioItemsList from "./PortfolioItemsList";

const Portfolio = () => {

    const { user } = useContext(UserContext);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading)
        return (<><button type="button" className="text-2xl rounded-full text-cyan-100 bg-slate-500 py-3 px-4" disabled><i className="animate-spin fa-solid fa-spinner me-3"></i> Loading... </button></>)

    return (
        <>
            <PortfolioItemsList list={list} />
        </>
    );
}

export default Portfolio;