import { useState, useEffect } from "react";
import { getLandingPageItems } from "../../api/ApiConsumer";
import LandingListTableHead from "./LandingListTableHead";
import LandingListTableRow from "./LandingListTableRow";

const LandingPage = () => {

    const [areaList, setAreaList] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const editClickHandler = (value) => {
        console.log(value);
    }

    if (loading)
        return (<> <p><button > loading... </button></p></>);


    return (
        <>
            <div className="w-full shadow-md">
                <table className="w-full border-separate border-spacing-y-1">
                    <LandingListTableHead />
                    <tbody>
                        {areaList.map((element) => {
                            return (<> <tr key={element.id}><LandingListTableRow element={element} editClickHandler={editClickHandler} /> </tr> </>)
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )

}
export default LandingPage;