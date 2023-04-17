//import { useState } from "react";

const ContactItemRow = ({ element }) => {

    //const { show, setShow } = useState(true);

    return (
        <>
            <td className="px-3 py-2">{element.name}</td>
            <td className="px-3 py-2">{element.email}</td>
            <td className="px-3 py-2">{element.subject}</td>
            <td className="px-3 py-2">{element.query}</td>
            <td className="px-3 py-2">{element.created_at}</td>
            <td className="px-3 py-2 text-center">{element.notified ? <i className="fa-regular fa-circle-check text-lime-600"></i> : <i className="fa-regular fa-circle-xmark text-orange-600"></i>}</td>
            <td className="px-3 py-2 text-center">
                <button type="button" value={element.id} className="hover:bg-cyan-100 text-sky-700 py-1 px-3 rounded-lg">
                    <i className="fa-solid fa-expand"></i>
                </button>
            </td>
        </>
    )

}
export default ContactItemRow;

/**
 * 
 *                                     <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.subject}</td>
                                    <td>{element.query}</td>
                                    <td>{element.created_at}</td>
 */