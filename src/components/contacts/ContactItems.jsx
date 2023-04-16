import { useEffect, useState, useContext } from "react";
import { getContactItems } from "../../api/ApiConsumer";
import { UserContext } from "../../contexts/User";
//import ContactItemsList from "./ContactItemsList";



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

    }, []);

    if (loading)
        return (<><button type="button" className="text-2xl rounded-full text-cyan-100 bg-slate-500 py-3 px-4" disabled><i className="animate-spin fa-solid fa-spinner me-3"></i> Loading... </button></>)

    return (
        <>
            <div className="w-full">
                <table className="w-full table-auto border-separate border-spacing-2 border border-slate-400">
                    <thead>
                        <tr>
                            <th className="text-left">#ID</th>
                            <th className="text-left" >Name</th>
                            <th className="text-left" >Email</th>
                            <th className="text-left">Subject</th>
                            <th className="text-left">Question</th>
                            <th className="text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>

                        {list.map((element) => {
                            return (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.subject}</td>
                                    <td>{element.query}</td>
                                    <td>{element.created_at}</td>
                                </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ContactItems;