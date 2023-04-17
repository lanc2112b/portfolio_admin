import ContactItemRow from "./ContactItemRow";

const ContactItemsList = ({ list, modalHandler }) => {

    return (
        <>
            <div className="w-full shadow-md">
                <table className="w-full border-separate border-spacing-y-1">
                    <thead>
                        <tr className="bg-slate-300">
                            <th className="text-left p-3" >Name</th>
                            <th className="text-left p-3" >Email</th>
                            <th className="text-left p-3 hidden md:table-cell">Subject</th>
                            <th className="text-left p-3 hidden md:table-cell">Question</th>
                            <th className="text-left p-3">Date</th>
                            <th className="text-center text-xl p-3"><i className="fa-regular fa-envelope"></i></th>
                            <th className="text-center text-xl p-3"><i className="fa-regular fa-eye"></i></th>
                        </tr>
                    </thead>
                    <tbody>

                        {list.map((element) => {
                            return (
                                <tr key={element.id} className=" border-slate-600 border-y even:bg-slate-100 odd:bg-white">
                                    <ContactItemRow element={element} modalHandler={modalHandler} />
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ContactItemsList;