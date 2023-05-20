import LogItemListRow from "./LogItemListRow";

const LogItemsList = ({ list }) => {

    return (
        <>
            <div className="w-full shadow-md">
                <table className="w-full border-separate border-spacing-y-1">
                    <thead>
                        <tr className="bg-slate-300">
                            <th className="text-center text-xl p-3" ><i className="fa-regular fa-calendar-days"></i></th>
                            <th className="text-center text-xl p-3" ><i className="fa-solid fa-location-crosshairs"></i></th>
                            <th className="text-center text-xl p-3"><i className="fa-solid fa-bullseye"></i></th>
                            <th className="text-center text-xl p-3 hidden lg:table-cell"><i className="fa-solid fa-people-arrows"></i></th>
                            <th className="text-center text-xl p-3 hidden 2xl:table-cell"><i className="fa-solid fa-person-military-pointing"></i></th>
                            <th className="text-center text-xl p-3 hidden 2xl:table-cell"><i className="fa-solid fa-clapperboard"></i></th>
                            <th className="text-center text-xl p-3 hidden md:table-cell"><i className="fa-solid fa-puzzle-piece"></i></th>
                            <th className="text-center text-xl p-3 hidden 2xl:table-cell"><i className="fa-solid fa-user"></i></th>
                            <th className="text-center text-xl p-3 hidden 2xl:table-cell"><i className="fa-solid fa-crown"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((element) => {
                            return (
                                <tr key={element.id} className="text-xs border-slate-600 border-y even:bg-slate-100 odd:bg-white">
                                   <LogItemListRow element={element} />
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )


}

export default LogItemsList;