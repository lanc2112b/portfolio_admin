import { DateTime } from 'luxon';

const LogItemListRow = ({element}) => {

    return (
        <>
            <td className="text-center px-1 md:px-3 py-2">{DateTime.fromSQL(element.created_at).toLocaleString(DateTime.DATETIME_SHORT)}</td>
            <td className="text-center px-1 md:px-3 py-2">{element.addr}</td>
            <td className="text-center px-1 md:px-3 py-2">{element.host}</td>
            <td className="text-center px-1 md:px-3 py-2 hidden lg:table-cell">{element.refer}</td>
            <td className="text-center px-1 md:px-3 py-2 hidden 2xl:table-cell">{element.contr}</td>
            <td className="text-center px-1 md:px-3 py-2 hidden 2xl:table-cell">{element.action}</td>
            <td className="text-center px-1 md:px-3 py-2 hidden md:table-cell">{element.params}</td>
            <td className="text-center px-1 md:px-3 py-2 hidden 2xl:table-cell">{element.username}</td>
            <td className="text-center px-1 md:px-3 py-2 hidden 2xl:table-cell">{element.validated}</td>
        </>
    );
}

export default LogItemListRow;