import { useState } from "react";
import PortfolioItemRow from "./PortfolioItemRow";

const PortfolioItemsList = ({ list }) => {

    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    return (
        <>
            <div className="w-full flex justify-end py-2 px-3">
                <button type="button" className="bg-green-500 text-white font-semibold rounded-full focus:bg-green-600 hover:bg-green-600 px-3 py-1 shadow-md" onClick={toggleExpanded}>
                    {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i class="me-3 fa-regular fa-square-minus"></i> }
                    Add
                </button>
            </div>
            <div className={`px-3 pt-0 mb-6 overflow-hidden transition-[max-height] duration-500 ${!expanded ? "ease-in" : "ease-out"} ${expanded ? "max-h-max" : "max-h-0"}`}>
                <form>
                    <div className="w-full grid grid-cols-2 gap-4 justify-between">
                        <div className="col-span-2 flex flex-col mb-2">
                            <label htmlFor="title" className="mb-1 ms-1">Title: </label>
                            <input type="text" name="title" id="title" className="rounded-md border border-slate-300 shadow-md" />
                        </div>

                        <div className="col-span-2 flex flex-col mb-2">
                            <label htmlFor="description" className="mb-1 ms-1">Description: </label>
                            <textarea name="description" id="description" cols="30" rows="4" className=" rounded-md border-slate-300 shadow-md"></textarea>
                        </div>

                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="hosted_url" className="mb-1 ">Hosted URL: </label>
                            <input type="text" name="hosted_url" id="hosted_url" className="rounded-md border border-slate-300 shadow-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="github_url" className="mb-1 ms-1">GitHub URL: </label>
                            <input type="text" name="github_url" id="github_url" className="rounded-md border border-slate-300 shadow-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="image_url" className="mb-1 ms-1">Image URL: </label>
                            <input type="text" name="image_url" id="image_url" className="rounded-md border border-slate-300 shadow-md" />
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col mb-2">
                            <label htmlFor="video_url" className="mb-1 ms-1">Video URL: </label>
                            <input type="text" name="video_url" id="video_url" className="rounded-md border border-slate-300 shadow-md" />
                        </div>
                    </div>
                    <div className="w-full flex flex-row sm:justify-end mb-4 mt-3">
                        <button type="submit" className="w-full font-semibold text-white sm:w-fit rounded-full bg-green-500 hover:bg-green-600 shadow-md py-1 px-3">
                            <i className="me-3 fa-solid fa-folder-plus"></i>Add Item
                        </button>
                    </div>
                </form>
            </div>

            {/** accordian here */}
            <div className="w-full shadow-md">
                <table className="w-full border-separate border-spacing-y-1">
                    <thead>
                        <tr className="bg-slate-300">
                            <th className="text-left p-3">Title</th>
                            <th className="text-left p-3">Hosted URL</th>
                            <th className="text-left p-3">GitHub URL</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-center text-xl p-3"><i className="fa-solid fa-file-pen"></i></th>
                            <th className="text-center text-xl p-3"><i className="fa-regular fa-eye"></i></th>
                        </tr>
                    </thead>
                    <tbody>

                        {list.map((element) => {
                            return (
                                <tr key={element.id} className=" border-slate-600 border-y even:bg-slate-100 odd:bg-white">
                                    <PortfolioItemRow element={element} />
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