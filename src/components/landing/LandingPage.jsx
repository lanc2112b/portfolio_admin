import { useState, useEffect } from "react";
import { getLandingPageItems } from "../../api/ApiConsumer";
import LandingListTableHead from "./LandingListTableHead";
import LandingListTableRow from "./LandingListTableRow";
import LandingContentForm from "./LandingContentForm";

const LandingPage = () => {

    const [areaList, setAreaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        setLoading(true);

        getLandingPageItems()
            .then((results) => {
                setAreaList(results);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });


    }, [])

    const setListHandler = (result) => {
        setAreaList((currentList) => [...currentList, result]);
    };

    const toggleExpanded = () => {

        setExpanded(!expanded);

    }

    const editClickHandler = (value) => {
        console.log(value);
    }

    if (loading)
        return (<> <p><button > loading... </button></p></>);


    return (
        <>
            <section id="list-landingpage-content">

                <div className="w-full flex justify-end py-2 px-3">
                    <button type="button" className="bg-green-500 text-white font-semibold rounded-full focus:bg-green-600 hover:bg-green-600 px-3 py-1 shadow-md" onClick={toggleExpanded}>
                        {!expanded ? <i className="me-3 fa-regular fa-square-plus"></i> : <i className="me-3 fa-regular fa-square-minus"></i>}
                        Add
                    </button>
                </div>
                <LandingContentForm expanded={expanded} formMode={'add'} setListHandler={setListHandler} />
                <div className="w-full shadow-md">
                    <table className="w-full border-separate border-spacing-y-1">
                        <LandingListTableHead />
                        <tbody>
                            {areaList.map((element) => {
                                return (<tr key={element.id}><LandingListTableRow element={element} editClickHandler={editClickHandler} /></tr>)
                            })}
                        </tbody>
                    </table>
                </div>
                {/**  Add content / FP preview here. Demonstrates which section is to be edited */}
            </section>
        </>
    )

}
export default LandingPage;