import PortfolioForm from "./PortfolioForm";
import PortfolioItemRow from "./PortfolioItemRow";

const PortfolioItemsList = ({ list, setListHandler, expanded, deleteModalHandler }) => {

    return (
        <>
            <PortfolioForm expanded={expanded} setListHandler={setListHandler} useMode={'add'} item={null} />
            <div className="w-full shadow-md">
                <table className="w-full border-separate border-spacing-y-1">
                    <thead>
                        <tr className="bg-slate-300">
                            <th className="text-left p-3">Title</th>
                            <th className="text-left p-3">Hosted URL</th>
                            <th className="text-left p-3">GitHub URL</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-center text-xl p-3"><i className="fa-solid fa-file-pen"></i></th>
                            <th className="text-center text-xl p-3"><i className="fa-solid fa-trash"></i></th>
                        </tr>
                    </thead>
                    <tbody>

                        {list.map((element) => {
                            return (
                                <tr key={element.id} className=" border-slate-600 border-y even:bg-slate-100 odd:bg-white">
                                    <PortfolioItemRow element={element} deleteModalHandler={deleteModalHandler} />
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )

}

export default PortfolioItemsList;