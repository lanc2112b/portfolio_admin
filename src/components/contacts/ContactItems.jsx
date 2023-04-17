import { useEffect, useState, useContext } from "react";
import { getContactItems } from "../../api/ApiConsumer";
import { UserContext } from "../../contexts/User";
import ContactItemsList from "./ContactItemsList";

const ContactItems = () => {

    const { user } = useContext(UserContext);

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    //console.log(user);

    useEffect(() => {
        setLoading(true);
        //console.log(user, "sending as token");
        getContactItems(user.access_token)
            .then((results) => {
                console.log(results);
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
            <ContactItemsList list={list} />
        </>
    )
}

export default ContactItems;