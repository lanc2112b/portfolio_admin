import { useEffect, useState, useContext } from "react";

import { UserContext } from "../../contexts/User";
import { MessageContext } from "../../contexts/Message";

import SpinnerSmall from "../uiparts/SpinnerSmall";
import { getLogItems } from "../../api/ApiConsumer";
import LogItemsList from "./LogItemsList";
import Paginator from "../uiparts/Paginator";

const LogView = () => {

    const [list, setList] = useState([]);
    
    const [rowCount, setRowCount] = useState(0);
    const [limit, setLimit] = useState(20);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    const { user } = useContext(UserContext);
    const { setMessage } = useContext(MessageContext);

    const pageCount = Math.ceil(rowCount / limit);

    useEffect(() => {

        setLoading(true);
        if (user.access_token) {
            getLogItems(user.access_token, page, limit)
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
    }, [page, user.access_token, setMessage, setRowCount]);

    if (loading)
        return <SpinnerSmall />

    if (apiError)
        return (<></>);

    console.table(list);
    
    return (
        <>
            <section className="log-list">
                <LogItemsList list={list} />
                <Paginator rowCount={rowCount} page={page} limit={limit} setPage={setPage} />
            </section>
        </>
    );
}

export default LogView;