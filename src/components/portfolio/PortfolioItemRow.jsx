import { DateTime } from 'luxon';

const PortfolioItemRow = ({ element }) => {

    const clickHandler = (value) => {

        window.location.replace(`/portfolio/${value}`);

    }

    return (
        <>
            <td className="px-3 py-2">{element.title}</td>
            <td className="px-3 py-2">{element.hosted_url}</td>
            <td className="px-3 py-2">{element.github_url}</td>
            <td className="px-3 py-2">
                {DateTime.fromSQL(element.created_at).toLocaleString(DateTime.DATE)}
            </td>
            <td className="px-3 py-2 text-center">
                <button type="button" value={element.id} className="hover:bg-orange-200 text-orange-700 py-1 px-3 rounded-lg" onClick={() => clickHandler(element.id)}>
                    <i className="fa-solid fa-pen"></i>
                </button>
            </td>
            <td className="px-3 py-2 text-center">
                <button type="button" value={element.id} className="hover:bg-cyan-100 text-sky-700 py-1 px-3 rounded-lg">
                    <i className="fa-solid fa-expand"></i>
                </button>
            </td>
        </>
    )
}

export default PortfolioItemRow;