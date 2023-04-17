//import { useState } from "react";
import { DateTime } from 'luxon';

const ContactItemRow = ({ element, modalHandler }) => {

    //const { show, setShow } = useState(true);

    return (
        <>
            <td className="px-3 py-2">{element.name}</td>
            <td className="px-3 py-2">{element.email}</td>
            <td className="px-3 py-2 hidden md:table-cell">{element.subject}</td>
            <td className="px-3 py-2 hidden md:table-cell">{element.query}</td>
            <td className="px-3 py-2">
                {DateTime.fromSQL(element.created_at).toLocaleString(DateTime.DATE)}
            </td>
            <td className="px-3 py-2 text-center">{element.notified ? <i className="fa-regular fa-circle-check text-lime-600"></i> : <i className="fa-regular fa-circle-xmark text-orange-600"></i>}</td>
            <td className="px-3 py-2 text-center">
                <button type="button" value={element.id} onClick={() => modalHandler(element.id)} className="hover:bg-cyan-100 text-sky-700 py-1 px-3 rounded-lg">
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