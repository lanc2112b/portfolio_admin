import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/User";
import { MessageContext } from "../../contexts/Message";

import SpinnerSmall from "../uiparts/SpinnerSmall";
import { getLogItems } from "../../api/ApiConsumer";
import LogItemsList from "./LogItemsList";

const LogView = () => {

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    const { user } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    useEffect(() => {

        setLoading(true);
        if (user.access_token) {
            getLogItems(user.access_token)
                .then((results) => {
                    setList(results);
                    setApiError(false);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    setApiError(true);
                });
        }
    }, [user.access_token]);

    if (loading)
        return <SpinnerSmall />

    if (apiError)
        return (<></>);

    return (
        <>
            <section className="log-list">
                <LogItemsList list={list} />
            </section>
        </>
    );
}

export default LogView;