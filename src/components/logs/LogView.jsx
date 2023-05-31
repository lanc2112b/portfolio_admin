import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useApiPrivate from "../../hooks/useApiPrivate";

import SpinnerSmall from "../uiparts/SpinnerSmall";
import LogItemsList from "./LogItemsList";
import Paginator from "../uiparts/Paginator";
import LimitFilter from "../uiparts/LimitFilter";



const LogView = () => {

    useEffect(() => {
        document.title = 'View Logs';
    });

    const navigate = useNavigate();
    const location = useLocation();
    const apiPrivate = useApiPrivate();

    const [list, setList] = useState([]);

    const [rowCount, setRowCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);

    if (limit > rowCount && page > 1)
        setPage(1);

    useEffect(() => {

        const controller = new AbortController();

        setLoading(true);
        const getLogItems = async () => {
            try {

                const response = await apiPrivate.get(`/api/admin/logs/index?page=${page}&limit=${limit}`, {
                    signal: controller.signal
                });

                setList(response.data[1]);
                setRowCount(response.data[0][0].total_rows);
                setLoading(false);
            } catch (error) {
                //console.log(error);
                setLoading(false);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getLogItems();

        return () => {
            controller.abort();
        };
    }, [apiPrivate, limit, page, navigate, location]);

    if (loading)
        return <SpinnerSmall />

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