import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/User";
import { MessageContext } from "../../contexts/Message";

import SpinnerSmall from "../uiparts/SpinnerSmall";
import { getLogItems } from "../../api/ApiConsumer";
import LogItemsList from "./LogItemsList";
import Paginator from "../uiparts/Paginator";
import LimitFilter from "../uiparts/LimitFilter";

const LogView = () => {

    const [list, setList] = useState([]);
    
    const [rowCount, setRowCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    const { user } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    if (limit > rowCount && page > 1)
        setPage(1);

    useEffect(() => {

        setLoading(true);
        if (user.token) {
            getLogItems(user.token, page, limit)
                .then((results) => {
                    setList(results[1]);
                    setRowCount(results[0][0].total_rows);
                    setApiError(false);
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
                });
        }
    }, [page, limit, user.token, setMessage]);

    if (loading)
        return <SpinnerSmall />

    if (apiError)
        return (<></>);

    return (
        <>
            <section className="log-list">
                <LimitFilter setLimit={setLimit} limit={limit} />
                <LogItemsList list={list} />
                <Paginator rowCount={rowCount} page={page} limit={limit} setPage={setPage} />
            </section>
        </>
    );
}

export default LogView;