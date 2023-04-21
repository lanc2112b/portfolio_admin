import { Link } from "react-router-dom";
import { DateTime } from 'luxon';

const PortfolioItemRow = ({ element, deleteModalHandler }) => {

    const clickHandler = (value) => {

        window.location.replace(`/portfolio/${value}`);

    }

    return (
        <>
            <td className="px-3 py-2"><Link to={element.hosted_url} target="_blank ">{element.title}</Link></td>
            
            
            <td className="px-3 py-2 text-center hidden lg:table-cell w-2/12">
                {DateTime.fromSQL(element.created_at).toLocaleString(DateTime.DATE)}
            </td>
            <td className="text-blue-600 hover:text-blue-700 px-3 py-2 hidden md:table-cell text-center w-1/12">
                <Link to={element.hosted_url} target="_blank"><i className="fa-solid fa-square-arrow-up-right"></i></Link>
            </td>
            <td className="text-blue-600 hover:text-blue-700 px-3 py-2 hidden md:table-cell text-center w-1/12">
               <Link to={element.github_url} target="_blank"><i className="fa-solid fa-eye"></i></Link>
            </td>
            <td className="px-3 py-2 text-center w-1/12">
                <button type="button" value={element.id} className="hover:bg-orange-200 text-orange-700 py-1 px-3 rounded-lg" onClick={() => clickHandler(element.id)}>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </td>
            <td className="px-3 py-2 text-center w-1/12">
                <button type="button" value={element.id} className="hover:bg-red-100 text-red-700 py-1 px-3 rounded-lg" onClick={() => deleteModalHandler(element.id)}>
                    <i className="fa-solid fa-folder-minus"></i>
                </button>
            </td>
        </>
    )
}

export default PortfolioItemRow;